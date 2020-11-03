<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\KhuVuc;
use App\Truong;


class KhuVucController extends Controller
{
    public function getTruongs($khuvucid){
        try {
        //$truongs = DB::table('truongs')->where('khuvucid',$khuvucid)->get();
         $khuvuc = KhuVuc::findOrFail($khuvucid);
         $truongs = $khuvuc->truongs;
        } catch (Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
         return response()->json([
             'truongs' => $truongs
         ],200);
     }
}
