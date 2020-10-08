<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChiMuc;
use App\ChiBao;
use App\Nhom;
use App\User;
use App\ChimucTableDetail;
use App\Truong;

class ChiMucController extends Controller
{
    public function index($truongId) {
       $truong = Truong::findOrFail($truongId);
       $chimucs = ChiMuc::Where('truongid', $truong->id)->Where('chimucchaid', null)->get();
       foreach($chimucs as $chimuc) {
            $chimuc->applyChiMucCons();
       }
       $nhoms = $truong->nhoms;
       $users = $truong->users;
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
        $truongId = $user->getTruongId();
        $truong = Truong::findOrFail($truongId);
        $chimucs = $truong->chimucs()->where('chimucchaid', null)->get();
        foreach($chimucs as $chimuc) {
                $chimuc->applyChiMucCons();
        }
        
        $userChimucs = $user->chimucsWithPivot()->with(['columns', 'chimucTableDetails', 'chibaos'])->get();
        foreach($userChimucs as $userChimuc) {
            $userChimuc->getMaxDatMuc();
        }
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
        ], 200);
    }

    public function updateKetluanContent(Request $request) {
        try { 
           $chimucId = $request->input('chimucId');
           $chimuc = ChiMuc::findOrFail($chimucId);
           $chimuc->content = $request->input('content');
           $chimuc->content2 = $request->input('content2');
           $chimuc->save();
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'chimuc' => $chimuc 
        ], 200);
    }

    public function updateChimucChibaos(Request $request) {
        try {
            $chimucId = $request->input('chimucId');
            $chimuc = ChiMuc::findOrFail($chimucId);
            $chimuc->isOk = $request->input('isOk');
            $chimuc->thuocmuc = $request->input('thuocmuc');
            $chimuc->save();
            $chibaos = $request->input('chibaos');
            $testArr = [];
            foreach($chibaos as $chibao) {
               $availableChibao = ChiBao::findOrFail($chibao['id']);
               array_push($testArr, $chibao['id']);
               $availableChibao->noidung = $chibao['noidung'];
               $availableChibao->isOk = $chibao['isOk'];
               $availableChibao->save();
            }
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'chimuc' => $testArr
        ], 200);
    }

    public function getTieuchis($truongId) {
        try {
            $truong = Truong::findOrFail($truongId);
            $tieuchis = $truong->tieuchis;
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'tieuchis' => $tieuchis
        ], 200);
    }
}
