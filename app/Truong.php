<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\MinhChung;

class Truong extends Model
{
    protected $table = "truongs";

    public function nhoms()
    {
        return $this->hasMany('App\Nhom', 'truongid')->orderBy('loainhom', 'DESC');
    }

    public function chimucs() 
    {
        return $this->hasMany('App\ChiMuc', 'truongid');
    }

    public function tieuchis() {
        return $this->chimucs()->where('loaichimuc', 4)->with(['users', 'minhchungs.tieuchis', 'minhchungthamkhaos']);
    }

    

    public function getUnassignedMinhChungs() {
        $testArr = [];
        foreach($this->tieuchis as $tieuchi) {
            if(count($tieuchi->getUnassignedMinhchungs()) > 0) {
                $testArr = array_merge($testArr, $tieuchi->getUnassignedMinhchungs());
            }
        }
        return $testArr;
    }

    public function users() {
        return $this->hasManyThrough(User::class, Nhom::class, 'truongid', 'iddonvi')->where('loaidonvi', Nhom::class);
    }

    public function calculateDatmuc() {
        $tieuchuans = $this->chimucs->where('loaichimuc', 3);
        $isDatMuc1 = false;
        $isDatMuc2 = false;
        $isDatMuc3 = false;
        if(count($tieuchuans) > 0) {
            if($tieuchuans->every(function ($item) {
                 return $item->datmuc >= 1;    
            })) {
            $isDatMuc1 = true;
         }
 
            if($isDatMuc1 && $tieuchuans->every(function ($item) {
                 return $item->datmuc >= 2;    
             })) {
                 $isDatMuc2 = true;
             }
 
            if($isDatMuc1 && $isDatMuc2 && $tieuchuans->every(function ($item) {
                 return $item->datmuc >= 3;    
             })) {
                 $isDatMuc3 = true;
             }
            }
            $this->datmuc = $isDatMuc3 ? 3 : ($isDatMuc2 ? 2 : ($isDatMuc1 ? 1 : 0));
            return;
    }

    public function isMinhChungImported() {
        $tieuchis = $this->tieuchis;
        if(count($tieuchis) > 0) {
            for($i = 0; $i < count($tieuchis); $i++) {
                if($tieuchis[$i]->minhchungs()->count() > 0)
                return true;
            }
        }
        return false;
    }

    public function removeAvailableMinhChungs() {
        $tieuchis = $this->tieuchis;
        if(count($tieuchis) > 0) {
            foreach($tieuchis as $tieuchi) {
                $minhchungIdArr = $tieuchi->getMinhChungIds();
                MinhChung::destroy($minhchungIdArr);     
            }
            return;
        }
        return;
    }
}
