<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MinhChung;
use App\Truong;
use App\ExportMinhchung;

class MinhChungController extends Controller
{
    public function importMinhChungs(Request $request) {
        try {
         //remove avalable minhchungs
        $truong = Truong::findOrFail($request->input('truongId'));
        if($truong->isMinhChungImported()) {
            $truong->removeAvailableMinhChungs();
        }
        $minhchungs = $request->input('minhchungs');
        foreach($minhchungs as $minhchung) {
           $newMinhChung = new MinhChung;
           $newMinhChung->maminhchung = $minhchung['maminhchung'];
           $newMinhChung->tenminhchung = $minhchung['tenminhchung'];
           $newMinhChung->songaybanhanh = $minhchung['songaybanhanh'];
           $newMinhChung->noibanhanh = $minhchung['noibanhanh'];
           $newMinhChung->ghichu = $minhchung['ghichu'];
           $newMinhChung->thutu = $minhchung['thutu'];
           $newMinhChung->sotieuchi = $minhchung['sotieuchi'];
           $newMinhChung->tieuchiid = $minhchung['tieuchiid'];
           $newMinhChung->save();
           if(count($minhchung['users']) > 0) {
            $newMinhChung->users()->sync($minhchung['users']);
           }
           if(count($minhchung['referenceTieuchis']) > 0) {
            $newMinhChung->tieuchis()->sync($minhchung['referenceTieuchis']);
           }
        }
        $exportMinhchungs = $request->input('exportMinhchungs');
        foreach($exportMinhchungs as $exportMinhchung) {
            $newExportMinhchung = new ExportMinhchung;
            $newExportMinhchung->thutu = $exportMinhchung['thutu'];
            $newExportMinhchung->maminhchung = $exportMinhchung['maminhchung'];
            $newExportMinhchung->tenminhchung = $exportMinhchung['tenminhchung'];
            $newExportMinhchung->songaybanhanh = $exportMinhchung['songaybanhanh'];
            $newExportMinhchung->noibanhanh = $exportMinhchung['noibanhanh'];
            $newExportMinhchung->ghichu = $exportMinhchung['ghichu'];
            $newExportMinhchung->tieuchiid = $exportMinhchung['tieuchiid'];
            $newExportMinhchung->save();   
        }
            $truong1 = Truong::findOrFail($request->input('truongId'));
            $tieuchis = $truong1->tieuchis;
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'tieuchis' => $tieuchis
        ], 200);
    }

    public function getUnassignedMinhchungs($truongId) {
        try {
            $truong = Truong::findOrFail($truongId);
            $minhchungs = $truong->getUnassignedMinhChungs();
            if($truong != null) {
                $nhoms = $truong->nhoms()->with(['users'])->get();
            }
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'minhchungs' => $minhchungs,
            'nhoms' => $nhoms
        ], 200);
    }

    public function assignMinhchungsToUsers(Request $request) {
        try {
            $minhchungs = $request->input('minhchungs');
        if(count($minhchungs) > 0) {
            foreach($minhchungs as $minhchung) {
               $availableMinhChung = MinhChung::findOrFail($minhchung['id']);
               $availableMinhChung->users()->sync($minhchung['users']);
            }
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
}
