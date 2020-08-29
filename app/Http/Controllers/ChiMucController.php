<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChiMuc;
use App\Nhom;
use App\User;

class ChiMucController extends Controller
{
    public function index() {
       $chimucs = ChiMuc::Where('chimucchaid', null)->get();
       foreach($chimucs as $chimuc) {
            $chimuc->applyChiMucCons();
       }
       $nhoms = Nhom::all();
       $users = User::all();
       foreach($users as $user) {
         $user->applyChiMucs();
       }
       return response()->json([
        'chimucs' => $chimucs,
        'nhoms' => $nhoms,
        'users' => $users
       ], 200);
    }

    public function getChiMucFromUser($userId) {
        $user = User::findOrFail($userId);
        return response()->json([
            'chimucs' => $user->chimucsWithPivot
        ], 200);
    }

    public function applyChiMucsToUser(Request $request) {
        $user = User::findOrFail($request->input('userid'));
        $chimucsArr = $request->input('chimucs');
        $chimucsAssociativeArr = array();
        foreach($chimucsArr as $chimuc) {;
            $chimucsAssociativeArr[$chimuc["id"]] = ['isHalf' => $chimuc["isHalf"]];
        }
        $user->chimucs()->sync($chimucsAssociativeArr);
        return response()->json([
            'chimucs' => $user->chimucsWithPivot
        ], 200);
    }

    public function removeChiMucsFromUser(Request $request) {
        $user = User::findOrFail($request->input('userid'));
        $chimucsArr = $request->input('chimucs');
        $user->chimucs()->detach($chimucsArr);
        $user->removeRedundantHalfChiMucs();
        return response()->json([
            'chimucs' => $user->chimucsWithPivot
        ], 200);
    }
}
