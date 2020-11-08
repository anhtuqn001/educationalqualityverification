<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MinhChung extends Model
{
    protected $table = "minhchungs";

    public function users() {
        return $this->belongsToMany('App\User', 'user_minhchung', 'minhchungid', 'userid');
    }

    public function tieuchi()
    {
        return $this->belongsTo('App\ChiMuc', 'tieuchiid');
    }

    public function isUnassigned() {
        return $this->users()->count() == 0;
    }
    

    public function tieuchis() {
        return $this->belongsToMany('App\ChiMuc', 'tieuchi_minhchungthamkhao', 'minhchungid', 'tieuchiid');
    }

    public function files() {
        return $this->hasMany('App\MinhChungFile', 'minhchungid');
    }

    public static function boot() {
        parent::boot();
        static::deleting(function($minhchung) { // before delete() method call this
            $minhchung->users()->detach();
            $minhchung->tieuchis()->detach();
        });
    }
}
