<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChimucTableDetail extends Model
{
    protected $table = "chimucs_table_details";
    public $timestamps = false;

    public function chimuc() {
        return $this->belongsTo("App\ChiMuc", 'chimucid');
    }
}
