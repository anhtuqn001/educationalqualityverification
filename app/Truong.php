<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Truong extends Model
{
    protected $table = "truongs";

    public function nhoms()
    {
        return $this->hasMany('App\Nhom', 'truongid')->orderBy('loainhom', 'DESC');
    }
}
