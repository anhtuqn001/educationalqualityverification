<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KhuVuc extends Model
{
    protected $table = 'khuvucs';

    public function truongs(){
        return $this -> hasMany('App\Truong','khuvucid')->with('tieuchuansWithChibaos','tieuchuans');
    }
}
