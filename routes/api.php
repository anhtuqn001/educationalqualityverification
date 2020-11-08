<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'middleware' => ['jwtverify']
], function ($router) {
    // Route::get('doituong', 'DoiTuongController@index');
    Route::get('user', 'AuthController@getAuthenticatedUser');
    Route::post('logout', 'AuthController@doLogout');
    // Route::post('changepassword', 'AuthController@changePassword');
    Route::get('nhom/{nienkhoaId}', 'NhomController@index');
    Route::post('nhom', 'NhomController@store');
    Route::put('nhom', 'NhomController@update');
    Route::delete('nhom/{id}', 'NhomController@destroy');
    Route::get('nhomswithuserminhchung/{nienkhoaId}', 'NhomController@getNhomsWithUserMinhChungs');

    //user 
    Route::post('user', 'UserController@createUserFromNhom');
    Route::put('user', 'UserController@update');
    Route::delete('user/{id}', 'UserController@destroy');

    //chimuc
    Route::get('chimuc/{nienkhoaId}', 'ChiMucController@index');
    Route::get('getchimucfromuser/{userId}', 'ChiMucController@getChiMucFromUser');
    Route::get('gettieuchi/{nienkhoaId}', 'ChiMucController@getTieuchis');
    Route::get('gettieuchiwithminhchungfiles/{nienkhoaId}', 'ChiMucController@getTieuchisWithMinhChungFiles');
    Route::get('gettieuchuan/{truongId}', 'ChiMucController@getTieuchuans');
    Route::get('gettieuchuanwithchibao/{nienkhoaId}', 'ChiMucController@getTieuchuansWithChiBaos');
    Route::get('gettieuchimuc4/{nienkhoaId}', 'ChiMucController@getTieuchisMuc4');
    Route::post('applychimuc', 'ChiMucController@applyChiMucsToUser');
    Route::post('removechimuc', 'ChiMucController@removeChiMucsFromUser');
    Route::get('getuserminhchungs/{userId}', 'ChiMucController@getUserMinhchungs');

    Route::get('chimuctest', 'ChiMucController@chimucTest');
    Route::get('getchimuctable/{id}', 'ChiMucController@getChimucTableTypeFromUser');
    Route::put('updatechimuctabledetails', 'ChiMucController@updateChimucTableDetails');
    Route::put('updatechimuccontent', 'ChiMucController@updateChimucContent');
    Route::put('updateketluanContent', 'ChiMucController@updateKetluanContent');
    Route::put('updatechimucchibaos', 'ChiMucController@updateChimucChibaos');
    Route::put('tieuchimuc4', 'ChiMucController@updateTieuchiMuc4');

    //truong
    Route::get('truong', 'TruongController@index');
    Route::post('truong', 'TruongController@store');

    //Nien khoa
    Route::post('getnienkhoa', 'NienKhoaController@getNienKhoa');
    Route::post('nienkhoa', 'NienKhoaController@store');
    Route::get('tentruong/{nienkhoaId}', 'NienKhoaController@getTenTruong');

    //minhchung

    Route::post('minhchung', 'MinhChungController@importMinhChungs');
    Route::get('getunassignedminhchungs/{nienkhoaId}', 'MinhChungController@getUnassignedMinhchungs');
    Route::post('assignminhchungs', 'MinhChungController@assignMinhchungsToUsers');
    Route::put('chibao', 'ChiBaoController@update');

    //minh chung file
    Route::post('fileminhchung', 'MinhChungFileController@store');
    Route::delete('removeminhchungfile', 'MinhChungFileController@remove');

    //kehoach
    Route::get('kehoachtdg/{nienkhoaId}', 'NienKhoaController@getKehoach');

    Route::put('kehoachtdg', 'KeHoachTDGController@update');

    Route::get('/createqdtlhdtdg/{nienkhoaId}', 'WordExportController@createQDTLHDTGDDocx');
    Route::get('/createbctdg/{nienkhoaId}', 'WordExportController@createBCTDGDocx');
    Route::get('/createdstv/{nienkhoaId}', 'WordExportController@createDSTVDocx');
    Route::get('/createdmmc/{nienkhoaId}', 'WordExportController@createDMMCDocx');
    Route::get('/createpdgtc/{tieuchiId}', 'WordExportController@createPDGTCDocx');
    Route::get('/createpdgtcm4/{tieuchiId}', 'WordExportController@createPDGTCM4Docx');

    //Khu vực
    Route::get('khuvuc/{khuvucId}', 'KhuVucController@getKhuVuc');
    Route::post('khuvuc', 'KhuVucController@store');
    //Tài
    Route::get('getlisttruong/{khuvucid}','KhuVucController@getTruongs');
    
});

Route::post('login', 'AuthController@doLogin');

// Route::get('/createqdtlhdtdg/{truongId}', 'WordExportController@createQDTLHDTGDDocx');
// Route::get('/createbctdg/{truongId}', 'WordExportController@createBCTDGDocx');
// Route::get('/createdstv/{truongId}', 'WordExportController@createDSTVDocx');
// Route::get('/createdmmc/{truongId}', 'WordExportController@createDMMCDocx');
// Route::get('/createpdgtc/{tieuchiId}', 'WordExportController@createPDGTCDocx');
// Route::get('/createpxdnh/{tieuchiId}', 'WordExportController@createPXDNHDocx');


Route::get('/exportqdtlhdtdg/{nienkhoaId}', 'WordExportController@exportQDTLHDTGDDocx');
Route::get('/exportbctdg/{nienkhoaId}', 'WordExportController@exportBCTDGDocx');
Route::get('/exportdstv/{nienkhoaId}', 'WordExportController@exportDSTVDocx');
Route::get('/exportdmmc/{nienkhoaId}', 'WordExportController@exportDMMCDocx');
Route::get('/exportpdgtc/{tieuchiId}', 'WordExportController@exportPDGTCDocx');
Route::get('/exportpxdnh/{tieuchiId}', 'WordExportController@exportPXDNHDocx');
Route::get('/exportpdgtcm4/{tieuchiId}', 'WordExportController@exportPDGTCM4Docx');


Route::get('/createpxdnh/{tieuchiId}', 'WordExportController@createPXDNHDocx');
Route::get('/createpxdnhm4/{tieuchiId}', 'WordExportController@createPXDNHM4Docx');

Route::get('/createkhtdg/{nienkhoaId}', 'WordExportController@createKHTDGDocx');

Route::get('/downloadminhchungfile/{fileName}', 'WordExportController@downloadMinhChungFile');


