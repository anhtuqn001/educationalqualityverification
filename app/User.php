<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function thuocdonvi() {
        return $this->morphTo('thuocdonvi', 'loaidonvi', 'iddonvi');
    }

    public function chimucsWithPivot() {
        return $this->belongsToMany('App\ChiMuc', 'user_chimuc', 'userid', 'chimucid')->withPivot('isHalf');
    }

    public function chimucs() {
        return $this->belongsToMany('App\ChiMuc', 'user_chimuc', 'userid', 'chimucid');
    }

    public function applyChiMucs() {
        $this->chimucs = $this->chimucsWithPivot;
    }


    public function removeRedundantHalfChiMucs() {
        $halfChimucs = $this->chimucs()->wherePivot('isHalf', 1)->get();
        $checkedChimucs = $this->chimucs()->wherePivot('isHalf', 0)->get();
        if(count($checkedChimucs) > 0){
            $checkedChiMucIds = $checkedChimucs->map(function ($chimuc) {return $chimuc->id;});
            $redudantChiMucIds = [];
            foreach($halfChimucs as $halfChimuc) {
                if(!$halfChimuc->hasChild($checkedChiMucIds)) {
                    array_push($redudantChiMucIds, $halfChimuc->id);
                }
            }
            if(count($redudantChiMucIds) > 0){
                $this->chimucs()->detach($redudantChiMucIds);
            }
        } else {
            $this->chimucs()->detach();
        }
    }

    // public function chimucWithTable() {

    // }

    

    
}
