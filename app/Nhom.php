<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nhom extends Model
{
    protected $table = "nhoms";

    public function users() {
        return $this->morphMany('App\User', 'thuocdonvi', 'loaidonvi', 'iddonvi')->orderBy('isTruongnhom', 'DESC');
    }
}
