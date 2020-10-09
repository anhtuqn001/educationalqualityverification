<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Nhom;
use App\Truong;
use App\ChiMuc;
class WordExportController extends Controller
{
    public function createQDTLHDTGDDocx($truongId) {

        //get data
        $truong = Truong::findOrFail($truongId);
        $nhoms = $truong->nhoms()->with('users')->get();
        $nhomHDTDG = $nhoms->first(function($item, $index) {
            return $item['loainhom'] == 1;
        });
        $nhomTK = $nhoms->first(function($item, $index) {
            return $item['loainhom'] == 2;
        });
        $nhomsNormal = $nhoms->where('loainhom', 0);
        // $chimucabcxyz = ChiMuc::findOrFail(28);
        // $html = $chimucabcxyz->content;
        //create word
        $phpWord = new \PhpOffice\PhpWord\PhpWord();

        // set default document settings
        $phpWord->setDefaultFontName('Times New Roman');
        $phpWord->setDefaultFontSize(13);
        
        //Table 
        $fancyTableStyleName = 'Fancy Table';
        $fancyTableStyle = array('alignment' => \PhpOffice\PhpWord\SimpleType\JcTable::CENTER);
        $phpWord->addTableStyle($fancyTableStyleName, $fancyTableStyle);
        $cellHCentered = array('alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER);
        $section = $phpWord->addSection(['marginLeft' => 1700, 'marginRight' => 900]);
        $table = $section->addTable($fancyTableStyleName);
        $table->addRow();
        $cell1 = $table->addCell(4500);
		$cell1->addText("PHÒNG GD ĐT " . mb_strtoupper($truong->huyen), ['size' => 12], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
		$cell1->addText(mb_strtoupper($truong->tentruong), ['size' => 12, 'bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $testrun1 = $cell1->addTextRun(['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
		$testrun1->addLine(['weight' => 1, 'width' => 150, 'height' => 0, 'color' => 000000]);
		$cell1->addText("Số .....", null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
     //   $testrun1->addText("PHÒNG GD ĐT " . mb_strtoupper($truong->huyen), ['size' => 12], );
     //   $testrun1->addTextBreak();
     //   $testrun1->addText(mb_strtoupper($truong->tentruong), ['size' => 12, 'bold' => true]);
     //   $testrun1->addTextBreak();
     
     //   $testrun1->addTextBreak();
     //   $testrun1->addText("Số .....");

        $cell2 = $table->addCell(5500);
        $cell2->addText("CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", ['size' => 12, 'bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
		$cell2->addText("Độc lập - Tự do - Hạnh phúc", ['size' => 13, 'bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
	//	$cell2->addLine(['weight' => 1, 'width' => 150, 'height' => 0, 'color' => 000000]);
		$testrun2 = $cell2->addTextRun(['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
		$testrun2->addLine(['weight' => 1, 'width' => 150, 'height' => 0, 'color' => 000000]);
		$cell2->addText("......., ngày .. tháng .. năm ....", ['italic' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
    //    $testrun2->addText();
    //    $testrun2->addTextBreak();
    //    $testrun2->addText("Độc lập - Tự do - Hạnh phúc", ['size' => 13, 'bold' => true]);
    //    $testrun2->addTextBreak();
    //    $testrun2->addLine(['weight' => 1, 'width' => 150, 'height' => 0, 'color' => 000000]);
    //    $testrun2->addTextBreak();
    //    $testrun2->addText("......., ngày .. tháng .. năm ....", ['italic' => true]);
        //Normal

        $paragraphStyleName = 'pStyle';
        $phpWord->addParagraphStyle($paragraphStyleName, array('alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceBefore' => 500, 'spaceAfter' => 50));
        $section = $phpWord->addSection([
            'breakType' => 'continuous'
        ]);
        $section->addText("QUYẾT ĐỊNH", ['bold' => true], $paragraphStyleName);

        $section->addText("Về việc thành lập Hội đồng tự đánh giá", ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 50]);
        $testrun3 = $section->addTextRun($cellHCentered);
        $testrun3->addLine(['weight' => 0.5, 'width' => 150, 'height' => 0, 'color' => 000000]);
        $section->addText("HIỆU TRƯỞNG " . mb_strtoupper($truong->tentruong), ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        // $section->addText("Căn cứ văn bản hợp nhất số 03/VBHN-BGDĐT ngày 22/01/2014 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Điều lệ trường Tiểu học;", null, ['hanging' => -1, 'spaceAfter' => 5]);
        switch($truong->loaitruong) {
            case 1:
                $section->addText("Căn cứ Thông tư số 19/2018/TT-BGDĐT, ngày 22/8/2018 của Bộ trưởng Bộ GDĐT ban hành Quy định về kiểm định chất lượng giáo dục và công nhận đạt chuẩn quốc gia đối với trường mầm non;", null, ['hanging' => -1, 'spaceAfter' => 5]);
                $section->addText("Căn cứ Công văn số 5942/BGDĐT-QCL ngày 28/12/2018 của Bộ GDĐT về việc hướng dẫn tự đánh giá và đánh giá ngoài trường mầm non;", null, ['hanging' => -1, 'spaceAfter' => 5]);
                break;
            case 2:
                $section->addText("Căn cứ Thông tư số 17/2018/TT-BGDĐT, ngày 22/8/2018 của Bộ trưởng Bộ GDĐT ban hành Quy định về kiểm định chất lượng giáo dục và công nhận đạt chuẩn quốc gia đối với trường tiểu học;", null, ['hanging' => -1, 'spaceAfter' => 5]);
                $section->addText("Căn cứ Công văn số 5932/BGDĐT-QCL ngày 28/12/2018 của Bộ GDĐT về việc hướng dẫn tự đánh giá và đánh giá ngoài cơ sở giáo dục phổ thông;", null, ['hanging' => -1, 'spaceAfter' => 5]);
                break;
            case 3:
                $section->addText("Căn cứ Thông tư số 18/2018/TT-BGDĐT, ngày 22/8/2018 của Bộ trưởng Bộ GDĐT ban hành Quy định về kiểm định chất lượng giáo dục và công nhận đạt chuẩn quốc gia đối với trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học;", null, ['hanging' => -1, 'spaceAfter' => 5]);
                $section->addText("Căn cứ Công văn số 5932/BGDĐT-QCL ngày 28/12/2018 của Bộ GDĐT về việc hướng dẫn tự đánh giá và đánh giá ngoài cơ sở giáo dục phổ thông;", null, ['hanging' => -1, 'spaceAfter' => 5]);
        }
        
        // $section->addText("Căn cứ Kế hoạch số: 81/KH-GDĐT huyện Đông Hòa, ngày 27/7/2018 của Phòng GDĐT huyện Đông Hòa “Kế hoạch xây dựng trường tiểu học đạt chuẩn quốc gia mức độ 1 Giai đoạn 2018 -2025”;", null, ['hanging' => -1, 'spaceAfter' => 5]);
        // $section->addText("Căn cứ Kế hoạch số 28/KH-THNHD ngày 20/10/2018  kế hoạch xây dựng trường chuẩn quốc gia năm học 2018-2019 của Trường Tiểu học Kim Đồng;", null, ['hanging' => -1, 'spaceAfter' => 5]);
        $section->addText("Xét đề nghị của các bộ phận trong nhà trường,", null, ['hanging' => -1, 'spaceAfter' => 5]);
        $section->addText("QUYẾT ĐỊNH", ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceBefore' => 300]);
        $textrun4 = $section->addTextRun(['hanging' => -1, 'spaceAfter' => 5]);
        $textrun4->addText("Điều 1. ", ['bold' => true]);
        $textrun4->addText("Thành lập Hội đồng tự đánh giá ". $truong->tentruong ." gồm các ông (bà) có tên trong danh sách kèm theo.");
        // $textrun4->addText("Giúp việc cho Hội đồng có nhóm thư ký và các nhóm công tác gồm các ông / bà có tên trong danh sách kèm theo.");
        $section->addText("Giúp việc cho Hội đồng có nhóm thư ký và các nhóm công tác gồm các ông / bà có tên trong danh sách kèm theo.", null, ['hanging' => -1, 'spaceAfter' => 5]);
        $textrun5 = $section->addTextRun(['hanging' => -1, 'spaceAfter' => 5]);
        $textrun5->addText("Điều 2. ", ['bold' => true]);
        $textrun5->addText("Hội đồng tự đánh giá có nhiệm vụ triển khai công tác tự đánh giá " . $truong->tentruong . " theo các quy định hiện hành của Bộ GDĐT.");
        $textrun5 = $section->addTextRun(['hanging' => -1, 'spaceAfter' => 5]);
        $textrun5->addText("Điều 3. ", ['bold' => true]);
        $textrun5->addText("Các ông (bà) có tên tại Điều 1 chịu trách nhiệm thi hành Quyết định này./.");

        //table 2 
        $section = $phpWord->addSection(['breakType' => 'continuous', 'marginLeft' => 1500, 'marginRight' => 0]);
        $table = $section->addTable();
        $table->addRow();
        $cell3 = $table->addCell(4800);
        $testrun6 = $cell3->addTextRun(['spaceAfter' => 0]);
        $testrun6->addText("Nơi nhận:", ['size' => 12, 'bold' => true, 'italic' => true,]);
        // $testrun6->addTextBreak();
        
        $multilevelNumberingStyleName = 'multilevel';
        $phpWord->addNumberingStyle(
        $multilevelNumberingStyleName,
            array(
                'type'   => 'multilevel',
                'levels' => array(
                    array('format' => 'decimal', 'text' => '-', 'left' => 250, 'hanging' => 150, 'tabPos' => 360),
                    ),
                )
            );

        $cell3->addListItem('Như Điều 3', 0, ['size' => 11], $multilevelNumberingStyleName, ['lineHeight' => 0.6, 'spaceAfter' => 10]);
        $cell3->addListItem('PGDĐT (để b/c);', 0, ['size' => 11], $multilevelNumberingStyleName, ['lineHeight' => 0.6, 'spaceAfter' => 10]);
        $cell3->addListItem('Lưu :VT;', 0, ['size' => 11], $multilevelNumberingStyleName, ['lineHeight' => 0.6, 'spaceAfter' => 10]);
        // $testrun6->addTextBreak();
        // $testrun6->addLine(['weight' => 1, 'width' => 150, 'height' => 0, 'color' => 000000]);
        // $testrun6->addTextBreak();
        // $testrun6->addText("Số 01/QĐ-TiHKĐ", ['size' => 11]);

        $cell2 = $table->addCell(5200);
        $testrun7 = $cell2->addTextRun($cellHCentered);
        $testrun7->addText("HIỆU TRƯỞNG", ['size' => 13, 'bold' => true]);
        $testrun7->addTextBreak(3);
        $testrun7->addText(".....", ['size' => 12, 'bold' => true]);
        

        //Danh sách TV
        $section = $phpWord->addSection(
            array(
                'breakType' => 'nextPage',
            )
        );

        $section->addText("DANH SÁCH THÀNH VIÊN HỘI ĐỒNG TỰ ĐÁNH GIÁ", ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $section->addText(mb_strtoupper($truong->tentruong), ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $section->addText("(Kèm theo Quyết định số ....... ngày .. tháng .. năm .... của " . $truong->tentruong ." )", ['italic' => true]);

        $customTableName = 'Users Table';
        $customTableStyle = array('borderSize' => 1, 'borderColor' => '000000');
        $customTableCellStyle = array('valign' => 'center');
        // $customFirstRowStyle = array('borderBottomSize' => 18, 'borderBottomColor' => '0000FF', 'bgColor' => '66BBFF');
        $phpWord->addTableStyle($customTableName, $customTableStyle);

        $section = $phpWord->addSection(['marginLeft' => 1500, 'marginRight' => 1050, 'breakType' => 'continuous']);
        $table = $section->addTable($customTableName);
        $table->addRow();
        $table->addCell(1000, $customTableCellStyle)->addText("TT", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $table->addCell(2500, $customTableCellStyle)->addText("Họ và tên", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $table->addCell(2500, $customTableCellStyle)->addText("Chức vụ", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $table->addCell(4500, $customTableCellStyle)->addText("Nhiệm vụ", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $nhomHDTGDCounter = 1;
        if(count($nhomHDTDG->users) > 0)
        foreach($nhomHDTDG->users as $user) {
            $table->addRow();
            $table->addCell(1000, $customTableCellStyle)->addText($nhomHDTGDCounter, null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
            $table->addCell(2500, $customTableCellStyle)->addText($user->hoten, null, ['spaceAfter' => 0, 'indent' => 0.1]);
            $table->addCell(2500, $customTableCellStyle)->addText($user->chucvu, null, ['spaceAfter' => 0, 'indent' => 0.1]);
            $table->addCell(4500, $customTableCellStyle)->addText($user->nhiemvu, null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
            $nhomHDTGDCounter++;
        }
       

        $section = $phpWord->addSection(
            array(
                'breakType' => 'continuous',
            )
        );

        //Danh sách TV 2
        $section = $phpWord->addSection(
            array(
                'breakType' => 'continuous',
            )
        );

        $section->addText("DANH SÁCH THÀNH VIÊN NHÓM THƯ KÝ", ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $section->addText("(Kèm theo Quyết định số ...... ngày .. tháng .. năm ... của " . $truong->tentruong . " )", ['italic' => true]);


        $section = $phpWord->addSection(['marginLeft' => 1500, 'marginRight' => 1050, 'breakType' => 'continuous']);
        $table = $section->addTable($customTableName);
        $table->addRow();
        $table->addCell(600, $customTableCellStyle)->addText("TT", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $table->addCell(3200, $customTableCellStyle)->addText("Họ và tên", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $table->addCell(3200, $customTableCellStyle)->addText("Chức danh, chức vụ", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $table->addCell(3500, $customTableCellStyle)->addText("Nhiệm vụ", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $nhomTKCounter = 1;
        if(count($nhomTK->users) > 0) {
            foreach($nhomTK->users as $user) {
                $table->addRow();
                $table->addCell(600, $customTableCellStyle)->addText($nhomTKCounter, null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $table->addCell(3200, $customTableCellStyle)->addText($user->hoten, null, ['spaceAfter' => 0, 'indent' => 0.1]);
                $table->addCell(3200, $customTableCellStyle)->addText($user->chucvu, null, ['spaceAfter' => 0, 'indent' => 0.1]);
                $table->addCell(3500, $customTableCellStyle)->addText($user->nhiemvu, null, ['spaceAfter' => 0, 'indent' => 0.1]);
                $nhomTKCounter++;
            }
        }

        $section = $phpWord->addSection(
            array(
                'breakType' => 'continuous',
            )
        );

       // Danh sách TV 3
        $section = $phpWord->addSection(
            array(
                'breakType' => 'nextPage',
            )
        );

        $section->addText("DANH SÁCH CÁC NHÓM CÔNG TÁC", ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $section->addText("(Kèm theo Quyết định ....... ngày .. tháng .. năm .... của " . $truong->tentruong ." )", ['italic' => true]);


        $section = $phpWord->addSection(['marginLeft' => 1500, 'marginRight' => 1050, 'breakType' => 'continuous']);
        $table = $section->addTable($customTableName);
        $table->addRow();
        $table->addCell(1500, $customTableCellStyle)->addText("TT", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $table->addCell(2800, $customTableCellStyle)->addText("Họ và tên", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $table->addCell(2800, $customTableCellStyle)->addText("Chức danh, chức vụ", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $table->addCell(2900, $customTableCellStyle)->addText("Ghi chú", ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        
        if(count($nhomsNormal) > 0) {
            foreach($nhomsNormal as $nhomNormal) {
                if(count($nhomNormal->users) > 0) {
                    $nhomNormalCounter = 1;
                    foreach($nhomNormal->users as $user) {
                        $ghichu = $user->isTruongnhom ? 'Trưởng nhóm' : 'Thành viên';
                        if($nhomNormalCounter == 1) {
                            $table->addRow();
                            $table->addCell(1500, ['vMerge' => 'restart', 'valign' => 'center'])->addText($nhomNormal->tennhom, null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                            $table->addCell(2800, $customTableCellStyle)->addText($user->hoten, null, ['spaceAfter' => 0, 'indent' => 0.1]);
                            $table->addCell(2800, $customTableCellStyle)->addText($user->chucvu, null, ['spaceAfter' => 0, 'indent' => 0.1]);
                            $table->addCell(2900, $customTableCellStyle)->addText($ghichu, null, ['spaceAfter' => 0, 'indent' => 0.1]);
                        } else {
                            $table->addRow();
                            $table->addCell(1500, ['vMerge' => 'continue']);
                            $table->addCell(2800, $customTableCellStyle)->addText($user->hoten, null, ['spaceAfter' => 0, 'indent' => 0.1]);
                            $table->addCell(2800, $customTableCellStyle)->addText($user->chucvu, null, ['spaceAfter' => 0, 'indent' => 0.1]);
                            $table->addCell(2900, $customTableCellStyle)->addText($ghichu, null, ['spaceAfter' => 0, 'indent' => 0.1]);
                        }
                        $nhomNormalCounter++;
                    }
                }
            }
        }

        $section = $phpWord->addSection(
            array(
                'breakType' => 'nextPage',
            )
        );

        // $section->addText($chimucabcxyz);
        // \PhpOffice\PhpWord\Shared\Html::addHtml($section, $html, false, false);
        
        

        $objectWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
        $wordFileName = 'QDTLHD' . $truongId . '.docx' ;
        try {
            $objectWriter->save(storage_path($wordFileName));
        } catch (Exception $e) {

        }
        return response()->download(storage_path($wordFileName));
    }

    public function createBCTDGDocx($truongId) {
        $truong = Truong::findOrFail($truongId);
        $chimucs = $truong->chimucs;
        $nhoms = $truong->nhoms()->with('users')->get();
        $nhomHDTDG = $nhoms->first(function($item, $index) {
            return $item['loainhom'] == 1;
        });

        $phpWord = new \PhpOffice\PhpWord\PhpWord();
        $phpWord->setDefaultFontName('Times New Roman');
        $phpWord->setDefaultFontSize(13);

        $tieuchuans = $chimucs->where('loaichimuc', 3);

        $section = $phpWord->addSection([
            'borderBottomColor' => 000000,
            'borderBottomSize' => 5,
            'borderLeftColor' => 000000,
            'borderLeftSize' => 5,
            'borderTopColor' => 000000,
            'borderTopSize' => 5,
            'borderRightColor' => 000000,
            'borderRightSize' => 5,
        ]);
        $section->addText(mb_strtoupper('PHÒNG GIÁO DỤC VÀ ĐÀO TẠO ' . $truong->huyen), ['size' => 14], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $section->addText(mb_strtoupper($truong->tentruong), ['size' => 14, 'bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 200]);
        $testrun1 = $section->addTextRun(['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 2000]);
		$testrun1->addLine(['weight' => 1, 'width' => 200, 'height' => 0, 'color' => 000000]);


        $section->addText('BÁO CÁO TỰ ĐÁNH GIÁ', ['size' => 20, 'bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        // $section = $phpWord->addSection([
        //     'breakType' => 'continuous'
        // ]);

        // $section->addText('test');

        $section = $phpWord->addSection([
            'marginBottom' => 500,
            'breakType' => 'nextPage'
        ]);
        $section->addText('BÁO CÁO TỰ ĐÁNH GIÁ', ['size' => 20, 'bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 1000]);
        $section = $phpWord->addSection([
            'breakType' => 'continuous',
            
        ]);
        $section->addText('DANH SÁCH VÀ CHỮ KÝ', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, ]);
        $section->addText('THÀNH VIÊN HỘI ĐỒNG TỰ ĐÁNH GIÁ', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $table = $section->addTable(['borderSize' => 6, 'borderColor' => '#000000']);
        $titleRow = $table->addRow(400); 
        $cell1 = $titleRow->addCell(700, ['valign' => 'center']);
        $cell1->addText('TT', ['bold' => true], ['spaceAfter'=> 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        $cell2 = $titleRow->addCell(3000, ['valign' => 'center']);
        $cell2->addText('Họ và tên', ['bold' => true], ['spaceAfter'=> 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        $cell3 = $titleRow->addCell(2000, ['valign' => 'center']);
        $cell3->addText('Chức vụ', ['bold' => true], ['spaceAfter'=> 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        $cell4 = $titleRow->addCell(2000, ['valign' => 'center']);
        $cell4->addText('Nhiệm vụ', ['bold' => true], ['spaceAfter'=> 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        $cell5 = $titleRow->addCell(2000, ['valign' => 'center']);
        $cell5->addText('Chữ ký', ['bold' => true], ['spaceAfter'=> 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $nhomHDTGDCounter = 1;
        if(count($nhomHDTDG->users) > 0)
        foreach($nhomHDTDG->users as $user) {
            $table->addRow(400);
            $table->addCell(500, ['valign' => 'center'])->addText($nhomHDTGDCounter, null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
            $table->addCell(3000, ['valign' => 'center'])->addText($user->hoten, null, ['spaceAfter' => 0, 'indent' => 0.1]);
            $table->addCell(2000, ['valign' => 'center'])->addText($user->chucvu, null, ['spaceAfter' => 0, 'indent' => 0.1]);
            $table->addCell(2000, ['valign' => 'center'])->addText($user->nhiemvu, null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
            $table->addCell(2000, ['valign' => 'center']);
            $nhomHDTGDCounter++;
        }


        foreach($chimucs as $chimuc) {
            if($chimuc->isDropLine) {
                $section = $phpWord->addSection([
                    'breakType' => 'nextPage',
                ]);
            } else {
                $section = $phpWord->addSection([
                    'breakType' => 'continuous',
                ]);
            }
            if(!$chimuc->isHideTitle) {
                if($chimuc->isCenterTitle) {
                    $section->addText($chimuc->tenchimuc, ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                } else {
                    $section->addText($chimuc->tenchimuc, ['bold' => true]);
                }
                
            }

            //loaichimuc = 1 : normal text
            if($chimuc->loaichimuc == 1) {
                $html = $chimuc->content;
                \PhpOffice\PhpWord\Shared\Html::addHtml($section, $html, false, false);
            }

            $tableStyle = array('borderSize' => 6, 'borderColor' => '#000000');

            $tableCellStyle = array('valign' => 'center');

            //loaichimuc = 2 : table
            if($chimuc->loaichimuc == 2) {
                $section = $phpWord->addSection([
                    'breakType' => 'continuous',
                    'marginLeft' => 1500,
                    'marginRight' => 1500,
                    'marginBottom' => 1500
                ]);
                $table = $section->addTable($tableStyle);
                $table->addRow(400);
                
                foreach($chimuc->columns as $column) {
                    $table->addCell(2000, $tableCellStyle)->addText($column->title, ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                    // $section->addText($column->title);
                }
                $excludeRowsKeyArray = array("id", "chimucid", "created_at", "updated_at");
                foreach($chimuc->chimucTableDetails as $details) {
                    $properties = array_keys($details->getOriginal());
                    $properties = array_filter($properties, function($item) use($excludeRowsKeyArray) {
                        return !in_array($item, $excludeRowsKeyArray);
                    });
                    $table->addRow(400);
                    foreach($properties as $property) {
                        if($details[$property] != null){
                            if($property == 'name'){
                                $table->addCell(6000, $tableCellStyle)->addText($details[$property], null, ['spaceAfter' => 0, 'indent' => 0.2]);
                            } else {
                                $table->addCell(2000, $tableCellStyle)->addText($details[$property], null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                            }
                        }
                    }             
                }
            }

            if($chimuc->loaichimuc == 4){
                $chibaos = $chimuc->chibaos;
                $chibaosMuc1 = $chibaos->where('loai', 2)->where('thuocmuc', 1);
                $chibaosMuc2 = $chibaos->where('loai', 2)->where('thuocmuc', 2);
                $chibaosMuc3 = $chibaos->where('loai', 2)->where('thuocmuc', 3);
                if(count($chibaosMuc1) > 0) {
                    $section->addText('Mức 1:');
                    foreach($chibaosMuc1 as $chibao) {
                        $section->addText($chibao->tieude, ['italic' => true], ['hanging' => -0.5]);
                    }
                }
                if(count($chibaosMuc2) > 0) {
                    $section->addText('Mức 2:');
                    foreach($chibaosMuc2 as $chibao) {
                        $section->addText($chibao->tieude, ['italic' => true], ['hanging' => -0.5]);
                    }
                }
                if(count($chibaosMuc3) > 0) {
                    $section->addText('Mức 3:');
                    foreach($chibaosMuc3 as $chibao) {
                        $section->addText($chibao->tieude, ['italic' => true], ['hanging' => -0.5]);
                    }
                }
                foreach($chibaos as $chibao) {
                    $section = $phpWord->addSection([
                        'breakType' => 'continuous'
                    ]);
                    switch($chibao->loai) {
                        case 0:
                            $section->addText($chibao->tieude, ['bold' => true]);
                            break;
                        case 1:
                            $section->addText($chibao->tieude, ['bold' => true]);
                            // $section->addText($chibao->noidung);
                            $html = $chibao->noidung;
                            \PhpOffice\PhpWord\Shared\Html::addHtml($section, $html, false, false);
                            break;
                        case 2:
                            $html = $chibao->noidung;
                            // $section->addText($chibao->noidung);
                            \PhpOffice\PhpWord\Shared\Html::addHtml($section, $html, false, false);
                            break;
                    }   
                    
                }

                //5. Tự đánh giá

                $section->addText('5. Tự đánh giá', ['bold' => true]);
                $table = $section->addTable($tableStyle);
                $table->addRow();
                $cell1 = $table->addCell(4000, ['gridSpan' => 2, 'valign' => 'center']);
                $cell1->addText('Mức 1', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

                $cell2 = $table->addCell(4000, ['gridSpan' => 2, 'valign' => 'center']);
                $cell2->addText('Mức 2', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

                $cell3 = $table->addCell(4000, ['gridSpan' => 2, 'valign' => 'center']);
                $cell3->addText('Mức 3', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

                $table->addRow();
                $cell1 = $table->addCell(4000, ['valign' => 'center']);
                $cell1->addText('Chỉ báo', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell2 = $table->addCell(4000, ['valign' => 'center']);
                $cell2->addText('Đạt/Không đạt', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell3 = $table->addCell(4000, ['valign' => 'center']);
                $cell3->addText('Chỉ báo', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell4 = $table->addCell(4000, ['valign' => 'center']);
                $cell4->addText('Đạt/Không đạt', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell5 = $table->addCell(4000, ['valign' => 'center']);
                $cell5->addText('Chỉ báo', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell6 = $table->addCell(4000, ['valign' => 'center']);
                $cell6->addText('Đạt/Không đạt ', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cellIndex = 0;
                $table->addRow();
                $cell1 = $table->addCell(4000, ['valign' => 'center']);
                $cell1->addText('a', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell2 = $table->addCell(4000, ['valign' => 'center']);
                $cell2->addText(isset($chibaosMuc1->values()[$cellIndex]) ? ($chibaosMuc1->values()[$cellIndex]->isOk ? 'Đạt' : 'Không đạt') : '-' , null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell3 = $table->addCell(4000, ['valign' => 'center']);

                switch($chibaosMuc2->values()->count()) {
                    case 0:
                        $cell3->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 1:
                        $cell3->addText('*', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 2:
                    case 3:
                        $cell3->addText('a', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                }                
                // $cell3->addText($chibaosMuc2->values()->count(), null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell4 = $table->addCell(4000, ['valign' => 'center']);
                $cell4->addText(isset($chibaosMuc2->values()[$cellIndex]) ? ($chibaosMuc2->values()[$cellIndex]->isOk ? 'Đạt' : 'Không đạt') : '-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell5 = $table->addCell(4000, ['valign' => 'center']);
                switch($chibaosMuc3->values()->count()) {
                    case 0:
                        $cell5->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 1:
                        $cell5->addText('*', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 2:
                    case 3:
                        $cell5->addText('a', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                }
                // $cell5->addText($chibaosMuc3->values()->count(), null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell6 = $table->addCell(4000, ['valign' => 'center']);
                $cell6->addText(isset($chibaosMuc3->values()[$cellIndex]) ? ($chibaosMuc3->values()[$cellIndex]->isOk ? 'Đạt' : 'Không đạt') : '-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

                $cellIndex++;
                $table->addRow();
                $cell1 = $table->addCell(4000, ['valign' => 'center']);
                $cell1->addText('b', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell2 = $table->addCell(4000, ['valign' => 'center']);
                $cell2->addText(isset($chibaosMuc1->values()[$cellIndex]) ? ($chibaosMuc1->values()[$cellIndex]->isOk ? 'Đạt' : 'Không đạt') : '-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell3 = $table->addCell(4000, ['valign' => 'center']);
                switch($chibaosMuc2->values()->count()) {
                    case 0:
                        $cell3->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 1:
                        $cell3->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 2:
                    case 3:
                        $cell3->addText('b', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                }
                // $cell3->addText('*', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell4 = $table->addCell(4000, ['valign' => 'center']);
                $cell4->addText(isset($chibaosMuc2->values()[$cellIndex]) ? ($chibaosMuc2->values()[$cellIndex]->isOk ? 'Đạt' : 'Không đạt') : '-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell5 = $table->addCell(4000, ['valign' => 'center']);

                switch($chibaosMuc3->values()->count()) {
                    case 0:
                        $cell5->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 1:
                        $cell5->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 2:
                    case 3:
                        $cell5->addText('b', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                }
                
                $cell6 = $table->addCell(4000, ['valign' => 'center']);
                $cell6->addText(isset($chibaosMuc3->values()[$cellIndex]) ? ($chibaosMuc3->values()[$cellIndex]->isOk ? 'Đạt' : 'Không đạt') : '-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

                $cellIndex++;
                $table->addRow();
                $cell1 = $table->addCell(4000, ['valign' => 'center']);
                $cell1->addText('c', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell2 = $table->addCell(4000, ['valign' => 'center']);
                $cell2->addText(isset($chibaosMuc1->values()[$cellIndex]) ? ($chibaosMuc1->values()[$cellIndex]->isOk ? 'Đạt' : 'Không đạt') : '-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell3 = $table->addCell(4000, ['valign' => 'center']);
                switch($chibaosMuc2->values()->count()) {
                    case 0:
                        $cell3->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 1:
                        $cell3->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 2:
                        $cell3->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 3:
                        $cell3->addText('c', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                }
                // $cell3->addText('*', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell4 = $table->addCell(4000, ['valign' => 'center']);
                $cell4->addText(isset($chibaosMuc2->values()[$cellIndex]) ? ($chibaosMuc2->values()[$cellIndex]->isOk ? 'Đạt' : 'Không đạt') : '-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $cell5 = $table->addCell(4000, ['valign' => 'center']);

                switch($chibaosMuc3->values()->count()) {
                    case 0:
                        $cell5->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 1:
                        $cell5->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 2:
                        $cell5->addText('-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                    case 3:
                        $cell5->addText('c', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        break;
                }
                $cell6 = $table->addCell(4000, ['valign' => 'center']);
                $cell6->addText(isset($chibaosMuc3->values()[$cellIndex]) ? ($chibaosMuc3->values()[$cellIndex]->isOk ? 'Đạt' : 'Không đạt') : '-', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                $result = $chimuc->thuocmuc !== null ? (($chimuc->thuocmuc == 0) ? 'Không đạt' : 'Đạt mức ' . $chimuc->thuocmuc) : '';
                $section->addText('Kết quả: ' . $result, ['bold' => true]);
            }

            //Kết luận về tiêu chuẩn
            if($chimuc->loaichimuc == 5) {

                $chimucTieuchuan = $chimuc->chimuccha;
                
                if($chimucTieuchuan->loaichimuc == 3) {
                  $tieuchis = $chimucTieuchuan->chimuccons->where('loaichimuc', 4);
                  $tieuchisCounter = $tieuchis->count();
                  $tieuchiMuc1Counter = 0;
                  $tieuchiMuc2Counter = 0;
                  $tieuchiMuc3Counter = 0;
                  $tieuchiMuc3Total = 0;
                  foreach($tieuchis as $tieuchi) {
                        $tieuchi->getMaxDatMuc();
                        if($tieuchi->thuocmuc >= 1) {
                            $tieuchiMuc1Counter++;
                        }
                        if($tieuchi->thuocmuc >= 2) {
                            $tieuchiMuc2Counter++;
                        }
                        if($tieuchi->maxDatmuc == 3) {
                            $tieuchiMuc3Total++;
                            if($tieuchi->thuocmuc >=3) {
                                $tieuchiMuc3Counter++;
                            }
                        }
                  }
                }
                
                $tieuchiMuc1Khongdat = $tieuchisCounter - $tieuchiMuc1Counter;
                $tieuchiMuc2Khongdat = $tieuchisCounter - $tieuchiMuc2Counter;
                $tieuchiMuc3Khongdat = $tieuchiMuc3Total - $tieuchiMuc3Counter;

                $section = $phpWord->addSection([
                    'breakType' => 'continuous'
                ]);
                $section->addText('1. Những điểm mạnh nổi bật', ['bold' => true]);
                $html1 = $chimuc->content;
                \PhpOffice\PhpWord\Shared\Html::addHtml($section, $html1, false, false);
                $section = $phpWord->addSection([
                    'breakType' => 'continuous'
                ]);
                $html2 = $chimuc->content2;
                $section->addText('2. Những điểm yếu cơ bản', ['bold' => true]);
                \PhpOffice\PhpWord\Shared\Html::addHtml($section, $html2, false, false);

                $section->addText('3. Kết quả', ['bold' => true]);
                $section->addText('Mức 1:');
                $section->addText('+ Số lượng tiêu chí đạt ' . strval($tieuchiMuc1Counter) . '/' . strval($tieuchisCounter) . ' tiêu chí', null, ['indent' => 0.5]);
                $section->addText('+ Số lượng tiêu chí không đạt: ' . strval($tieuchiMuc1Khongdat), null, ['indent' => 0.5] );
                
                $section->addText('Mức 2:');
                $section->addText('+ Số lượng tiêu chí đạt ' . strval($tieuchiMuc2Counter) . '/' . strval($tieuchisCounter) . ' tiêu chí', null, ['indent' => 0.5]);
                $section->addText('+ Số lượng tiêu chí không đạt: ' . strval($tieuchiMuc2Khongdat), null, ['indent' => 0.5]);
                $section->addText('Mức 3:');
                $section->addText('+ Số lượng tiêu chí đạt ' . strval($tieuchiMuc3Counter) . '/' . strval($tieuchiMuc3Total) . ' tiêu chí', null, ['indent' => 0.5]);
                $section->addText('+ Số lượng tiêu chí không đạt: ' . strval($tieuchiMuc3Khongdat), null, ['indent' => 0.5]);

                $chimucTieuchuan->calculateDatMuc();
                if($chimucTieuchuan->datmuc == 0) {
                    $section->addText('Kết luận: Không đạt');
                } else {
                    $section->addText('Kết luận: Đạt mức '  . $chimucTieuchuan->datmuc, ['bold' => true]);
                }
            }



            if($chimuc->loaichimuc == 6) {

                //MỤC LỤC
                if(count($chimuc->columns) > 0 && $chimuc->tenchimuc == 'MỤC LỤC') {
                    $section = $phpWord->addSection([
                        'breakType' => 'continuous'
                    ]);
                    $table = $section->addTable($tableStyle);
                    $table->addRow(900);
                    $muclucColumnsIndex = 1;
                    foreach($chimuc->columns as $column) {
						if($muclucColumnsIndex == 1) { 
                        $table->addCell(9000, $tableCellStyle)->addText($column->title, ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
						} else {
						$table->addCell(1000, $tableCellStyle)->addText($column->title, ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
						}
                        // $section->addText($column->title);
						$muclucColumnsIndex++;
                    }
                    $excludeRowsKeyArray = array("id", "chimucid", "created_at", "updated_at");
                    foreach($chimuc->chimucTableDetails as $details) {
                        $properties = array_keys($details->getOriginal());
                        $properties = array_filter($properties, function($item) use($excludeRowsKeyArray) {
                            return !in_array($item, $excludeRowsKeyArray);
                        });
                        $table->addRow(400);
                        foreach($properties as $property) {
                            if($details[$property] != null){
                                if($property == 'name'){
                                    $table->addCell(9000, $tableCellStyle)->addText($details[$property], null, ['spaceAfter' => 0, 'indent' => 0.2]);
                                } else {
                                    $table->addCell(1000, $tableCellStyle)->addText($details[$property], null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                                }
                            }
                        }             
                    }
                }

                //Thông tin nhà trường
                if(count($chimuc->columns) > 0 && $chimuc->tenchimuc == 'Thông tin nhà trường') {
                    // $section = $phpWord->addSection([
                    //     'breakType' => 'continuous'
                    // ]);

                    //add text
                    $textNameArr = array("Tên trường", "Tên trước đây", "Cơ quan chủ quản");
                    $chimucDetailsText = $chimuc->chimucTableDetails->take(3);
                    $chimucDetails1 = $chimuc->chimucTableDetails->take(-17);
                    $chimucDetails1 = $chimucDetails1->take(9); 
                    $chimucDetails2 = $chimuc->chimucTableDetails->take(-8);
                    
                    foreach($chimucDetailsText as $details) {
                            $section->addText($details['name'] . ": " . $details['col1']);
                    }    

                    $mainTable = $section->addTable(['cellMargin' => 200]);
                    $row1MainTable = $mainTable->addRow(900);
                    $cell1Row1MainTable = $row1MainTable->addCell(5000);
                    $cell2Row1MainTable = $row1MainTable->addCell(5000);
                    $subTable1 = $cell1Row1MainTable->addTable(['borderSize' => 6, 'borderColor' => '#000000']);
                    $subTable2 = $cell2Row1MainTable->addTable(['borderSize' => 6, 'borderColor' => '#000000']);
                    // foreach($chimuc->columns as $column) {
                    //     $table->addCell(2000, ['valign' => 'center'])->addText($column->title, null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                    //     // $section->addText($column->title);
                    // }

                    $excludeRowsKeyArray = array("id", "chimucid", "created_at", "updated_at");      
                    
                    
                    
                    foreach($chimucDetails1 as $details) {
                        $properties = array_keys($details->getOriginal());
                        $properties = array_filter($properties, function($item) use($excludeRowsKeyArray) {
                            return !in_array($item, $excludeRowsKeyArray);
                        });
                        $subTable1->addRow(400);
                        foreach($properties as $property) {
                            if($details[$property] != null){
                                if($property == 'name'){
                                    $subTable1->addCell(6000, $tableCellStyle)->addText($details[$property], null, ['spaceAfter' => 0, 'indent' => 0.2]);
                                } else {
                                    $subTable1->addCell(4000, $tableCellStyle)->addText($details[$property], null, ['spaceAfter' => 0, 'indent' => 0.2]);
                                }
                            }
                        }             
                    }

                    foreach($chimucDetails2 as $details) {
                        $properties = array_keys($details->getOriginal());
                        $properties = array_filter($properties, function($item) use($excludeRowsKeyArray) {
                            return !in_array($item, $excludeRowsKeyArray);
                        });
                        $subTable2->addRow(400);
                        foreach($properties as $property) {
                            if($details[$property] != null){
                                if($property == 'name'){
                                    $subTable2->addCell(6000, $tableCellStyle)->addText($details[$property], null, ['spaceAfter' => 0, 'indent' => 0.2]);
                                } else {
                                    $subTable2->addCell(4000, $tableCellStyle)->addText($details[$property], null, ['spaceAfter' => 0, 'indent' => 0.2]);
                                }
                            }
                        }             
                    }
                }


                //Danh mục chữ viết tắt
                if(count($chimuc->columns) > 0 && $chimuc->tenchimuc == 'DANH MỤC CÁC CHỮ VIẾT TẮT') {
                    $section = $phpWord->addSection([
                        'breakType' => 'continuous'
                    ]);
                    $table = $section->addTable(['borderSize' => 6, 'borderColor' => '#000000']);
                    $table->addRow(300);
                    $dmcvtColumnsIndex = 1;
                    foreach($chimuc->columns as $column) {
						if($dmcvtColumnsIndex == 1) {
                        $table->addCell(3000, ['valign' => 'center'])->addText($column->title, ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
						} else {
						$table->addCell(7000, ['valign' => 'center'])->addText($column->title, ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
						}
                       $dmcvtColumnsIndex++;
                    }
                    $excludeRowsKeyArray = array("id", "chimucid", "created_at", "updated_at");
                    foreach($chimuc->chimucTableDetails as $details) {
                        $properties = array_keys($details->getOriginal());
                        $properties = array_filter($properties, function($item) use($excludeRowsKeyArray) {
                            return !in_array($item, $excludeRowsKeyArray);
                        });
                        $table->addRow(300);
                        foreach($properties as $property) {
                            if($details[$property] != null){
                                if($property == 'name'){
                                    $table->addCell(3000, $tableCellStyle)->addText($details[$property], null, ['spaceAfter' => 0, 'indent' => 0.2]);
                                } else {
                                    $table->addCell(7000, $tableCellStyle)->addText($details[$property], null, ['spaceAfter' => 0, 'indent' => 0.2]);
                                }
                            }
                        }             
                    }
                }

                
                if($chimuc->tenchimuc == "1.1. Đánh giá tiêu chí Mức 1,2 và 3") {
                    $table = $section->addTable(['borderSize' => 6, 'borderColor' => '#000000']);
                    $table->addRow();
                    $cell1 = $table->addCell(3200, ['vMerge' => 'restart', 'valign' => 'center', ]);
                    $cell1->addText('Tiêu chuẩn, Tiêu chí', ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                    $cell2 = $table->addCell(6800 ,['gridSpan' => 4, 'valign' => 'center']);
                    $cell2->addText('Kết quả', ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

                    $table->addRow();
                    $cell3 = $table->addCell(3200, ['vMerge' => 'continue']);
                    $cell4 = $table->addCell(1700, ['vMerge' => 'restart', 'valign' => 'center']);
                    $cell4->addText('Không đạt', ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                    $cell5 = $table->addCell(5100, ['gridSpan' => 3, 'valign' => 'center']);
                    $cell5->addText('Đạt', ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

                    $table->addRow();
                    $cell6 = $table->addCell(3200, ['vMerge' => 'continue']);
                    $cell7 = $table->addCell(1700, ['vMerge' => 'continue']);
                    $cell8 = $table->addCell(1700, ['valign' => 'center']);
                    $cell8->addText('Mức 1', null ,['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                    $cell9 = $table->addCell(1700, ['valign' => 'center']);
                    $cell9->addText('Mức 2', null ,['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                    $cell10 = $table->addCell(1700, ['valign' => 'center']);
                    $cell10->addText('Mức 3', null ,['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

                    ///Row tiêu chuẩn, tiêu chí
                    foreach($tieuchuans as $tieuchuan) {
                        $tieuchuan->calculateDatMuc();
                        $tieuchuan->getShortName();                        
                        $table->addRow(400);
                        $cell1 = $table->addCell(3200, ['valign' => 'center']);
                        $cell1->addText($tieuchuan->shortName, ['bold' => true], ['spaceAfter' => 0, 'indent' => 0.2]);
                        $cell2 = $table->addCell(1700, ['valign' => 'center']);
                        $tieuchuan->datmuc == 0 && $cell2->addText('x', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        $cell3 = $table->addCell(1700, ['valign' => 'center']);
                        $tieuchuan->datmuc >= 1 ? $cell3->addText('x', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]) : $cell3->addText('--------', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        $cell4 = $table->addCell(1700, ['valign' => 'center']);
                        $tieuchuan->datmuc >= 2 ? $cell4->addText('x', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]) : $cell4->addText('--------', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        $cell5 = $table->addCell(1700, ['valign' => 'center']);
                        $tieuchuan->datmuc >= 3 ? $cell5->addText('x', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]) : $cell5->addText('--------', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                        $tieuchis = $tieuchuan->chimuccons->where('loaichimuc', 4);
                        foreach($tieuchis as $tieuchi) {
                            $tieuchi->getMaxDatMuc();
                            $tieuchi->getShortName();   
                            $table->addRow(400);
                            $cell1 = $table->addCell(3200, ['valign' => 'center']);
                            $cell1->addText($tieuchi->shortName, null, ['spaceAfter' => 0, 'indent' => 0.2]);
                            $cell2 = $table->addCell(1700, ['valign' => 'center']);
                            $tieuchi->thuocmuc == 0 && $cell2->addText('x', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                            $cell3 = $table->addCell(1700, ['valign' => 'center']);
                            $tieuchi->thuocmuc >= 1 ? $cell3->addText('x', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]) : $cell3->addText('Không đạt', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                            $cell4 = $table->addCell(1700, ['valign' => 'center']);
                            $tieuchi->thuocmuc >= 2 ? $cell4->addText('x', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]) : $cell4->addText('Không đạt', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
                            $cell5 = $table->addCell(1700, ['valign' => 'center']);
                            $tieuchi->thuocmuc >= 3 ? $cell5->addText('x', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]) : ($tieuchi->maxDatmuc == 3 ? $cell5->addText('Không đạt', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]) :  $cell5->addText('--------', null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]));
                        }
                    }
                    $truong->calculateDatmuc();
                    $section->addText('Kết quả: ' . ($truong->datmuc == 0 ? 'Không Đạt' : 'Đạt mức ' . $truong->datmuc), ['bold' => true]);
                }
            }

            // if($chimuc->loaichimuc == 6) {

            // }
        }
        $wordFileName = 'BCTDG' . $truongId . '.docx' ;
        $objectWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
        try {
            $objectWriter->save(storage_path($wordFileName));
        } catch (Exception $e) {

        }
        return response()->download(storage_path($wordFileName));
    }


    public function createDSTVDocx($truongId) {
        $truong = Truong::findOrFail($truongId);
        $nhoms = $truong->nhoms()->with('users')->get();
        $nhomsCongviec = $nhoms->where('loainhom', '!=', 1);


        $phpWord = new \PhpOffice\PhpWord\PhpWord();

        $phpWord->setDefaultFontName('Times New Roman');
        $phpWord->setDefaultFontSize(13);

        $section = $phpWord->addSection([
            'breakType' => 'continuous'
        ]);

        $section->addText('DANH SÁCH THÀNH VIÊN', ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $section->addText('THAM GIA CÔNG TÁC KIỂM ĐỊNH', ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $section->addText($truong->tentruong, ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $section->addText('Kèm theo Quyết định số: ...../QĐ-PGDĐT ngày .../.../.... của Phòng Giáo dục và Đào tạo', ['bold' => true], ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        $table = $section->addTable(['alignment' => \PhpOffice\PhpWord\SimpleType\JcTable::CENTER, 'borderSize' => 1, 'borderColor' => '000000']);
        $table->addRow(500);
        $table->addCell(2000, ['valign' => 'center'])->addText('Họ tên', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter'=> 0]);
        $table->addCell(2000, ['valign' => 'center'])->addText('Chức vụ', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $table->addCell(2000, ['valign' => 'center'])->addText('Nhiệm vụ', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $table->addCell(4000, ['valign' => 'center'])->addText('Phân công phụ trách các tiêu chuẩn, tiêu chí', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);

        foreach($nhomsCongviec as $nhom) {
            // $section->addText($nhom->tennhom, ['bold' => true]);
            foreach($nhom->users as $user) {
                
                $table->addRow(500);
                $table->addCell(2000, ['valign' => 'center'])->addText($user->hoten, null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
                $table->addCell(2000, ['valign' => 'center'])->addText($user->chucvu, null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
                $table->addCell(2000, ['valign' => 'center'])->addText($user->nhiemvu, null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
                $tasksCell = $table->addCell(4000, ['valign' => 'center']);
                
                $filteredUserChimucs = $user->chimucsWithPivot->filter(function ($item) {
                    return $item->chimuccha == null || !$item->pivot->isHalf;
                });


                foreach($filteredUserChimucs as $userChimuc) {
                    if($userChimuc->chimuccha == null) {
                        $tasksCell->addText('- '. $userChimuc->tenchimuc, ['bold' => true], ['indent' => 0.2, 'spaceAfter' => 0]);
                    } else {
                        $tasksCell->addText($userChimuc->tenchimuc, null, ['indent' => 0.4, 'spaceAfter' => 0]);
                    }
                }
            }        
        }
        // foreach($nhomsCongviec as $nhom) {
        //     $section->addText($nhom->tennhom, ['bold' => true]);
        //     foreach($nhom->users as $user) {
        //         $section->addText($user->hoten);
        //     }
        // }

        


        $wordFileName = 'DSTV' . $truongId . '.docx' ;
        $objectWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
        try {
            $objectWriter->save(storage_path($wordFileName));
        } catch (Exception $e) {

        }
        return response()->download(storage_path($wordFileName));
        }

    public function createDMMCDocx($truongId) {
        \PhpOffice\PhpWord\Settings::setOutputEscapingEnabled(true);

        $truong = Truong::findOrFail($truongId);

        $phpWord = new \PhpOffice\PhpWord\PhpWord();

        $phpWord->setDefaultFontName('Times New Roman');
        $phpWord->setDefaultFontSize(13);

        $section = $phpWord->addSection([
            'orientation' => 'landscape',
            'marginLeft' => 500,
            'marginRight' => 500,
        ]);
        
        $section->addText('PHẦN IV', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $section->addText('PHỤ LỤC: BẢNG DANH MỤC MINH CHỨNG', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        $fancyTableStyleName = 'Fancy Table';
        $fancyTableStyle = array('alignment' => \PhpOffice\PhpWord\SimpleType\JcTable::CENTER, 'borderSize' => 1, 'borderColor' => '000000');
        $phpWord->addTableStyle($fancyTableStyleName, $fancyTableStyle);
        $table = $section->addTable($fancyTableStyleName);
        $table->addRow(400);
        $table->addCell(1000, ['valign' => 'center'])->addText('Tiêu chí', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $table->addCell(1000, ['valign' => 'center'])->addText('Số TT', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $table->addCell(3000, ['valign' => 'center'])->addText('Mã minh chứng', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $table->addCell(6000, ['valign' => 'center'])->addText('Tên minh chứng', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $table->addCell(3600, ['valign' => 'center'])->addText('Số, ngày ban hành hoặc thời điểm khảo sát, điều tra, phỏng vấn, quan sát,...', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $table->addCell(3600, ['valign' => 'center'])->addText('Nơi ban hành hoặc nhóm, cá nhân thực hiện', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $table->addCell(1800, ['valign' => 'center'])->addText('Ghi chú', ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        
        $tieuchis = $truong->tieuchis;

        if(count($tieuchis) > 0) {
            foreach($tieuchis as $tieuchi) {
                $tieuchiShortName = explode(':', $tieuchi->tenchimuc)[0];
                $counter = 0;
                if(count($tieuchi->exportminhchungs) > 0) {
                    foreach($tieuchi->exportminhchungs as $minhchung) {
                        $table->addRow(400);
                        if($counter == 0) {
                            $table->addCell(1200, ['valign' => 'center', 'vMerge' => 'restart'])->addText($tieuchiShortName, ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
                        } else {
                            $table->addCell(1200, ['valign' => 'center', 'vMerge' => 'continue'])->addText('', null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
                        }
                        $table->addCell(1200, ['valign' => 'center'])->addText($minhchung->thutu, null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
                        $table->addCell(3600, ['valign' => 'center'])->addText($minhchung->maminhchung, null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
                        $table->addCell(7200, ['valign' => 'center'])->addText($minhchung->tenminhchung, null, ['indent' => 0.1, 'spaceAfter' => 0]);
                        $table->addCell(4320, ['valign' => 'center'])->addText($minhchung->songaybanhanh, null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
                        $table->addCell(4320, ['valign' => 'center'])->addText($minhchung->noibanhanh, null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
                        $table->addCell(2160, ['valign' => 'center'])->addText($minhchung->ghichu, null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
                        $counter++;
                    }
                }
            }
        }
        
        $wordFileName = 'DMMC' . $truongId . '.docx' ;
        $objectWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
        try {
            $objectWriter->save(storage_path($wordFileName));
            } catch (Exception $e) {
        }
        return response()->download(storage_path($wordFileName));
    }
}
