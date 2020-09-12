<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    protected $table = "columns";

    public function chimuc() {
        return $this->belongsTo("App\ChiMuc", 'chimucid');
    }
}
