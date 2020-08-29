<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChiMuc extends Model
{
    protected $table = "chimucs";

    public function chimuccons() {
        return $this->hasMany("App\ChiMuc", 'chimucchaid');
    }
    
    public function chimuccha() {
        return $this->belongsTo("App\ChiMuc", 'chimucchaid');
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
}
