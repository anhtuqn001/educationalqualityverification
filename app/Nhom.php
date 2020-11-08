<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nhom extends Model
{
    protected $table = "nhoms";

    public function users() {
        return $this->morphMany('App\User', 'thuocdonvi', 'loaidonvi', 'iddonvi')->orderBy('isTruongnhom', 'DESC');
    }

    public function nienkhoa() {
        return $this->belongsTo('App\NienKhoa', 'nienkhoaid');
    }

    public function getTruong() {
        return $this->nienkhoa->truongWithNienKhoas;
    }

    public static function boot() {
        parent::boot();
        self::deleting(function($nhom) { // before delete() method call this
            $nhom->users()->delete();
        });
    }
}
