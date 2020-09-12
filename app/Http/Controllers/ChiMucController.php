<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChiMuc;
use App\Nhom;
use App\User;
use App\ChimucTableDetail;

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
        $chimucs = ChiMuc::Where('chimucchaid', null)->get();
        foreach($chimucs as $chimuc) {
                $chimuc->applyChiMucCons();
        }
        $user = User::findOrFail($userId);
        $userChimucs = $user->chimucsWithPivot()->with(['columns', 'chimucTableDetails', 'chibaos'])->get();
        return response()->json([
            'chimucs' => $chimucs,
            'userchimucs' => $userChimucs
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
        $halfChimucArr = $request->input('halfchimucs');
        $halfChimucsAssociativeArr = array();
        foreach($halfChimucArr as $halfChimuc) {
            $halfChimucsAssociativeArr[$halfChimuc] = ['isHalf' => 1];
        }
        $user->chimucs()->syncWithoutDetaching($halfChimucsAssociativeArr);
        $user->removeRedundantHalfChiMucs();
        return response()->json([
            'chimucs' => $user->chimucsWithPivot
        ], 200);
    }

    public function chimucTest(Request $request) {
        $chimuc = ChiMuc::with(['columns', 'chimucTableDetails'])->findOrFail(12);
        return response()->json([
            'chimuc' => $chimuc
        ], 200);
    }

    // public function getChimucTableTypeFromUser($userId) {
    //     $user = User::findOrFail($userId);
    //     return response()->json([
    //         'chimucs' => $user->chimucs
    //     ], 200);
    // }

    public function updateChimucTableDetails(Request $request) {
        $chimucTableDetails = $request->input('chimuc_table_details');
        try {
        foreach($chimucTableDetails as $details) {
            $id = $details['id'];
            unset($details['id']);
            ChimucTableDetail::where('id', '=', $id)->update($details);
        }
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true
        ]);
    }
    
    public function updateChimucContent(Request $request) {
        try { 
           $chimucId = $request->input('chimucId');
           $chimuc = ChiMuc::findOrFail($chimucId);
           $chimuc->content = $request->input('content');
           $chimuc->save();
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'chimuc' => $chimuc 
        ]);
    }
}
