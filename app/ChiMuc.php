<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\ChiMuc;
use App\Column;
use App\ChimucTableDetail;
use App\ChiBao;

class ChiMuc extends Model
{
    protected $table = "chimucs";

    public function chimuccons() {
        return $this->hasMany("App\ChiMuc", 'chimucchaid');
    }
    
    public function chimuccha() {
        return $this->belongsTo("App\ChiMuc", 'chimucchaid');
    }
 
    public function columns() {
        return $this->hasMany("App\Column", 'chimucid');
    }

    public function chimucTableDetails() {
        return $this->hasMany("App\ChimucTableDetail", 'chimucid');
    }

    public function chibaos() {
        return $this->hasMany("App\ChiBao", "tieuchiid");
    }

    public function users() {
        return $this->belongsToMany('App\User', 'user_chimuc', 'chimucid', 'userid');
    }

    public function minhchungs() {
        return $this->hasMany("App\MinhChung", "tieuchiid");
    }

    public function minhchungthamkhaos() {
        return $this->belongsToMany('App\MinhChung', 'tieuchi_minhchungthamkhao', 'tieuchiid', 'minhchungid');
    }

    public function getUnassignedMinhchungs() {
        $unAssignedMinhchungs = $this->minhchungs->filter(function ($minhchung) {
                return $minhchung->isUnassigned(); 
        });
        return $unAssignedMinhchungs->toArray();
    }
    

    public function applyChiMucCons() {
        if(count($this->chimuccons) == 0) {
            $this->children = array();
            return;
        }
        $chimucconArr = $this->chimuccons;
        foreach($chimucconArr as $chimuccon) {
            $chimuccon->applyChiMucCons();
        }
        $this->children = $chimucconArr;
        return;
    }

    public function hasChild($childIdArr) {
        $hasChild = false;
        if(count($this->chimuccons) > 0) {
            foreach($this->chimuccons as $chimuccon){
                if(in_array($chimuccon->id, $childIdArr->toArray())) {
                    $hasChild = true;
                    break;
                }
                if($hasChild == false) {
                    $hasChild = $chimuccon->hasChild($childIdArr);
                }
            }
        }
        return $hasChild;
    }


    public function addChimucChildren($children, $truongId) {
        foreach($children as $child) {
            $newChimuc = new ChiMuc;
            $newChimuc->tenchimuc = $child['tenchimuc'];
            $newChimuc->loaichimuc = $child['loaichimuc'];
            $newChimuc->chimucchaid = $this->id;
            $newChimuc->truongid = $truongId;
            if(array_key_exists("isHideTitle", $child)) {
                $newChimuc->isHideTitle = $child['isHideTitle'];
            }
            if(array_key_exists("isCenterTitle", $child)) {
                $newChimuc->isCenterTitle = $child['isCenterTitle'];
            }
            if(array_key_exists("isDropLine", $child)) {
                $newChimuc->isDropLine = $child['isDropLine'];
            }
            $newChimuc->save();
            if($child['loaichimuc'] == 2 || $child['loaichimuc'] == 6) {
                if(array_key_exists("columns", $child)){
                    $newChimuc->applyColumns($child['columns']);
                }
                if(array_key_exists("rows", $child)){
                    $newChimuc->applyRows($child['rows']);
                }
            }
            if($child['loaichimuc'] == 4 && array_key_exists("chibaos", $child)) {
                $newChimuc->applyChibaos($child['chibaos']);
            }
            if(array_key_exists("children", $child)){
                $newChimuc->addChimucChildren($child['children'], $truongId);
            }
        }
        return;   
    }

    public function applyColumns($columns) {
        if($columns != null && count($columns) > 0) {
            foreach($columns as $column) {
                $newColumn = new Column;
                $newColumn->title = $column['title'];
                $newColumn->dataIndex = $column['dataIndex'];
                $newColumn->chimucid = $this->id;
                $newColumn->save();
            }
        }
        return;
    }

    public function applyRows($rows) {
        if($rows != null && count($rows) > 0) {
            foreach($rows as $row) {
                $newRow = new ChimucTableDetail;
                $rowKeys = array_keys($row);
                foreach($rowKeys as $key) {
                    $newRow->$key = $row[$key];    
                }
                $newRow->chimucid = $this->id;
                $newRow->save();
            }
        }
        return;
    }

    public function applyChibaos($chibaos) {
        if($chibaos != null && count($chibaos) > 0) {
            foreach($chibaos as $chibao) {
                $newChibao = new ChiBao;
                $newChibao->tieude = $chibao['tieude'];
                $newChibao->loai = $chibao['loai'];
                $newChibao->tieuchiid = $this->id;
                if($chibao['loai'] == 2) {
                    $newChibao->thuocmuc = $chibao['thuocmuc'];
                }
                $newChibao->save();
            }
        }
        return;
    }

    public function calculateDatMuc() {
        if($this->loaichimuc == 3) {
           $tieuchis = $this->chimuccons->where('loaichimuc', 4);
           $isDatMuc1 = false;
           $isDatMuc2 = false;
           $isDatMuc3 = false;
           if(count($tieuchis) > 0) {
            if($tieuchis->every(function ($item) {
                return $item->thuocmuc >= 1;    
            })) {
                $isDatMuc1 = true;
            }

            if($isDatMuc1 && $tieuchis->every(function ($item) {
                return $item->thuocmuc >= 2;    
            })) {
                $isDatMuc2 = true;
            }

            if($isDatMuc1 && $isDatMuc2 && $tieuchis->every(function ($item) {
                $item->getMaxDatMuc();
                if($item->maxDatmuc == 2) {
                    return $item->thuocmuc >=2;
                }
                if($item->maxDatmuc == 3) {
                    return $item->thuocmuc >=3;
                }    
            })) {
                $isDatMuc3 = true;
            }
           }
           $this->datmuc = $isDatMuc3 ? 3 : ($isDatMuc2 ? 2 : ($isDatMuc1 ? 1 : 0));
           $this->save();
        }
    }

    public function getMaxDatMuc() {
        if($this->loaichimuc == 4) {
            $chibaos = $this->chibaos;
            $chibaoMuc3 = $this->chibaos->where('thuocmuc', 3);
            if(count($chibaoMuc3) > 0) {
                $this->maxDatmuc = 3;   
                return;
            }
            $chibaoMuc2 = $this->chibaos->where('thuocmuc', 2);
            if(count($chibaoMuc2) > 0) {
                $this->maxDatmuc = 2;
                return;
            }
        }
    }

    public function getShortName() {
        $this->shortName = explode(':', $this->tenchimuc)[0]; 
        return; 
    }

    public function getMinhChungIds() {
        if($this->minhchungs()->count() > 0) {
           $minhchungs = $this->minhchungs;
           $minhchungIdArr = $minhchungs->map(function($item) {
                return $item->id;
            });
            return $minhchungIdArr;
        }
        return [];
    }
}
