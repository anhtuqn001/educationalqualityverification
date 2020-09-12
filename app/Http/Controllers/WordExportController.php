<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Nhom;
use App\Truong;
use App\ChiMuc;
class WordExportController extends Controller
{
    public function createQDTLHDTGDDocx() {

        //get data
        $truong = Truong::findOrFail(1);
        $nhoms = $truong->nhoms()->with('users')->get();
        $nhomHDTDG = $nhoms->first(function($item, $index) {
            return $item['loainhom'] == 1;
        });
        $nhomTK = $nhoms->first(function($item, $index) {
            return $item['loainhom'] == 2;
        });
        $nhomsNormal = $nhoms->where('loainhom', 0);
        $chimucabcxyz = ChiMuc::findOrFail(28);
        $html = $chimucabcxyz->content;
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
        $testrun1 = $cell1->addTextRun($cellHCentered);
        $testrun1->addText("PHÒNG GD ĐT HUYỆN ĐÔNG HÒA", ['size' => 12]);
        $testrun1->addTextBreak();
        $testrun1->addText("TRƯỜNG TIỂU HỌC KIM ĐỒNG", ['size' => 12, 'bold' => true]);
        $testrun1->addTextBreak();
        $testrun1->addLine(['weight' => 1, 'width' => 150, 'height' => 0, 'color' => 000000]);
        $testrun1->addTextBreak();
        $testrun1->addText("Số 01/QĐ-TiHKĐ");

        $cell2 = $table->addCell(5500);
        $testrun2 = $cell2->addTextRun($cellHCentered);
        $testrun2->addText("CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", ['size' => 12, 'bold' => true]);
        $testrun2->addTextBreak();
        $testrun2->addText("Độc lập - Tự do - Hạnh phúc", ['size' => 13, 'bold' => true]);
        $testrun2->addTextBreak();
        $testrun2->addLine(['weight' => 1, 'width' => 150, 'height' => 0, 'color' => 000000]);
        $testrun2->addTextBreak();
        $testrun2->addText("Hòa Xuân Tây, ngày 02 tháng 01 năm 2020", ['italic' => true]);
        //Normal

        $paragraphStyleName = 'pStyle';
        $phpWord->addParagraphStyle($paragraphStyleName, array('alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceBefore' => 500, 'spaceAfter' => 50));
        $section = $phpWord->addSection([
            'breakType' => 'continuous'
        ]);
        $section->addText("QUYẾT ĐỊNH", ['bold' => true], $paragraphStyleName);

        $section->addText("Về việc thành lập Hội đồng tự đánh giá", ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $testrun3 = $section->addTextRun($cellHCentered);
        $testrun3->addLine(['weight' => 0.5, 'width' => 150, 'height' => 0, 'color' => 000000]);
        $section->addText("HIỆU TRƯỞNG TRƯỜNG TIỂU HỌC KIM ĐỒNG", ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        $section->addText("Căn cứ văn bản hợp nhất số 03/VBHN-BGDĐT ngày 22/01/2014 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Điều lệ trường Tiểu học;", null, ['hanging' => -1, 'spaceAfter' => 5]);
        $section->addText("Căn cứ Thông tư số 17/2018/TT-BGDĐT, ngày 22/8/2018 của Bộ trưởng Bộ GDĐT ban hành Quy định về kiểm định chất lượng giáo dục và công nhận đạt chuẩn quốc gia đối với trường tiểu học;", null, ['hanging' => -1, 'spaceAfter' => 5]);
        $section->addText("Căn cứ Công văn số 5932/BGDĐT-QCL ngày 28/12/2018 của Bộ GDĐT về việc hướng dẫn tự đánh giá và đánh giá ngoài cơ sở giáo dục phổ thông;", null, ['hanging' => -1, 'spaceAfter' => 5]);
        $section->addText("Căn cứ Kế hoạch số: 81/KH-GDĐT huyện Đông Hòa, ngày 27/7/2018 của Phòng GDĐT huyện Đông Hòa “Kế hoạch xây dựng trường tiểu học đạt chuẩn quốc gia mức độ 1 Giai đoạn 2018 -2025”;", null, ['hanging' => -1, 'spaceAfter' => 5]);
        $section->addText("Căn cứ Kế hoạch số 28/KH-THNHD ngày 20/10/2018  kế hoạch xây dựng trường chuẩn quốc gia năm học 2018-2019 của Trường Tiểu học Kim Đồng;", null, ['hanging' => -1, 'spaceAfter' => 5]);
        $section->addText("Xét đề nghị của các bộ phận trong nhà trường,", null, ['hanging' => -1, 'spaceAfter' => 5]);
        $section->addText("QUYẾT ĐỊNH", ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceBefore' => 300]);
        $textrun4 = $section->addTextRun(['hanging' => -1, 'spaceAfter' => 5]);
        $textrun4->addText("Điều 1. ", ['bold' => true]);
        $textrun4->addText("Giúp việc cho Hội đồng có nhóm thư ký và các nhóm công tác gồm các ông / bà có tên trong danh sách kèm theo.");
        $textrun5 = $section->addTextRun(['hanging' => -1, 'spaceAfter' => 5]);
        $section->addText("Căn cứ Kế hoạch số 28/KH-THNHD ngày 20/10/2018 kế hoạch xây dựng trường chuẩn quốc gia năm học 2018-2019 của Trường Tiểu học Kim Đồng;", null, ['hanging' => -0.5, 'spaceAfter' => 5]);
        $textrun5->addText("Điều 2. ", ['bold' => true]);
        $textrun5->addText("Hội đồng tự đánh giá có nhiệm vụ triển khai công tác tự đánh giá Trường Tiểu học Kim Đồng theo các quy định hiện hành của Bộ GDĐT.");
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
        $testrun7->addText("Nguyễn Ngọc Sỹ", ['size' => 12, 'bold' => true]);
        

        //Danh sách TV
        $section = $phpWord->addSection(
            array(
                'breakType' => 'nextPage',
            )
        );

        $section->addText("DANH SÁCH THÀNH VIÊN HỘI ĐỒNG TỰ ĐÁNH GIÁ", ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'spaceAfter' => 0]);
        $section->addText("TRƯỜNG TIỂU HỌC KIM ĐỒNG", ['bold' => true], ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        $section->addText("(Kèm theo Quyết định số 01/QĐ- TiHKĐ  ngày 02 tháng 01 năm 2020 của  trường TH Kim Đồng)", ['italic' => true]);

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
        // $table->addRow();
        // $table->addCell(1000, $customTableCellStyle)->addText("1", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        // $table->addCell(2500, $customTableCellStyle)->addText("Nguyễn Ngọc Sỹ", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2500, $customTableCellStyle)->addText("Hiệu trưởng", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(4500, $customTableCellStyle)->addText("Chủ tịch Hội đồng, kiểm tra tiêu chuẩn 3;4;5", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        // $table->addRow();
        // $table->addCell(1000, $customTableCellStyle)->addText("2", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        // $table->addCell(2500, $customTableCellStyle)->addText("Trần Thị Hương", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2500, $customTableCellStyle)->addText("Phó hiệu trưởng", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(4500, $customTableCellStyle)->addText("P. Chủ tịch Hội đồng, kiểm tra tiêu chuẩn 1;2 ", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

        // $table->addRow();
        // $table->addCell(1000, $customTableCellStyle)->addText("3", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        // $table->addCell(2500, $customTableCellStyle)->addText("Nguyễn Hội", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2500, $customTableCellStyle)->addText("Thư ký Hội đồng SP", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(4500, $customTableCellStyle)->addText("Trưởng nhóm thư ký", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);

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
        $section->addText("(Kèm theo Quyết định số 01/QĐ- TiHKĐ  ngày 02 tháng 01 năm 2020 của trường TH Kim Đồng)", ['italic' => true]);


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

        // $table->addRow();
        // $table->addCell(1000, $customTableCellStyle)->addText("2", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        // $table->addCell(2500, $customTableCellStyle)->addText("Huỳnh Thị Bích Chi", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2500, $customTableCellStyle)->addText("Giáo viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(4500, $customTableCellStyle)->addText("Tổng hợp các tiêu chí từ 11- 20", null, ['spaceAfter' => 0, 'indent' => 0.1]);

        // $table->addRow();
        // $table->addCell(1000, $customTableCellStyle)->addText("3", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        // $table->addCell(2500, $customTableCellStyle)->addText("Lê Thị Thu Hánh", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2500, $customTableCellStyle)->addText("TT Tổ 5", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(4500, $customTableCellStyle)->addText("Tổng hợp các tiêu chí từ 21- 27", null, ['spaceAfter' => 0, 'indent' => 0.1]);

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
        $section->addText("(Kèm theo Quyết định số 01/QĐ- TiHKĐ  ngày 02 tháng 01 năm 2020 của trường TH Kim Đồng)", ['italic' => true]);


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
        \PhpOffice\PhpWord\Shared\Html::addHtml($section, $html, false, false);
        
        // $table->addRow();
        // $table->addCell(1500, ['vMerge' => 'restart', 'valign' => 'center'])->addText("Nhóm 1", null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Nguyễn Hội", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Thành viên của HĐ", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2900, $customTableCellStyle)->addText("Nhóm trưởng", null, ['spaceAfter' => 0, 'indent' => 0.1]);

        // $table->addRow();
        // $table->addCell(1500, ['vMerge' => 'continue']);
        // $table->addCell(2800, $customTableCellStyle)->addText("Nguyễn Thị Thu Hiền", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Giáo viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2900, $customTableCellStyle)->addText("Thành viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);

        // $table->addRow();
        // $table->addCell(1500, ['vMerge' => 'continue']);
        // $table->addCell(2800, $customTableCellStyle)->addText("Trần Họa Mi", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Giáo viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2900, $customTableCellStyle)->addText("Thành viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);

        // $table->addRow();
        // $table->addCell(1500, ['vMerge' => 'continue']);
        // $table->addCell(2800, $customTableCellStyle)->addText("Nguyễn Thị Phương Loan", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Giáo viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2900, $customTableCellStyle)->addText("Thành viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        
        // $table->addRow();
        // $table->addCell(1500, ['vMerge' => 'continue']);
        // $table->addCell(2800, $customTableCellStyle)->addText("Huỳnh Thị Minh", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Giáo viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2900, $customTableCellStyle)->addText("Thành viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);

        // $table->addRow();
        // $table->addCell(1500, ['vMerge' => 'restart', 'valign' => 'center'])->addText("Nhóm 2", null, ['alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Trần Thị Hương", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Thành viên của HĐ", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2900, $customTableCellStyle)->addText("Nhóm trưởng", null, ['spaceAfter' => 0, 'indent' => 0.1]);

        // $table->addRow();
        // $table->addCell(1500, ['vMerge' => 'continue']);
        // $table->addCell(2800, $customTableCellStyle)->addText("Phạm Thị Thu Thủy", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Giáo viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2900, $customTableCellStyle)->addText("Thành viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);

        // $table->addRow();
        // $table->addCell(1500, ['vMerge' => 'continue']);
        // $table->addCell(2800, $customTableCellStyle)->addText("Trần Thị Tố Loan", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Giáo viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2900, $customTableCellStyle)->addText("Thành viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);

        // $table->addRow();
        // $table->addCell(1500, ['vMerge' => 'continue']);
        // $table->addCell(2800, $customTableCellStyle)->addText("Huỳnh Thị Bích Chi", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2800, $customTableCellStyle)->addText("Giáo viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);
        // $table->addCell(2900, $customTableCellStyle)->addText("Thành viên", null, ['spaceAfter' => 0, 'indent' => 0.1]);



        // $table->addRow();
        // $table->addCell(1000, $customTableCellStyle)->addText("3", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        // $table->addCell(2500, $customTableCellStyle)->addText("Lê Thị Thu Hánh", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        // $table->addCell(2500, $customTableCellStyle)->addText("TT Tổ 5", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        // $table->addCell(4500, $customTableCellStyle)->addText("Tổng hợp các tiêu chí từ 21- 27", null, ['spaceAfter' => 0, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER]);
        //Two columns
        // $section = $phpWord->addSection(
        //     array(
        //         'colsNum'   => 2,
        //         'colsSpace' => 1440,
        //         'breakType' => 'continuous',
        //     )
        // );


        // $section->addText("Two columns, one inch (1440 twips) spacing. {$filler}");

        // $fontStyle['name'] = 'Times New Roman';
        // $fontStyle['size'] = 20;

        // $textrun = $section->addTextRun();
        // $textrun->addText('I am inline styled ', $fontStyle);
        // $textrun->addText('with ');
        // $textrun->addText('color', array('color' => '996699'));
        // $textrun->addText(', ');
        // $textrun->addText('bold', array('bold' => true));
        // $textrun->addText(', ');
        // $textrun->addText('italic', array('italic' => true));
        // $textrun->addText(', ');
        // $textrun->addText('underline', array('underline' => 'dash'));
        // $textrun->addText(', ');
        // $textrun->addText('strikethrough', array('strikethrough' => true));
        // $textrun->addText(', ');
        // $textrun->addText('doubleStrikethrough', array('doubleStrikethrough' => true));
        // $textrun->addText(', ');
        // $textrun->addText('superScript', array('superScript' => true));
        // $textrun->addText(', ');
        // $textrun->addText('subScript', array('subScript' => true));
        // $textrun->addText(', ');
        // $textrun->addText('smallCaps', array('smallCaps' => true));
        // $textrun->addText(', ');
        // $textrun->addText('allCaps', array('allCaps' => true));
        // $textrun->addText(', ');
        // $textrun->addText('fgColor', array('fgColor' => 'yellow'));
        // $textrun->addText(', ');
        // $textrun->addText('scale', array('scale' => 200));
        // $textrun->addText(', ');
        // $textrun->addText('spacing', array('spacing' => 120));
        // $textrun->addText(', ');
        // $textrun->addText('kerning', array('kerning' => 10));
        // $textrun->addText('. ');
        
        

        $objectWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
        try {
            $objectWriter->save(storage_path('TestWordFile2.docx'));
        } catch (Exception $e) {

        }
        return response()->download(storage_path('TestWordFile2.docx'));
    }
}
