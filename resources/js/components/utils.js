export const handleChimucResult = (chimucsResult, keyPattern) => {
    return chimucsResult.map(({ id, tenchimuc, children }, index) => {
        let localKeyPattern = keyPattern + index;
        if (!children || children.length == 0) {
            return {
                key: localKeyPattern,
                id,
                title: tenchimuc,
            }
        }
        children = [...handleChimucResult(children, localKeyPattern + '-')];
        return {
            key: localKeyPattern,
            id,
            title: tenchimuc,
            children
        }
    })
}

export const reformatUserChiMucData = (data) => {
    if (!!data.length) {
        return data.map(i => {
            let { id, pivot: { isHalf } } = i;
            return {
                id,
                isHalf
            }
        })
    }
    return [];
}

export const reformatChiMucKeysData = (chimucsSource, chimucSelectedKeys, chimucHalfKeys = []) => {
    let chimucArr = [];
    const loopThroughChiMucs = (source) => {
        source.forEach(i => {
            if (chimucSelectedKeys.includes(i.key) || chimucHalfKeys.includes(i.key)) {
                let newObj = {
                    id: i.id,
                    isHalf: chimucHalfKeys.includes(i.key)
                }
                chimucArr.push(newObj);
            }
            if (i.children) {
                loopThroughChiMucs(i.children);
            }
        })
    }
    loopThroughChiMucs(chimucsSource);
    return chimucArr;

}

export const generateTree = (treeNodes = [], isFilter, targetKeys = [], leftCheckedKeys = []) => {
    return isFilter ? filterTree(treeNodes, targetKeys).map(({ children, ...props }) => ({
        ...props,
        disabled: !leftCheckedKeys.includes(props.key),
        children: generateTree(children, isFilter, targetKeys, leftCheckedKeys),
    })) : treeNodes.map(({ children, ...props }) => ({
        ...props,
        children: generateTree(children),
    }));
}

export const filterTree = (treeNodes, checkedKeys) => {
    return treeNodes
        ? treeNodes.filter(node => checkedKeys.includes(node.key))
        : [];
}

export const applyKeyPropertyForArrItem = (arr) => {
    return arr.map(i => ({ ...i, key: i.id }));
}

// const getTruongData = (loaitruong) => {
//     case
// }

export const getChiMucsData = (loaitruong) => {
    switch (loaitruong) {
        case 1:
            return [
                {
                    tenchimuc: 'NỘI DUNG',
                    loaichimuc: 0,
                    isHideTitle: 1,
                    children: [
                        {
                            tenchimuc: 'MỤC LỤC',
                            loaichimuc: 6,
                            isCenterTitle: 1,
                            isDropLine: 1,
                            columns: [
                                {
                                    title: 'NỘI DUNG',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Trang',
                                    dataIndex: 'col1'
                                }
                            ],
                            rows: [
                                {
                                    name: 'Mục lục',
                                    col1: ' '
                                },
                                {
                                    name: 'Danh mục các chữ viết tắt',
                                    col1: ' '
                                },
                                {
                                    name: 'Bảng tổng hợp kết quả tự đánh giá',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần I. CƠ SỞ DỮ LIỆU',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần II. TỰ ĐÁNH GIÁ',
                                    col1: ' '
                                },
                                {
                                    name: 'A. ĐẶT VẤN ĐỀ',
                                    col1: ' '
                                },
                                {
                                    name: 'B. TỰ ĐÁNH GIÁ',
                                    col1: ' '
                                },
                                {
                                    name: 'I. TỰ ĐÁNH GIÁ TIÊU CHÍ MỨC 1,2 VÀ 3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 1. Tổ chức và quản lý nhà trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Mở đầu',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.2',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.4',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.5',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.6',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.7',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.8',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.9',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.10',
                                    col1: ' '
                                },
                                {
                                    name: 'Kết luận về tiêu chuẩn 1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 2: Cán bộ quản lý, giáo viên, nhân viên',
                                    col1: ' '
                                },
                                {
                                    name: 'Mở đầu',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.2',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.3',
                                    col1: ' '
                                },
                                {
                                    name: 'Kết luận về Tiêu chuẩn 2',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 3: Cơ sở vật chất và thiết bị dạy học',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.2',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.4',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.5',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.6',
                                    col1: ' '
                                },
                                {
                                    name: 'Kết luận về Tiêu chuẩn 3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 4: Quan hệ giữa nhà trường, gia đình và xã hội',
                                    col1: ' '
                                },
                                {
                                    name: 'Mở đầu',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 4.1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 4.2',
                                    col1: ' '
                                },
                                {
                                    name: 'Kết luận về Tiêu chuẩn 4',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 5: Hoạt động và kết quả nuôi dưỡng, chăm sóc, giáo dục trẻ',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.2',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.4',
                                    col1: ' '
                                },
                                {
                                    name: 'Kết luận về Tiêu chuẩn 5',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần III. KẾT LUẬN CHUNG',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần IV. PHỤ LỤC ',
                                    col1: ' '
                                },
                            ]
                        },
                        {
                            tenchimuc: 'DANH MỤC CÁC CHỮ VIẾT TẮT',
                            loaichimuc: 6,
                            isCenterTitle: 1,
                            isDropLine: 1,
                            columns: [
                                {
                                    title: 'Chữ viết tắt',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Nội dung viết tắt',
                                    dataIndex: 'col1'
                                }
                            ],
                            rows: [
                                {
                                    name: 'ATGT',
                                    col1: 'An toàn giao thông',
                                },
                                {
                                    name: 'BĐD CMHS',
                                    col1: 'Ban đại diện Cha mẹ học sinh',
                                },
                                {
                                    name: 'CB,CC,VC,NLĐ',
                                    col1: 'Cán bộ, công chức, viên chức, NLĐ',
                                },
                                {
                                    name: 'CBQL',
                                    col1: 'Cán bộ quản lí',
                                },
                                {
                                    name: 'CLGD',
                                    col1: 'Chất lượng giáo dục',
                                },
                                {
                                    name: 'GDĐT',
                                    col1: 'Giáo dục đào tạo',
                                },
                                {
                                    name: 'GDTC',
                                    col1: 'Giáo dục thể chất',
                                },
                                {
                                    name: 'GDTH',
                                    col1: 'Giáo dục tiểu học',
                                },
                                {
                                    name: 'GV',
                                    col1: 'Giáo viên',
                                },
                                {
                                    name: 'HS',
                                    col1: 'Học sinh',
                                },
                                {
                                    name: 'HTCTTH',
                                    col1: 'Hoàn thành chương trình tiểu học',
                                },
                                {
                                    name: 'HĐNGLL',
                                    col1: 'Hoạt động ngoài giờ lên lớp',
                                },
                                {
                                    name: 'HĐGD',
                                    col1: 'Hoạt động giáo dục',
                                },
                                {
                                    name: 'NV',
                                    col1: 'Nhân viên',
                                },
                                {
                                    name: 'PCCC',
                                    col1: 'Phòng cháy chữa cháy',
                                },
                                {
                                    name: 'PCGDTH',
                                    col1: 'Phổ cập giáo dục tiểu học',
                                },
                                {
                                    name: 'QĐND',
                                    col1: 'Quân đội Nhân dân',
                                },
                                {
                                    name: 'SNĐ',
                                    col1: 'Sao nhi đồng'
                                },
                                {
                                    name: 'TTLĐXS',
                                    col1: 'Tập thể lao động xuất sắc'
                                },
                                {
                                    name: 'TNTPHCM',
                                    col1: 'Thiếu niên Tiền phong Hồ Chí Minh'
                                },
                                {
                                    name: 'TĐG',
                                    col1: 'Tự đánh giá'
                                },
                                {
                                    name: 'UBND',
                                    col1: 'Ủy ban Nhân dân'
                                }
                            ]
                        },
                        {
                            tenchimuc: 'TỔNG HỢP KẾT QUẢ TỰ ĐÁNH GIÁ',
                            loaichimuc: 0,
                            isCenterTitle: 1,
                            isDropLine: 1,
                            children: [
                                {
                                    tenchimuc: '1. Kết quả đánh giá',
                                    loaichimuc: 0,
                                    children: [
                                        {
                                            tenchimuc: '1.1. Đánh giá tiêu chí Mức 1,2 và 3',
                                            loaichimuc: 6,
                                        },
                                        {
                                            tenchimuc: '1.2. Đánh giá tiêu chí Mức 4',
                                            loaichimuc: 1,
                                        }
                                    ]
                                },
                                {
                                    tenchimuc: '2. Kết luận',
                                    loaichimuc: 1,
                                }
                            ]
                        }
                    ]
                },
                {
                    tenchimuc: 'Phần I: CƠ SỞ DỮ LIỆU',
                    loaichimuc: 0,
                    isCenterTitle: 1,
                    isDropLine: 1,
                    children: [
                        {
                            tenchimuc: 'Thông tin nhà trường',
                            loaichimuc: 6,
                            isHideTitle: 1,
                            columns: [
                                {
                                    title: 'Thông tin',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Nội dung',
                                    dataIndex: 'col1'
                                }
                            ],
                            rows: [
                                {
                                    name: 'Tên trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Tên trước đây',
                                    col1: ' '
                                },
                                {
                                    name: 'Phòng Giáo dục và Đào tạo',
                                    col1: ' '
                                },
                                {
                                    name: 'Tỉnh/thành phố trực thuộc Trung ương',
                                    col1: ' '
                                },
                                {
                                    name: 'Huyện/Quận/Thị xã',
                                    col1: ' '
                                },
                                {
                                    name: 'Xã/Phường/Thị trấn',
                                    col1: ' '
                                },
                                {
                                    name: 'Đạt chuẩn quốc gia',
                                    col1: ' '
                                },
                                {
                                    name: 'Năm thành lập trường (theo quyết định thành lập)',
                                    col1: ' '
                                },
                                {
                                    name: 'Công lập',
                                    col1: ' '
                                },
                                {
                                    name: 'Tư thục',
                                    col1: ' '
                                },
                                {
                                    name: 'Dân lập',
                                    col1: ' '
                                },
                                {
                                    name: 'Trường liên kết với nước ngoài',
                                    col1: ' '
                                },
                                {
                                    name: 'Họ và tên hiệu trưởng',
                                    col1: ' '
                                },
                                {
                                    name: 'Điện thoại',
                                    col1: ' '
                                },
                                {
                                    name: 'Fax',
                                    col1: ' '
                                },
                                {
                                    name: 'Website',
                                    col1: ' '
                                },
                                {
                                    name: 'Số điểm trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Loại hình khác',
                                    col1: ' '
                                },
                                {
                                    name: 'Thuộc vùng khó khăn',
                                    col1: ' '
                                },
                                {
                                    name: 'Thuộc vùng đặc biệt khó khăn',
                                    col1: ' '
                                }
                            ]
                        },
                        {
                            tenchimuc: '1. Số nhóm trẻ, lớp mẫu giáo',
                            loaichimuc: 2,
                            columns: [
                                {
                                    title: 'Số nhóm, lớp',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Năm học 2015-2016',
                                    dataIndex: 'col1'
                                },
                                {
                                    title: 'Năm học 2016-2017',
                                    dataIndex: 'col2'
                                },
                                {
                                    title: 'Năm học 2017-2018',
                                    dataIndex: 'col3'
                                },
                                {
                                    title: 'Năm học 2018-2019',
                                    dataIndex: 'col4'
                                },
                                {
                                    title: 'Năm học 2019-2020',
                                    dataIndex: 'col5'
                                }
                            ],
                            rows: [
                                {
                                    name: 'Nhóm trẻ từ 3 đến 12 tháng tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-1'
                                },
                                {
                                    name: 'Nhóm trẻ từ 13 đến 24 tháng tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-2'
                                },
                                {
                                    name: 'Nhóm trẻ từ 25 đến 36 tháng tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-3'
                                },
                                {
                                    name: 'Số lớp mẫu giáo 3-4 tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-3'
                                },
                                {
                                    name: 'Số lớp mẫu giáo 4-5 tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-4'
                                },
                                {
                                    name: 'Số lớp mẫu giáo 5-6 tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-4'
                                },
                                {
                                    name: 'Cộng',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum'
                                }
                            ]
                        },
                        {
                            tenchimuc: '2. Cơ cấu khối công trình của nhà trường',
                            loaichimuc: 2,
                            columns: [
                                {
                                    title: 'TT',
                                    dataIndex: 'sothutu'
                                },
                                {
                                    title: 'Số liệu',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Năm học 2015-2016',
                                    dataIndex: 'col1'
                                },
                                {
                                    title: 'Năm học 2016-2017',
                                    dataIndex: 'col2'
                                },
                                {
                                    title: 'Năm học 2017-2018',
                                    dataIndex: 'col3'
                                },
                                {
                                    title: 'Năm học 2018-2019',
                                    dataIndex: 'col4'
                                },
                                {
                                    title: 'Năm học 2019-2020',
                                    dataIndex: 'col5'
                                },
                                {
                                    title: 'Ghi chú',
                                    dataIndex: 'col6'
                                }
                            ],
                            rows: [
                                {
                                    sothutu: 'I',
                                    name: 'Khối phòng nhóm trẻ, lớp mẫu giáo',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1'
                                },
                                {
                                    sothutu: '1',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-1'
                                },
                                {
                                    sothutu: '2',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-2'
                                },
                                {
                                    sothutu: '3',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-3'
                                },
                                {
                                    sothutu: 'II',
                                    name: 'Khối phòng phục vụ học tập',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2'
                                },
                                {
                                    sothutu: '1',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2-1'
                                },
                                {
                                    sothutu: '2',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2-2'
                                },
                                {
                                    sothutu: '3',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2-3'
                                },
                                {
                                    sothutu: 'III',
                                    name: 'Khối phòng hành chính quản trị',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-3'
                                },
                                {
                                    sothutu: '1',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-3-1'
                                },
                                {
                                    sothutu: '2',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-3-2'
                                },
                                {
                                    sothutu: '3',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-3-3'
                                },
                                {
                                    sothutu: 'IV',
                                    name: 'Khối phòng tổ chức ăn',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-4'
                                },
                                {
                                    sothutu: '1',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-4-1'
                                },
                                {
                                    sothutu: '2',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-4-2'
                                },
                                {
                                    sothutu: '3',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-4-2'
                                },
                                {
                                    sothutu: ' ',
                                    name: 'Cộng',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum'
                                },
                            ]
                        },
                        {
                            tenchimuc: '3. Cán bộ quản lý, giáo viên, nhân viên',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: 'a) Số liệu tại thời điểm TĐG',
                                    loaichimuc: 2,
                                    columns: [
                                        {
                                            title: '',
                                            dataIndex: 'name'
                                        },
                                        {
                                            title: 'Tổng số',
                                            dataIndex: 'col1'
                                        },
                                        {
                                            title: 'Nữ',
                                            dataIndex: 'col2'
                                        },
                                        {
                                            title: 'Dân tộc',
                                            dataIndex: 'col3'
                                        },
                                        {
                                            title: 'Chưa đạt chuẩn',
                                            dataIndex: 'col4'
                                        },
                                        {
                                            title: 'Đạt chuẩn',
                                            dataIndex: 'col5'
                                        },
                                        {
                                            title: 'Trên chuẩn',
                                            dataIndex: 'col6'
                                        },
                                        {
                                            title: 'Ghi chú',
                                            dataIndex: 'col7'
                                        }
                                    ],
                                    rows: [
                                        {
                                            name: 'Hiệu trưởng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-1'
                                        },
                                        {
                                            name: 'Phó Hiệu trưởng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-2'
                                        },
                                        {
                                            name: 'Giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-3'
                                        },
                                        {
                                            name: 'Nhân viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-4'
                                        },
                                        {
                                            name: 'Cộng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum'
                                        },
                                    ]
                                },
                                {
                                    tenchimuc: 'b) Số liệu của 5 năm gần đây',
                                    loaichimuc: 2,
                                    columns: [
                                        {
                                            title: 'TT',
                                            dataIndex: 'sothutu'
                                        },
                                        {
                                            title: 'Số liệu',
                                            dataIndex: 'name'
                                        },
                                        {
                                            title: 'Năm học 2015-2016',
                                            dataIndex: 'col1'
                                        },
                                        {
                                            title: 'Năm học 2016-2017',
                                            dataIndex: 'col2'
                                        },
                                        {
                                            title: 'Năm học 2017-2018',
                                            dataIndex: 'col3'
                                        },
                                        {
                                            title: 'Năm học 2018-2019',
                                            dataIndex: 'col4'
                                        },
                                        {
                                            title: 'Năm học 2019-2020',
                                            dataIndex: 'col5'
                                        }
                                    ],
                                    rows: [
                                        {
                                            sothutu: '1',
                                            name: 'Tổng số giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '2',
                                            name: 'Tỷ lệ trẻ em/ giáo viên (đối với nhóm trẻ)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '3',
                                            name: 'Tỷ lệ trẻ em/ giáo viên (đối với lớp mẫu giáo không có trẻ bán trú)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '4',
                                            name: 'Tỷ lệ trẻ em/ giáo viên (đối với lớp mẫu giáo có trẻ bán trú)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '5',
                                            name: 'Tổng số giáo viên dạy giỏi cấp huyện hoặc tương đương trở lên (nếu có)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '6',
                                            name: 'Tổng số giáo viên dạy giỏi cấp tỉnh trở lên (nếu có)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tenchimuc: '4. Trẻ em',
                            loaichimuc: 2,
                            columns: [
                                {
                                    title: 'Số liệu',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Năm học 2015-2016',
                                    dataIndex: 'col1'
                                },
                                {
                                    title: 'Năm học 2016-2017',
                                    dataIndex: 'col2'
                                },
                                {
                                    title: 'Năm học 2017-2018',
                                    dataIndex: 'col3'
                                },
                                {
                                    title: 'Năm học 2018-2019',
                                    dataIndex: 'col4'
                                },
                                {
                                    title: 'Năm học 2019-2020',
                                    dataIndex: 'col5'
                                },
                                {
                                    title: 'Ghi chú',
                                    dataIndex: 'col6'
                                }
                            ],
                            rows: [
                                {
                                    name: 'Tổng số trẻ em',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: '- Nữ',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: '- Dân tộc thiểu số',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Đối tượng chính sách',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Khuyết tật',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Tuyển mới',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Học 2 buổi/ngày',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Học 2 buổi/ngày',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Bán trú',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Tỷ lệ trẻ em/lớp',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Tỷ lệ trẻ em/nhóm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: '- Trẻ em từ 03 đến 12 tháng tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: '- Trẻ em từ 13 đến 24 tháng tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: '- Trẻ em từ 25 đến 36 tháng tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: '- Trẻ em từ 3-4 tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: '- Trẻ em từ 4-5 tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: '- Trẻ em từ 5-6 tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                            ],
                        }
                    ]
                },
                {
                    tenchimuc: 'PHẦN II: TỰ ĐÁNH GIÁ',
                    loaichimuc: 0,
                    isCenterTitle: 1,
                    isDropLine: 1,
                    children: [
                        {
                            tenchimuc: 'A. ĐẶT VẤN ĐỀ',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: '1. Tình hình chung nhà trường',
                                    loaichimuc: 1
                                },
                                {
                                    tenchimuc: '2. Mục đích TĐG',
                                    loaichimuc: 1
                                },
                                {
                                    tenchimuc: '3. Tóm tắt quá trình và những vấn đề nổi bặt trong hoạt động TĐG',
                                    loaichimuc: 1
                                }
                            ]
                        },
                        {
                            tenchimuc: 'B. TỰ ĐÁNH GIÁ',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: 'I. TỰ ĐÁNH GIÁ TIÊU CHÍ MỨC 1,2 VÀ 3',
                                    loaichimuc: 0,
                                    children: [
                                        {
                                            tenchimuc: 'Tiêu chuẩn 1: Tổ chức và quản lý nhà trường',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.1: Phương hướng, chiến lược xây dựng và phát triển nhà trường',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phù hợp với mục tiêu giáo dục mầm non được quy định tại Luật giáo dục, định hướng phát triển kinh tế - xã hội của địa phương theo từng giai đoạn và các nguồn lực của nhà trường; ',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Phù hợp với mục tiêu GDMN được quy định tại Luật giáo dục<br>- Phù hợp với định hướng phát triển KT-XH của địa phương theo từng giai đoạn<br>- Phù hợp với các nguồn lực của nhà trường;<br>&nbsp;</p>',
                                                            cauhoi: '<p>- Phương hướng, chiến lược XD&amp;PT nhà trường được xây dựng như thế nào? Có phù hợp với mục tiêu GDMN không?<br>- Phương hướng, chiến lược XD&amp;PT nhà trường có căn cứ vào định hướng phát triển KT-XH của địa phương theo từng giai đoạn hay không? Các chỉ tiêu cụ thể?<br>- Phương hướng, chiến lược XD&amp;PT nhà trường có khả thi không? So với trước đây, đánh giá phương hướng, chiến lược của nhà trường như thế nào?</p>',
                                                            canthuthap: '<p>- Kế hoạch phát triển nhà trường theo giai đoạn.<br>- Kế hoạch năm học<br>- Báo cáo sơ kết, tổng kết hàng năm.<br>- Nghị quyết Đại hội Đảng bộ các cấp về định hướng phát triển KT-XH của địa phương, của ngành<br>- Nghị quyết của HĐND các cấp về chỉ tiêu phát triển, định hướng phát triển KT-XH của địa phương, của ngành; Quyết định của UBND cấp quận huyện có nội dung cụ thể hóa Nghị quyết Đại hội Đảng bộ, Nghị quyết của HĐND cùng cấp<br>- Sổ nghị quyết</p>',
                                                            noithuthap: '<p>- Phòng Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Được xác định bằng văn bản và cấp có thẩm quyền phê duyệt;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Được xác định bằng văn bản và cấp có thẩm quyền phê duyệt;</p>',
                                                            cauhoi: '<p>- Có được các cấp có thẩm quyền phê duyệt hay không?</p>',
                                                            canthuthap: '<p>- Kế hoạch phát triển nhà trường theo giai đoạn; KH năm.</p>',
                                                            noithuthap: '<p>- Phòng Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Được công bố công khai bằng hình thức niêm yết tại nhà trường hoặc đăng tải trên trang thông tin điện tử của nhà trường (nếu có) hoặc đăng tải trên các phương tiện thông tin đại chúng của địa phương, trang thông tin điện tử của phòng giáo dục và đào tạo.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Được công bố công khai bằng hình thức niêm yết tại nhà trường hoặc đăng tải trên trang thông tin điện tử của nhà trường (nếu có) hoặc đăng tải trên các phương tiện thông tin đại chúng của địa phương, trang thông tin điện tử của phòng giáo dục và đào tạo.</p>',
                                                            cauhoi: '<p>- Có được công khai bằng những hình thức nào?</p>',
                                                            canthuthap: '<p>- Các hình ảnh, tư liệu chứng minh nội dung chiến lược phát triển của nhà trường đã được đưa tin trên các phương tiện thông tin truyền thông.<br>- Đường dẫn truy cập vào Cổng thông tin điện tử của Phòng GD&amp;ĐT hoặc nhà trường có đăng tải nội dung phương hướng, chiến lược xây dựng và phát triển.</p>',
                                                            noithuthap: '<p>- Văn thư lưu trữ<br>- Trang Web</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nhà trường có các giải pháp giám sát việc thực hiện phương hướng, chiến lược xây dựng và phát triển.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Nhà trường có các giải pháp giám sát việc thực hiện phương hướng, chiến lược xây dựng và phát triển của nhà trường</p>',
                                                            cauhoi: '<p>Nhà trường thực hiện việc giám sát như thế nào?</p>',
                                                            canthuthap: '<p>- Sổ nghị quyết và kế hoạch công tác<br>- Báo cáo định kỳ<br>- Biên bản giám sát của Hội đồng trường<br>- Các văn bản của cấp có thẩm quyền đánh giá nhà trường khi thực hiện giám sát</p>',
                                                            noithuthap: '<p>Văn thư lưu trữ</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0
                                                        },
                                                        {
                                                            tieude: 'Định kỳ rà soát, bổ sung, điều chỉnh phương hướng, chiến lược xây dựng và phát triển. Tổ chức xây dựng phương hướng, chiến lược xây dựng và phát triển có sự tham gia của các thành viên trong Hội đồng trường (Hội đồng quản trị đối với trường tư thục), cán bộ quản lý, giáo viên, nhân viên, cha mẹ trẻ và cộng đồng.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Định kỳ rà soát, bổ sung, điều chỉnh phương hướng, chiến lược xây dựng và phát triển nhà trường.<br>- Tổ chức xây dựng phương hướng, chiến lược xây dựng và phát triển có sự tham gia của các thành viên trong Hội đồng trường (Hội đồng quản trị đối với trường tư thục), cán bộ quản lý, giáo viên, nhân viên, cha mẹ trẻ và cộng đồng</p>',
                                                            cauhoi: '<p>- Nhà trường thực hiện việc rà soát, kiểm tra, bổ sung, điều chỉnh Phương hướng, chiến lược XD và PT nhà trường như thế nào?<br>- Nhà trường có xây dựng kế hoạch, rà soát, bổ sung</p>',
                                                            canthuthap: '<p>- Báo cáo, biên bản có nội dung rà soát, bổ sung, điều chỉnh phương hướng, chiến lược xây dựng và phát triển<br>- Văn bản bổ sung, điều chỉnh phương hướng, chiến lược XD&amp;PT của nhà trường được cấp có thẩm quyền phê duyệt</p>',
                                                            noithuthap: '<p>Văn thư lưu trữ</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.2: Hội đồng trường (Hội đồng quản trị đối với trường tư thục) và các hội đồng khác',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Được thành lập theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hội đồng trường đối với trường công lập; hội đồng quản trị đối với trường dân lập; tư thục; Hội đồng thi đua khen thưởng và các hội đồng khác.</p>',
                                                            cauhoi: '<p>Nhà trường đã thành lập những hội đồng nào?</p>',
                                                            canthuthap: '<p>Quyết định Thành lập HĐ trường; HĐTĐKT<br>Hội đồng sáng kiến kinh nghiệm,Hội đồng chấm thi giáo viên dạy giỏi, hội đồng thi đồ dùng đồ chơi tự tạo</p>',
                                                            noithuthap: '<p>Hồ sơ lưu nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Thực hiện chức năng, nhiệm vụ và quyền hạn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Các hội đồng Thực hiện các chức năng nhiệm vụ, và quyền hạn theo qui định tại điều 18, 19 điều lệ trường MN.</p>',
                                                            cauhoi: '<p>- Các hội đồng thực hiện các chức năng nhiệm vụ và quyền hạn có theo qui định chưa?</p>',
                                                            canthuthap: '<p>Kế hoạch hoạt động; Biên bản sinh hoạt, Phân công chức năng nhiệm vụ các thành viên trong hội đồng; NQ sinh hoạt của HĐTrường;</p>',
                                                            noithuthap: '<p>Hồ sơ lưu nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Các hoạt động được định kỳ rà soát, đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hoạt động của các hội đồng được định kỳ rà soát, đánh giá.</p>',
                                                            cauhoi: '<p>- Hoạt động của các hội đồng? Hằng năm có rà soát, đánh giá như thế nào?</p>',
                                                            canthuthap: '<p>Báo cáo sơ kết, tổng kết; Biên bản kiểm tra giám sát; Biên bản họp xét thi đua;</p>',
                                                            noithuthap: '<p>Hồ sơ lưu nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Hoạt động có hiệu quả, góp phần nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ của nhà trường. ',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Hoạt động của các hội đồng đạt hiệu quả, góp phần nâng cao chất lượng nuôi dưỡng chăm sóc và giáo dục trẻ của nhà trường</p>',
                                                            cauhoi: '<p>Các hội đồng có đóng góp trong công tác nâng cao chất lượng nuôi dưỡng chăm sóc và giáo dục trẻ của nhà trường không?</p>',
                                                            canthuthap: '<p>Biên bản họp hội đồng; có ghi lại nội dung các cuộc họp của các hội đồng đánh giá về hiệu quả hoạt động của các hội đồng góp phần nâng cao chất lượng chăm sóc và giáo dục trẻ ; Báo cáo tổng kết năm học</p>',
                                                            noithuthap: '<p>Văn bản đi đến của trường</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.3: Tổ chức Đảng Cộng sản Việt Nam, các đoàn thể và tổ chức khác trong nhà trường',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Các đoàn thể và tổ chức khác trong nhà trường có cơ cấu tổ chức theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Tổ chức công đoàn<br>- Đoàn TNCSHCM<br>- Tổ khuyến học, chi hội chữ thập đỏ</p>',
                                                            cauhoi: '<p>- Nhà trường có những đoàn thể và tổ chức khác nào?</p>',
                                                            canthuthap: '<p>- Quyết định chuẩn y chuẩn Ban chấp hành công đoàn, chi đoàn.<br>- QĐ thành lập chi hội khuyến học, Chi hội chữ thập đỏ. QĐ thành lập chi Đoàn hoặc chuẩn y BCH chi đoàn</p>',
                                                            noithuthap: '<p>- Công đoàn, chi đoàn nhà trường.<br>- Hồ sơ lưu của nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Công đoàn, Đoàn TNCSHCM và các tổ chức xã hội khác hoạt động trong nhà trường theo quy định của pháp luật và Điều lệ của từng tổ chức nhằm giúp nhà trường thực hiện mục tiêu giáo dục.</p>',
                                                            cauhoi: '<p>Hoạt động của từng tổ chức và đoàn thể như thế nào?</p>',
                                                            canthuthap: '<p>- Các kế hoạch hoạt động theo điều lệ công đoàn<br>- Chương trình hành động của chi đoàn theo nhiệm kỳ.<br>- Các kế hoạch hoạt động của các chi hội (khuyến học, cao tuổi, chữ thập đỏ)</p>',
                                                            noithuthap: '<p>- Hồ sơ lưu của nhà trường, của công đoàn trường<br>- Hồ sơ chi đoàn<br>- Hồ sơ lưu của nhà trường.</p>',
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, các hoạt động được rà soát, đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Hằng năm, các hoạt động được rà soát đánh giá</p>',
                                                            cauhoi: '<p>- Việc rà soát, đánh giá các hoạt động của các đoàn thể và tổ chức như thế nào?</p>',
                                                            canthuthap: '<p>- Nghị quyết Biên bản sơ kết, tổng kết của công đoàn, đoàn TNCSHCM và các tổ chức xã hội khác.Báo cáo sơ kết, tổng kết hoạt động của công đoàn, chi đoàn, chi hội khuyến học, cao tuổi, chữ thập đỏ.</p>',
                                                            noithuthap: '<p>- Hồ sơ lưu của nhà trường, của công đoàn trường, của chi đoàn và các chi hội.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức Đảng Cộng sản Việt Nam có cơ cấu tổ chức và hoạt động theo quy định; trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 01 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Có cơ cấu tổ chức và hoạt động trong khuôn khổ Hiến pháp, pháp luật và Điều lệ Đảng cộng sản Việt Nam<br>- Trong 05 năm liền kề trước khi đề nghị công nhận có ít nhất 01 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên.</p>',
                                                            cauhoi: '<p>- Trường có thành lập chi bộ không ?<br>- Từ năm 2013 đến năm 2018 được cấp thẩm quyền đánh giá ở mức dộ nào?</p>',
                                                            canthuthap: '<p>QĐ thành lập tổ chức đảng trong nhà trường chuẩn y của cấp ủy.<br>- Quyết định công nhận chi bộ trong sạch vững mạnh hàng năm.</p>',
                                                            noithuthap: '<p>- Hồ sơ lưu chi bộ<br>- Hồ sơ lưu chi bộ</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác có đóng góp tích cực cho các hoạt động của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Các đoàn thể, tổ chức khác đóng góp có tích cực cho các hoạt động trong nhà trường</p>',
                                                            cauhoi: '<p>Các đoàn thể, tổ chức khác đã hoạt động như thề nào trong nhà trường?</p>',
                                                            canthuthap: '<p>- Báo cáo tổng kết việc thực hiện Nghị quyết hàng năm.<br>- Biên bản kiểm tra của cấp trên đối với các tổ chức đoàn thể trong nhà trường có nhận xét đánh giá về đóng góp.</p>',
                                                            noithuthap: '<p>- Hồ sơ lưu của trường.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, tổ chức Đảng Cộng sản Việt Nam có ít nhất 02 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Trong 05 năm liền kề trước khi đề nghị công nhận tổ chức Đảng cộng sản Việt Nam trong nhà trường có ít nhất 02 năm hoàn thành tốt nhiệm vụ<br>- Các năm còn lại hoàn thành nhiệm vụ trở lên.</p>',
                                                            cauhoi: '<p>Từ năm 2013 đến năm 2018 được cấp thẩm quyền đánh giá ở mức dộ nào?</p>',
                                                            canthuthap: '<p>- QĐ công nhận chi bộ trong sạch vững mạnh trong 05 năm liền kề.<br>Giấy khen, bằng khen của cơ quan quản lý cấp trên công nhận tổ chức ĐCSVN của nhà trường hoàn thành tốt nhiệm vụ.</p>',
                                                            noithuthap: '<p>- Hồ sơ lưu chi bộ</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác đóng góp hiệu quả cho các hoạt động của nhà trường và cộng đồng.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Các đoàn thể, tổ chức khác đóng góp có hiệu quả cho các hoạt động của nhà trường và cộng đồng.</p>',
                                                            cauhoi: '<p>Các đoàn thể tổ chức đảng có đóng góp gì cho nhà trường và cộng đồng không?</p>',
                                                            canthuthap: '<p>- Báo cáo tổng kết của nhà trường có nhận xét đánh giá về việc đóng góp hiệu quả của các đoàn thể và tổ chức khác cho các hoạt động của nhà trường và cộng động</p>',
                                                            noithuthap: '<p>- Hồ sơ lưu của trường.<br>- Hồ sơ lưu của trường.</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.4: Hiệu trưởng, phó hiệu trưởng, tổ chuyên môn và tổ văn phòng',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có hiệu trưởng, số lượng phó hiệu trưởng theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Đến thời điểm tự đánh giá nhà trường có hiệu trưởng; đủ số lượng Phó hiệu trưởng theo qui định tại thông tư liên tịch số: 06/2015/TTLT-BGDĐT-BNV ngày 16/3/2015 quy định về danh mục khung vị trí việc làm và định mức số lượng người làm việc trong các cơ sở giáo dục mầm non công lập.</p>',
                                                            cauhoi: '<p>Nhà trường có hiệu trưởng, số lượng Phó hiệu trưởng theo qui định không?</p>',
                                                            canthuthap: '<p>- Quyết định bổ nhiệm Hiệu Trưởng phó hiệu trưởng.</p>',
                                                            noithuthap: '<p>- Hồ sơ nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn và tổ văn phòng có cơ cấu tổ chức theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Cơ cấu tổ chức của tổ chuyên môn theo qui định tại Điều lệ trường Mầm non.<br>- Cơ cấu tổ chức của tổ văn phòng môn theo qui định tại Điều lệ trường Mầm non.</p>',
                                                            cauhoi: '<p>- Nhà trường có thành lập các tổ theo đúng qui định không?</p>',
                                                            canthuthap: '<p>- Quyết định thành lập tổ trưởng tổ phó chuyên môn<br>- Danh sách Tổ trưởng tổ phó chuyên môn.<br>- Quyết định thành lập tổ văn phòng.<br>- Danh sách Tổ văn phòng.</p>',
                                                            noithuthap: '<p>- Hồ sơ nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chuyên môn, tổ văn phòng có kế hoạch hoạt động và thực hiện các nhiệm vụ theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>* Tổ chuyên môn<br>- Có kế hoạch hoạt động chung của tổ theo tháng năm học nhằm thực hiện chương trình giáo dục mầm non.<br>- Thực hiện các nhiệm vụ theo qui định tại điều lệ Trường Mầm Non.<br>* Tổ văn phòng<br>- Có kế hoạch hoạt động của tổ theo tháng năm nhằm phục vụ cho việc thực hiện các hoạt động của nhà trường về nuôi dưỡng chăm sóc giáo dục trẻ em.<br>- Thực hiện các nhiệm vụ</p>',
                                                            cauhoi: '<p>- Hình thức hoạt động của tổ như thế nào?<br>- Các kế hoạch hoạt động của tổ<br>- Báo cáo thành tích đạt được đạt không?<br>- Việc đánh giá xếp loại của giáo viên trong tổ được đánh giá như thế nào?<br>Tổ chuyên môn và tổ văn phòng có kế hoạch hoạt động như thế nào?- Hình thức hoạt động của tổ như thế nào?<br>- Các kế hoạch hoạt động của tổ<br>- Báo cáo thành tích đạt được đạt không?<br>- Việc đánh giá xếp loại của giáo nhân viên trong tổ được đánh giá như thế nào?</p>',
                                                            canthuthap: '<p>- Sổ bồi dưỡng chuyên môn.<br>- Kế hoạch hoạt động chung của Tổ theo tháng năm học.<br>- Kế hoạch của trường về việc bồi dưỡng chuyên môn nghiệp vụ cho giáo viên.<br>- Hồ sơ quản lý chuyên môn..<br>- Báo cáo tổng kết năm học của nhà trường các nội dung liên quan.<br>- Biên bản về đánh giá xếp loại của giáo viên theo qui định chuẩn nghề nghiệp giáo viên MN hằng năm.<br>- Sổ bồi dưỡng tổ văn phòng.<br>- Kế hoạch hoạt động chung của Tổ văn phòng<br>Hồ sơ quản lý tài sản tài chính.<br>- Biên bản kiểm kê tài liệu đồ dùng đồ chơi thiết bị tài sản tài chính hồ sơ của tổ nhà trường hàng năm.<br>- Biên bản về đánh giá xếp loại của nhân viên theo qui định.<br>Biên bản sinh hoạt chuyên đề của nhà trường?</p>',
                                                            noithuthap: '<p>-&nbsp;Hồ sơ chuyên môn<br>-&nbsp;Hồ sơ nhà trường<br>- Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hằng năm, tổ chuyên môn đề xuất và thực hiện được ít nhất 01 (một) chuyên đề chuyên môn có tác dụng nâng cao chất lượng hiệu quả giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Tổ chuyên môn đề xuất được một chuyên đề chuyên môn.<br>- Thực hiện được ít nhất được một chuyên đề chuyên môn có chất lượng nâng cao chất lượng và hiệu quả giáo dục.</p>',
                                                            cauhoi: '<p>- Kế hoạch chuyên đề gì?<br>- Kết quả của chuyên đề như thế nào?<br>- Có được các cấp có thẩm quyền khen không?<br>Hằng năm tổ chuyên môn thực hiện có tác dụng nâng cao hiệu quả giáo dục không?</p>',
                                                            canthuthap: '<p>- Chuyên đề chuyên môn Tổ đề xuất.<br>- Báo cáo tổng kết của nhà trường có đánh giá hiệu quả của chuyên đề.<br>- Bằng khen giấy khen của các cấp có thẩm quyền đánh giá về hiệu quả của chuyên đề (nếu có)</p>',
                                                            noithuthap: '<p>-Tổ chuyên môn<br>- Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động của tổ chuyên môn và tổ văn phòng được định kỳ rà soát, đánh giá, điều chỉnh.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Hoạt động của tổ chuyên môn được định kỳ rà soát đánh giá điều chỉnh.<br>- Hoạt động của tổ văn phòng được định kỳ rà soát đánh giá điều chỉnh.</p>',
                                                            cauhoi: '<p>Hoạt động của tổ chuyên môn và tổ văn phòng định kỳ được rà soát và điều chỉnh như thế nào?</p>',
                                                            canthuthap: '<p>- Kế hoạch hoạt động chung của tổ chuyên môn tháng năm đã được rà soát đánh giá điều chỉnh.<br>- Báo cáo tổng kết của năm học của nhà trường có đánh giá hiệu quả của chuyên đề.<br>- Kế hoạch hoạt động chung của tổ văn phòng tháng năm đã được rà soát đánh giá điều chỉnh.<br>- Báo cáo tổng kết của năm học của nhà trường</p>',
                                                            noithuthap: '<p>Tổ chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hoạt động của tổ chuyên môn và tổ văn phòng có đóng góp hiệu quả trong việc nâng cao chất lượng các hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Hoạt động của tổ chuyên môn có đóng góp hiệu quả trong việc nâng cao chất lượng các hoạt động của nhà trường.<br>- Hoạt động của tổ văn<br>phòng có đóng góp hiệu quả trong việc nâng cao chất lượng các hoạt động của nhà trường.</p>',
                                                            cauhoi: '<p>Hoạt động của tổ chuyên môn và tổ văn phòng có đóng góp hiệu quả trong việc nâng cao chất lượng các hoạt động của nhà trường không?- Kết quả thực hiện của chuyên đề trong học kỳ như thế nào?<br>- Có được các cấp có thẩm quyền khen không?<br>- Kết quả thực hiện chuyên đề.</p>',
                                                            canthuthap: '<p>- Báo cáo tổng kết năm học của nhà trường có nội dung đánh giá về việc tổ chuên môn thực hiện hiệu quả các chuyên đề trong việc nâng cao các hoạt động của nhà trường.<br>- Biên bản kết luận của các cấp có thẩm quyền có nội dung nói về đóng góp của tổ chuyên môn...<br>- Bằng khen giấy khen quyết định...<br>- Báo cáotổng kết năm học của nhà trường có nội dung đánh giá về việc tổ văn phòng thực hiện hiệu quả nâng cao các hoạt động của nhà trường.<br>- Biên bản kết luận của các cấp có thẩm quyền có nội dung nói về đóng góp của tổ văn phòng...<br>- Bằng khen giấy khen quyết định...</p>',
                                                            noithuthap: '<p>Tổ chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn thực hiện hiệu quả các chuyên đề chuyên môn góp phần nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Tổ chuyên môn thực hiện hiệu quả các chuyên đề chuyên môn góp phần nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ em.</p>',
                                                            cauhoi: '<p>Tổ chuyên môn thực hiện các chuyên đề có góp phần nâng cao chất lượng chăm sóc và giáo dục trẻ không?</p>',
                                                            canthuthap: '<p>- Báo cáo tổng kết năm học của nhà trường có nội dung đánh giá tổ chuyên môn thực hiện có hiệu quả các chuyên đề.</p>',
                                                            noithuthap: '<p>Tổ chuyên môn.</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.5: Tổ chức nhóm trẻ và lớp mẫu giáo',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Các nhóm trẻ, lớp mẫu giáo được phân chia theo độ tuổi; trong trường hợp số lượng trẻ trong mỗi nhóm, lớp không đủ 50% so với số trẻ tối đa quy định tại Điều lệ trường mầm non thì được tổ chức thành nhóm trẻ ghép hoặc lớp mẫu giáo ghép;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Các nhóm trẻ, lớp mẫu giáo được phân chia theo độ tuổi; theo quy định Điều lệ trường mầm non;<br>+ Đối với nhóm trẻ: trẻ em từ 3 – 12 tháng tuổi; từ 13 – 24 tháng tuổi; từ 25 – 36 tháng tuổi<br>+ Đối với lớp mẫu giáo: trẻ em từ 3 – 4 tuổi tuổi; từ 4–5 tuổi; từ 5– 6 tuổi<br>- Trong trường hợp số lượng trẻ em trong mỗi nhóm lớp của nhà trường không đủ 50% so với số trẻ em tối đa theo quy định trường mầm non thì được tổ chức thành nhóm trẻ ghép (không quá 20 trẻ) hoặc lớp mẫu giáo ghép (không quá 30 trẻ)</p>',
                                                            cauhoi: '<p>-&nbsp;Nhà trường có phân chia các lớp mẫu giáo theo quy định Điều lệ trường mầm non không?<br>- Các năm qua nhà trường có tổ chức lớp mẫu giáo ghép không? Số lượng như thế nào?<br>&nbsp;</p>',
                                                            canthuthap: '<p>- Sổ theo dõi nhóm lớp. bảng thống kê số trẻ/ lớp<br>-&nbsp;Sổ theo dõi nhóm lớp.</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng phụ trách chuyên môn<br>-&nbsp;Phó hiệu trưởng phụ trách chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Các nhóm trẻ, lớp mẫu giáo được tổ chức học 02 buổi trên ngày;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Các nhóm trẻ, lớp mẫu giáo được tổ chức học 02 buổi / ngày</p>',
                                                            cauhoi: '<p>Nhà trường có bao nhiêu lớp mẫu giáo được học 2 buổi/ ngày?</p>',
                                                            canthuthap: '<p>Sổ theo dõi trẻ</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng phụ trách bán trú</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Mỗi nhóm trẻ, lớp mẫu giáo có không quá 02 (hai) trẻ cùng một dạng khuyết tật.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Mỗi nhóm trẻ, lớp mẫu giáo có không quá 02 (hai) trẻ cùng một dạng khuyết tật.</p>',
                                                            cauhoi: '<p>Nhà trường có trẻ khuyết tật được hòa nhập không? Bảng thống kê trẻ khuyết tật của từng nhóm lớp?trẻ khuyết tật sắp xếp lớp như thế nào?</p>',
                                                            canthuthap: '<p>Hồ sơ quản lý trẻ em khuyết tật</p>',
                                                            noithuthap: '<p>Nhân viên y tế</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Số trẻ trong các nhóm trẻ và lớp mẫu giáo không vượt quá quy định và được phân chia theo độ tuổi.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường có số lượng trẻ em trong các nhóm trẻ và lớp mẫu giáo không vượt quá quy định Điều lệ Trường mầm non<br>- Trẻ em được phân chia theo độ tuổi<br>+ Đối với nhóm trẻ: trẻ em từ 3 tháng tuổi đến 36 tháng tuổi được tổ chức thành các nhóm trẻ. Số trẻ tối đa trong một nhóm trẻ được quy định như sau:<br>- Nhóm trẻ từ 3 đến 12 tháng tuổi: 15 trẻ;<br>- Nhóm trẻ từ 13 đến 24 tháng tuổi: 20 trẻ;<br>- Nhóm trẻ từ 25 đến 36 tháng tuổi: 25 trẻ.<br>+ Đối với lớp mẫu giáo: Trẻ em từ ba tuổi đến sáu tuổi được tổ chức thành các lớp mẫu giáo. Số trẻ tối đa trong một lớp mẫu giáo được quy định như sau:<br>- Lớp mẫu giáo 3-4 tuổi: 25 trẻ;<br>- Lớp mẫu giáo 4-5 tuổi: 30 trẻ;<br>- Lớp mẫu giáo5-6 tuổi: 35 trẻ.</p>',
                                                            cauhoi: '<p>Số lượng trẻ em trong các nhóm trẻ, lớp mẫu giáo trong nhà trường có vượt quá quy định Điều lệ Trường mầm non không?<br>Trẻ em được phân chia theo độ tuổi như thế nào?</p>',
                                                            canthuthap: '<p>- Sổ theo dõi nhóm lớp.<br>-&nbsp;Bảng thống kê số trẻ/ lớp</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng phụ trách chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nhà trường có không quá 20 (hai mươi) nhóm trẻ, lớp mẫu giáo.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Nhà trường có không quá 20 (hai mươi) nhóm trẻ, lớp mẫu giáo.</p>',
                                                            cauhoi: '<p>Nhà trường có tổng bao nhiêu lớp mẫu giáo?</p>',
                                                            canthuthap: '<p>Danh sách các nhóm, lớp</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng phụ trách chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.6: Quản lý hành chính, tài chính và tài sản',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hệ thống hồ sơ của nhà trường được lưu trữ theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Hồ sơ, văn bản được lưu trữ đầy đủ, khoa học theo quy định của Luật lưu trữ.</p>',
                                                            cauhoi: '<p>Hồ sơ, văn bản của nhà trường có được lưu trữ đầy đủ, khoa học theo quy định của luật lưu trữ hay không?</p>',
                                                            canthuthap: '<p>Sổ lưu trữ các văn bản, công văn<br>Báo cáo tổng kết năm học nhà trường? biên bản kiểm tra của các cấp có thẩm quyền có nội dung đánh giá về công tác lưu trữ, bảo quản hồ sơ, văn bản</p>',
                                                            noithuthap: '<p>Hồ sơ nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Lập dự toán, thực hiện thu chi, quyết toán, thống kê, báo cáo tài chính và tài sản; công khai và định kỳ tự kiểm tra tài chính, tài sản theo quy định; quy chế chi tiêu nội bộ được bổ sung, cập nhật phù hợp với điều kiện thực tế và các quy định hiện hành;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Lập dự toán, thực hiện thu chi, quyết toán, thống kê, báo cáo tài chính và tài sản theo quy định;<br>- Công khai và định kỳ tự kiểm tra tài chính, tài sản theo quy định;<br>- Quy chế chi tiêu nội bộ được bổ sung, cập nhật phù hợp với điều kiện thực tế và các quy định hiện hành.</p>',
                                                            cauhoi: '<p>- Nhà trường đã Lập dự toán, thực hiện thu chi, quyết toán, thống kê, báo cáo tài chính và tài sản như thế nào?<br>- Trường có công khai và kiểm tra tài chính, tài sản theo qui định hay không?<br>- Nhà trường có xây dựng quy chế Chi tiêu nội bộ không? Quy chế có được cập nhật với điều kiện thực tế và các quy định hiện hành không?</p>',
                                                            canthuthap: '<p>-&nbsp;Hồ sơ quản lý tài chính, tài sản của nhà trường<br>- Biên bản thanh tra kiểm tra của các cấp có thẩm quyền về tài chính, tài sản<br>- Quy chế chi tiêu nội bộ của nhà trường?</p>',
                                                            noithuthap: '<p>Phòng Kế toán</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Quản lý, sử dụng tài chính, tài sản đúng mục đích và có hiệu quả để phục vụ các hoạt động giáo dục.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường quản lý, sử dụng tài chính và tài sản đảm bảo:<br>- Đúng mục đích;<br>- Đạt hiệu quả để phục vụ các hoạt động giáo dục.</p>',
                                                            cauhoi: '<p>- Việc nhà trường quản lý , sử dụng tài chính và tài sản đảm bảo theo quy định hay không?</p>',
                                                            canthuthap: '<p>Báo cáo tổng kết năm học của nhà trường có nội dung đánh giá việc sử dụng hiệu quả tài chính và tài sản<br>-Biên bản thanh tra kiểm tra của các cấp có thẩm quyền về tài chính, tài sản</p>',
                                                            noithuthap: '<p>Hồ sơ nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Ứng dụng công nghệ thông tin hiệu quả trong công tác quản lý hành chính, tài chính và tài sản của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Ứng dụng công nghệ thông tin hiệu quả trong công tác quản lý hành chính, tài chính và tài sản của nhà trường</p>',
                                                            cauhoi: '<p>Nhà trường có Ứng dụng công nghệ thông tin trong công tác quản lý hành chính, tài chính và tài sản hay không?</p>',
                                                            canthuthap: '<p>Phần mềm quản lý hành chính, tài chính và tài sản của nhà trường?</p>',
                                                            noithuthap: '<p>Kế toán</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có vi phạm liên quan đến việc quản lý hành chính, tài chính và tài sản theo kết luận của thanh tra, kiểm toán.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Kết luận của thanh tra, kiểm toán trong 05 năm liền kề trước khi đề nghị công nhận,nhà trường không có vi phạm liên quan đến:<br>- Quản lý hành chính;<br>- Tài chính;<br>- Tài sản.</p>',
                                                            cauhoi: '<p>Trong 05 năm vừa qua nhà trường có vi phạm liên quan đến hành chính, tài chính, tài sản không?</p>',
                                                            canthuthap: '<p>Biên bản kiểm tra , kết luận của cơ quan có thẩm quyền có đánh giá về nội dung có liên quan</p>',
                                                            noithuthap: '<p>Hồ sơ nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có kế hoạch ngắn hạn, trung hạn, dài hạn để tạo ra các nguồn tài chính hợp pháp phù hợp với điều kiện nhà trường, thực tế địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Nhà trường có kế hoạch để tạo ra các nguồn tài chính hợp pháp phù hợp với điều kiện nhà trường, thực tế địa phương, cụ thể:<br>- Kế hoạch ngắn hạn;<br>- Kế hoạch trung hạn;<br>- Kế hoạch dài hạn.</p>',
                                                            cauhoi: '<p>Nhà trường có xây dựng các kế hoạch (ngắn hạn , trung dài, dài hạn) để tạo ra các nguồn tài chính hợp pháp phù hợp với điều kiện nhà trường, thực tế địa phương không?</p>',
                                                            canthuthap: '<p>Kế hoạch ngắn hạn, trung hạn, dài hạn</p>',
                                                            noithuthap: '<p>Hồ sơ nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]

                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.7: Quản lý cán bộ, giáo viên và nhân viên',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có kế hoạch bồi dưỡng chuyên môn, nghiệp vụ cho đội ngũ cán bộ quản lý, giáo viên và nhân viên;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường có kế hoạch bồi dưỡng chuyên môn, nghiệp vụ cho đội ngũ cán bộ quản lý, giáo viên và nhân viên;</p>',
                                                            cauhoi: '<p>- Hằng năm nhà trường xây dựng kế hoạch bồi dưỡng chuyên môn, nghiệp vụ cho đội ngũ CBQL, giáo viên, nhân viên như thế nào?</p>',
                                                            canthuthap: '<p>- Kế hoạch bồi dưỡng, phát triển đội ngũ CBQL, giáo viên, nhân viên hằng năm.<br>- Kế hoạch bồi dưỡng chuyên môn theo năm học.</p>',
                                                            noithuthap: '<p>- Hồ sơ nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Phân công, sử dụng cán bộ quản lý, giáo viên, nhân viên rõ ràng, hợp lý, đảm bảo hiệu quả hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Phân công, sử dụng cán bộ quản lý, giáo viên và nhân viên rõ ràng, hợp lý;<br>- Phân công, sử dụng cán bộ quản lý, giáo viên và nhân viên của nhà trường đảm bảo hiệu quả.</p>',
                                                            cauhoi: '<p>Nhà trường có bảng phân công nhiệm vụ của từng thành viên phù hợp với trình độ chuyên môn nghiệp vụ không?<br>-Việc phân công, sử dụng CBQL, giáo viên và nhân viên của nhà trường đảm bảo theo quy định không?<br>- Việc phân công, sử dụng cán bộ quản lý, giáo viên và nhân viên có đảm bảo hiệu quả không?</p>',
                                                            canthuthap: '<p>- Quyết định, bảng phân công nhiệm vụ cán bộ, giáo viên, nhân viên hàng năm.<br>- Báo cáo có nội dung liên quan việc phân công sử dụng CBQL, giáo viên và nhân viên của nhà trường</p>',
                                                            noithuthap: '<p>- Hồ sơ nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Cán bộ quản lý, giáo viên, nhân viên được đảm bảo các quyền theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Cán bộ quản lý, giáo viên và nhân viên được đảm bảo các quyền theo quy định tại khoản1,2,3,4,5 điều 37 của Điều lệ trường mầm non( văn bản hợp nhất số 04/VBHN-BGDĐT ngày 24/12/2015 của Bộ GDĐT.</p>',
                                                            cauhoi: '<p>- CBQL, GV, NV có được đảm bảo các quyền theo quy định gì Điều lệ trường mầm non không?</p>',
                                                            canthuthap: '<p>- Bảng lương của CBGVNV<br>- Báo cáo tổng kết công tác công đoàn của nhà trường hàng năm<br>Báo cáo tổng kết năm học của nhà trường có nội dung liên quan</p>',
                                                            noithuthap: '<p>- Phòng kế toán<br>- Chủ tịch Công đoàn cơ sở</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có biện pháp để phát huy được năng lực của cán bộ quản lý, giáo viên, nhân viên trong việc xây dựng, phát triển và nâng cao chất lượng giáo dục nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Nhà trường có biện pháp phát huy được năng lực của cán bộ quản lý, giáo viên, nhân viên trong việc xây dựng, phát triển và nâng cao chất lượng giáo dục.</p>',
                                                            cauhoi: '<p>- Nhà trường có biện pháp nào để phát huy được năng lực của cán bộ quản lý, giáo viên, nhân viên?<br>- Nhà trường có phát huy được năng lực của cán bộ quản lý, giáo viên, nhân viên không?</p>',
                                                            canthuthap: '<p>- Hồ sơ hội giảng, thao giảng, hội thi, sinh hoạt chuyên đề.<br>- Kế hoạch hoạt động của nhà trường<br>- Báo cáo tổng kết năm học của công đoàn nhà trường.</p>',
                                                            noithuthap: '<p>- Phó Hiệu trưởng, Tổ chuyên môn.<br>- Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.8: Quản lý các hoạt động giáo dục',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Kế hoạch giáo dục phù hợp với quy định hiện hành, điều kiện thực tế địa phương và điều kiện của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Kế hoạch hoạt động giáo dục của nhà trường đảm bảo:<br>- Phù hợp với quy định hiện hành.<br>- Phù hợp với điều kiện thực tế địa phương và điều kiện thực tế của nhà trường.</p>',
                                                            cauhoi: '<p>- Căn cứ vào những nội dung nào nhà trường xây dựng Kế hoạch HĐGD?<br>Xây dựng kế hoạch hoạt động giáo dục của nhà trường có phù hợp với điều kiện thực tế không?</p>',
                                                            canthuthap: '<p>- Kế hoạch hoạt động GD của nhà trường.</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Kế hoạch giáo dục được thực hiện đầy đủ;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường thực hiện đầy đủ kế hoạch hoạt động giáo dục</p>',
                                                            cauhoi: '<p>- Nhà trường có những loại kế hoạch hoạt động giáo dục nào? Có thực hiện đầy đủ không?</p>',
                                                            canthuthap: '<p>- Kế hoạch hoạt động giáo dục của nhà trường.<br>Kế hoạch hoạt động giáo dục của giáo viên dạy các lớp<br>Hồ sơ chuyên môn.<br>- Hồ sơ đánh giá trẻ ở từng độ tuổi.</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Kế hoạch giáo dục được rà soát, đánh giá, điều chỉnh kịp thời.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Định kỳ nhà trường tiến hành rà soát, đánh giá, điều chỉnh kế hoạch hoạt động giáo dục</p>',
                                                            cauhoi: '<p>- Nhà trường có tiến hành rà soát, đánh giá, điểu chỉnh các hoạt động giáo dục không?</p>',
                                                            canthuthap: '<p>- Báo cáo tổng kết năm học.<br>- Biên bản kiểm tra về thực hiện kế hoạch giáo dục có liên quan.<br>- Nghị quyết họp hội đồng nhà trường có nội dung rà soát, đánh giá, điều chỉnh kế hoạch hoạt động giáo dục.<br>- Biên bản sinh hoạt chuyên môn có nội dung liên quan</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp chỉ đạo, kiểm tra, đánh giá của nhà trường đối với các hoạt động nuôi dưỡng, chăm sóc và giáo dục trẻ, được cơ quan quản lý đánh giá đạt hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Các biện pháp chỉ đạo kiểm tra đánh giá của nhà trường đối với các hoạt động nuôi dưỡng, chăm sóc và giáo dục trẻ em được cơ quan quản lý đánh giá đạt hiệu quả</p>',
                                                            cauhoi: '<p>- Nhà trường đã chỉ đạo kiểm tra đánh giá đối với các hoạt động nuôi dưỡng chăm sóc giáo dục trẻ như thế nào?<br>-&nbsp;Hằng năm cơ quan quản lý có kiểm tra đánh giá hoạt động nuôi dưỡng chăm sóc giáo dục trẻ không?</p>',
                                                            canthuthap: '<p>- Kế hoạch giáo dục của nhà trường.<br>- Biên bản kiểm tra của cấp có thẩm quyền.<br>- Báo cáo tổng kết năm học của nhà trường.<br>- Bằng khen, giấy khen, giấy chứng nhận</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.9: Thực hiện quy chế dân chủ cơ sở',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Cán bộ quản lý, giáo viên, nhân viên được tham gia thảo luận, đóng góp ý kiến khi xây dựng kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Cán bộ quản lý, giáo viên, nhân viên được tham gia thảo luận, đóng góp ý kiến khi xây dựng kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường (theo quy định tại Quy chế thực hiện dân chủ trong hoạt động của nhà trường, ban hành kèm theo Quyết định số 04/2000/QĐ-BGDĐT ngày 01/3/2000 của Bộ trưởng Bộ GDĐT).</p>',
                                                            cauhoi: '<p>Cán bộ quản lý giáo viên, nhân viên mạnh dạn đưa ra những đóng góp ý kiến khi xây dựng kế hoạch, nội quy, quy định, quy chếliên quan đến các hoạt động của nhà trường hay không?</p>',
                                                            canthuthap: '<p>Biên bản họp lãnh đạo nhà trường mở rộng<br>Nghị quyết hội nghị cán bộ công chức viên chức</p>',
                                                            noithuthap: '<p>Hiệu Trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Các khiếu nại, tố cáo, kiến nghị, phản ánh (nếu có) thuộc thẩm quyền xử lý của nhà trường được giải quyết đúng pháp luật;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Các khiếu nại, tố cáo, kiến nghị, phản ánh (nếu có) của cán bộ, giáo viên, nhân viên, cha mẹ trẻ em nếu thuộc thẩm quyền xử lý của nhà trường được giải quyết đầy đủ, đúng pháp luật.</p>',
                                                            cauhoi: '<p>Nhà trường có giải quyết những thắc mắc của CBGV và phụ huynh theo đúng pháp luật hay không?</p>',
                                                            canthuthap: '<p>Hồ sơ tiếp công dân<br>Báo cáo tổng kết năm học của nhà trường có nội dung liên quan</p>',
                                                            noithuthap: '<p>Hiệu Trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, có báo cáo thực hiện quy chế dân chủ cơ sở.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hằng năm nhà trường có báo cáo thực hiện quy chế dân chủ cơ sở.</p>',
                                                            cauhoi: '<p>Hằng năm nhà trường có báo cáo thực hiện quy chế dân chủ cơ sở theo đúng thời gian qui định không?</p>',
                                                            canthuthap: '<p>Quy chế dân chủ của nhà trường<br>Báo cáo thực hiện quy chế dân chủ của nhà trường</p>',
                                                            noithuthap: '<p>Hiệu Trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp và cơ chế giám sát việc thực hiện quy chế dân chủ trong nhà trường đảm bảo công khai, minh bạch, hiệu quả. ',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Các biện pháp và cơ chế giám sát việc thực hiện quy chế dân chủ trong nhà trường đảm bảo công khai, minh bạch và hiệu quả.</p>',
                                                            cauhoi: '<p>Nhà trường đưa ra những biện pháp giám sát việc thực hiện quy chế dân chủ như thế nào?Ai là người giám sát? Việc thực hiện như thế nào?<br>Việc giám sát có đảm bảo công khai minh bạch và đạt hiệu quả không?</p>',
                                                            canthuthap: '<p>Bảng công khai các biện pháp và cơ chế giám sát việc thực hiện quy chế dân chủ của nhà trường<br>Báo cáo của ban thanh tra nhân dân, có nội dung liên quan<br>Báo cáo việc thực hiện quy chế dân chủ của nhà trường<br>Báo cáo tổng kết công đoàn có nội dung liên quan</p>',
                                                            noithuthap: '<p>Hồ sơ công đoàn<br>Hồ sơ nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.10: Đảm bảo an ninh trật tự, an toàn trường học',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng, chống tai nạn, thương tích; an toàn phòng, chống cháy, nổ; an toàn phòng, chống thảm họa, thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường; những trường có tổ chức bếp ăn cho trẻ được cấp giấy chứng nhận đủ điều kiện an toàn thực phẩm;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Có phương án đảm bảo an ninh trật tự.<br>- Vệ sinh an toàn thực phẩm;<br>- An toàn phòng, chống tai nạn, thương tích;<br>- An toàn phòng chống cháy, nổ;<br>- An toàn phòng, chống thảm họa, thiên tai;<br>- Phòng, chống dịch bệnh;<br>- Phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường;<br>- Những trường có tổ chức bếp ăn cho trẻ được cấp giấy chứng nhận đủ điều kiện an toàn thực phẩm.</p>',
                                                            cauhoi: '<p>- Nhà trường có xây dựng đầy đủ các phương án đảm bảo an toàn cho trẻ không?<br>- Nhà trường có tổ chức bếp ăn tại trường không? Có được cấp có thẩm quyền cấp giấy chứng nhận đủ điều kiện an toàn thực phẩm không?</p>',
                                                            canthuthap: '<p>- Hồ sơ phương án đảm bảo an ninh trật tự.<br>- Hợp đồng mua bán thực phẩm;<br>- Hồ sơ phương án an toàn phòng, chống tai nạn, thương tích;<br>- Hồ sơ phương án phòng cháy chữa cháy<br>- Hồ sơ phương án phòng, chống thảm họa, thiên tai;<br>- Hồ sơ phương án phòng, chống dịch bệnh;<br>- Hồ sơ phương án phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường;<br>Hồ sơ phòng chống cháy nổ<br>Hồ sơ y tế học đường<br>- Giấy chứng nhận đủ điều kiện an toàn thực phẩm.</p>',
                                                            noithuthap: '<p>- Văn phòng<br>- Y tế tường học.<br>- Hiệu trưởng.<br>- Văn phòng<br>- Văn phòng<br>- Y tế trường học<br>- Văn phòng<br>- Y tế trường học</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có hộp thư góp ý, đường dây nóng và các hình thức khác để tiếp nhận, xử lý các thông tin phản ánh của người dân; đảm bảo an toàn cho cán bộ quản lý, giáo viên, nhân viên và trẻ trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường Có hộp thư góp ý, đường dây nóng và các hình thức khác để tiếp nhận, xử lý các thông tin phản ánh của người dân;<br>- Đảm bảo an toàn cho cán bộ quản lý, giáo viên, nhân viên và trẻ trong nhà trường.</p>',
                                                            cauhoi: '<p>- Nhà trường tiếp nhận và xử lí thông tin như thế nào?<br>Hằng năm cơ quan công an chính quyền có đánh giá nhà trường đảm bảo an toàn cho trẻ em và CB,GV,NV hay không?</p>',
                                                            canthuthap: '<p>- Hộp thư góp ý của nhà trường, số điện thoại của nhà trường.<br>- Biên bản của cơ quan công an, chính quyền địa phương đánh giá việc nhà trường bảo đảm an toàn cho cán bộ quản lý, giáo viên, nhân viên và trẻ trong nhà trường.</p>',
                                                            noithuthap: '<p>- Hình ảnh<br>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Không có hiện tượng kỳ thị, hành vi bạo lực, vi phạm pháp luật về bình đẳng giới trong nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường không có hiện tượng kì thị, hành vi bạo lực, vi phạm pháp lực về bình đẳng giới trong nhà trường.</p>',
                                                            cauhoi: '<p>Nhà trường có hiện tượng kì thị hành vi bạo lực, vi phạm pháp lực về bình đẳng giới không?</p>',
                                                            canthuthap: '<p>- Báo cáo tổng kết năm học của nhà trường.<br>Biên bản, kết luận thông báo của cơ quan công an chính quyền địa phương đánh giá việc nhà trường có hiện tượng kì thị, hành vi bạo lực, vi phạm pháp lực về bình đẳng giới</p>',
                                                            noithuthap: '<p>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Cán bộ quản lý, giáo viên, nhân viên và trẻ được phổ biến, hướng dẫn, thực hiện phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng chống tai nạn, thương tích; an toàn phòng, chống cháy nổ; an toàn phòng, chống thảm họa thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Cán bộ quản lý, giáo viên, nhân viên và trẻ được phổ biến, hướng dẫn thực hiện phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng chống tai nạn, thương tích; an toàn phòng, chống cháy nổ; an toàn phòng, chống thảm họa thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường.</p>',
                                                            cauhoi: '<p>- Nhà trường có thường xuyên kiểm tra thu thập đánh giá xử lý, các thông tin, biểu hiện liên quan đến bạo lực học đường an ninh trật tự không?<br>Nhà trường có biện pháp ngăn chặn bạo lực học đường an ninh trật tự kịp thời không?</p>',
                                                            canthuthap: '<p>- Biên bản triển khai, hướng dẫn thực hiện phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng chống tai nạn, thương tích; an toàn phòng, chống cháy nổ; an toàn phòng, chống thảm họa thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường.<br>- Sổ ghi chép của CBQL, GV, NV có nội dung liên quan<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan</p>',
                                                            noithuthap: '<p>- Y tế trường học</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Nhà trường thường xuyên kiểm tra, thu thập, đánh giá, xử lý các thông tin, biểu hiện liên quan đến bạo lực học đường, an ninh trật tự và có biện pháp ngăn chặn kịp thời, hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Nhà trường thường xuyên kiểm tra, thu thập, đánh giá, xử lí các thông tin, biểu hiện liên quan đến bạo lực học đường, an ninh trật tự và có biện pháp ngăn chặn kịp thời, hiệu quả.</p>',
                                                            cauhoi: '<p>- Việc kiểm tra, đánh giá, xử lí các thông tin có đạt hiểu quả không?</p>',
                                                            canthuthap: '<p>Biên bản xử lý các vụ việc có liên quan<br>Báo cáo tổng kết năm học của nhà trường có nội dung liên quan</p>',
                                                            noithuthap: '<p>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về tiêu chuẩn 1',
                                                    loaichimuc: 5,
                                                }
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 2: Cán bộ quản lý, giáo viên, nhân viên',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.1: Đối với hiệu trưởng, phó hiệu trưởng',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đạt tiêu chuẩn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hiệu trưởng; phó hiệu trưởng đạt các yêu cầu theo quy định tại Điều lệ trường Mầm non</p>',
                                                            cauhoi: '<p>Hiệu trưởng; phó hiệu trưởng đạt các yêu cầu theo quy định tại Điều lệ trường Mầm non không?</p>',
                                                            canthuthap: '<p>- Kết quả đánh giá, xếp loại hiệu trưởng, phó hiệu trưởng hằng năm.<br>- Các hình thức khen thưởng hiệu trưởng, phó hiệu trưởng</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Được đánh giá đạt chuẩn hiệu trưởng trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hiệu trưởng; phó hiệu trưởng được đánh giá đạt chuẩn hiệu trưởng trở lên theo Quy định chuẩn hiệu trưởng</p>',
                                                            cauhoi: '<p>Hiệu trưởng; phó hiệu trưởng được đánh giá đạt chuẩn hiệu trưởng trở lên theo Quy định chuẩn hiệu trưởng không?</p>',
                                                            canthuthap: '<p>- Kết quả đánh giá, xếp loại hiệu trưởng, phó hiệu trưởng hằng năm.<br>- Các hình thức khen thưởng hiệu trưởng, phó hiệu trưởng</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Được bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lý giáo dục theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hiệu trưởng, phó hiệu trưởng được dự các lớp bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lí giáo dục theo quy định</p>',
                                                            cauhoi: '<p>Hiệu trưởng, phó hiệu trưởng được dự các lớp bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lí giáo dục theo quy định không?</p>',
                                                            canthuthap: '<p>- Văn bản triệu tập hiệu trưởng, phó hiệu trưởng tham dự các lớp bồi dưỡng, tập huấn chuyên môn.<br>- Kết quả học tập tại các lớp bồi dưỡng, tập huấn.<br>- Chứng chỉ hoặc chứng nhận đã qua lớp bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lý giáo dục.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 02 năm được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trong 5 năm liên tiếp tính đến thời điểm đánh giá có ít nhất 02 năm được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên theo quy định chuẩn hiệu trưởng</p>',
                                                            cauhoi: '<p>Trong 5 năm liên tiếp tính đến thời điểm đánh giá có ít nhất 02 năm được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên theo quy định chuẩn hiệu trưởng không?</p>',
                                                            canthuthap: '<p>- Kết quả đánh giá, xếp loại hiệu trưởng, phó hiệu trưởng hằng năm.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Được bồi dưỡng, tập huấn về lý luận chính trị theo quy định; được giáo viên, nhân viên trong trường tín nhiệm.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Hiệu trưởng, phó hiệu trưởng nhà trường được bồi dưỡng, tập huấn về lí luận chính trị theo qiu định. Được giáo viên, nhân viên trong trường tín nhiệm</p>',
                                                            cauhoi: '<p>Hiệu trưởng, phó hiệu trưởng nhà trường được bồi dưỡng, tập huấn về lí luận chính trị theo qiu định. Được giáo viên, nhân viên trong trường tín nhiệm không?</p>',
                                                            canthuthap: '<p>- Văn bản triệu tập hiệu trưởng, phó hiệu trưởng tham dự các lớp bồi dưỡng, tập huấn về lí luận chính trị.<br>- Chứng chỉ hoặc chứng nhận đã qua lớp bồi dưỡng, tập huấn về lí luận chính trị.<br>- Biên bản lấy ý kiến của giáo viên, nhân viên góp ý về công tác quản lí giáo dục của nhà trường hằng năm.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trong 05 năm liên tiếp tính đến thời điểm đánh giá, đạt chuẩn hiệu trưởng ở mức khá trở lên, trong đó có ít nhất 01 năm đạt chuẩn hiệu trưởng ở mức tốt.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Trong 5 năm liên tiếp tính đến thời điểm đánh giá, hiệu trưởng, phó hiệu trưởng nhà trường đạt chuẩn ở mức khá trở lên, trong đó có ít nhất 01 năm đạt chuẩn ở mức tốt theo Quy định chuẩn hiệu trưởng.</p>',
                                                            cauhoi: '<p>Trong 5 năm liên tiếp tính đến thời điểm đánh giá, hiệu trưởng, phó hiệu trưởng nhà trường đạt chuẩn ở mức khá trở lên, trong đó có ít nhất 01 năm đạt chuẩn ở mức tốt theo Quy định chuẩn hiệu trưởng không?</p>',
                                                            canthuthap: '<p>- Kết quả đánh giá, xếp loại hiệu trưởng, phó hiệu trưởng hằng năm.<br>- Sổ quản lí cán bộ, giáo viên, nhân viên<br>- Sổ khen thưởng kỉ luật</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.2: Đối với giáo viên',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có đội ngũ giáo viên đủ về số lượng, hợp lý về cơ cấu đảm bảo thực hiện Chương trình giáo dục mầm non theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường có đủ số lượng giáo viên theo quy định tại Thông tư liên tịch số 71/2007/TTLT-BGDĐT-BNV ngày 28/11/2007 của Bộ GDĐT và Bộ Nội vụ về việc Hướng dẫn định mức biên chế sự nghiệp trong các cơ sở giáo dục mầm non công lập.&nbsp;</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Hồ sơ quản lý nhân sự của nhà trường.<br>- Bảng phân công chuyên môn của nhà trường.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) 100% giáo viên đạt chuẩn trình độ đào tạo theo quy định; ',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>100% giáo viên mầm non của nhà trường có bằng tốt nghiệp từ trung cấp sư phạm mầm non trở lên theo quy định tại Điều lệ trường mầm non.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Danh sách giáo viên của nhà trường có thông tin về trình độ đào tạo;</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Có ít nhất 95% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Đến thời điểm tự đánh giá nhà trường có ít nhất 95% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Bảng tổng hợp kết quả đánh giá, xếp loại giáo viên hàng năm;<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 55%; đối với các trường thuộc vùng khó khăn đạt ít nhất 40%; trong 05 năm liên tiếp tính đến thời điểm đánh giá, tỷ lệ giáo viên trên chuẩn trình độ đào tạo được duy trì ổn định và tăng dần theo lộ trình phù hợp;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Tính đến thời điểm tự đánh giá nhà trường có ít nhất 55% giáo viên đạt trên chuẩn trình độ đào tạo; đối với các trường thuộc vùng khó khăn đạt ít nhất 40%.<br>- Trong 05 năm liên tiếp tính đến thời điểm đánh giá, tỷ lệ giáo viên trên chuẩn trình độ đào tạo được duy trì ổn định và tăng dần theo lộ trình phù hợp.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Hồ sơ quản lý nhân sự của nhà trường.<br>- Danh sách giáo viên của nhà trường có thông tin về trình độ đào tạo;<br>- Danh sách giáo viên đạt trên chuẩn về trình độ đào tạo của nhà trường;<br>- Kết quả đánh giá, xếp loại giáo viên hằng năm của nhà trường theo quy định chuẩn nghề nghiệp giáo viên;<br>- Báo cáo tổng kết của nhà trường, công đoàn có nội dung liên quan.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có 100% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên, trong đó có ít nhất 60% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên và ít nhất 50% ở mức khá trở lên đối với trường thuộc vùng khó khăn;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trong 05 năm liên tiếp tính đến thời điểm đánh giá, nhà trường có 100% giáo viên được đánh giá đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên, trong đó:<br>- Đối với các trường thuộc vùng khó khăn có ít nhất 50% giáo viên của trường được đánh giá đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên theo quy định chuẩn nghề nghiệp giáo viên.<br>- Đối với các trường ở các vùng còn lại có ít nhất 60% giáo viên của trường được đánh giá đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên theo quy định chuẩn nghề nghiệp giáo viên</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Hồ sơ quản lý nhân sự của nhà trường.<br>- Danh sách giáo viên của nhà trường có thông tin về trình độ đào tạo;<br>- Danh sách giáo viên đạt trên chuẩn về trình độ đào tạo của nhà trường;<br>- Kết quả đánh giá, xếp loại giáo viên hằng năm của nhà trường theo quy định chuẩn nghề nghiệp giáo viên;<br>- Báo cáo tổng kết của nhà trường, công đoàn có nội dung liên quan.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có giáo viên bị kỷ luật từ hình thức cảnh cáo trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trong 05 năm liên tiếp tính đến thời điểm đánh giá, nhà trường không có giáo viên bị kỷ luật từ hình thức cảnh cáo trở lên.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Kết quả đánh giá, xếp loại giáo viên hằng năm của nhà trường theo quy định chuẩn nghề nghiệp giáo viên;</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 65%, đối với các trường thuộc vùng khó khăn đạt ít nhất 50%;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo của nhà trường.<br>- Đạt ít nhất 60%;<br>- Đối với các trường thuộc vùng khó khăn đạt ít nhất 60%;</p>',
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: '<p>- Hồ sơ quản lý nhân sự của nhà trường.<br>- Danh sách giáo viên của nhà trường có thông tin về trình độ đào tạo;<br>- Kết quả đánh giá, xếp loại giáo viên hằng năm của nhà trường theo quy định chuẩn nghề nghiệp giáo viên;<br>- Báo cáo tổng kết của nhà trường, công đoàn có nội dung liên quan.</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 80% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 30% đạt chuẩn nghề nghiệp giáo viên ở mức tốt; đối với trường thuộc vùng khó khăn có ít nhất 70% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 20% đạt chuẩn nghề nghiệp giáo viên ở mức tốt.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Trong 05 năm liên tiếp tính đến thời điểm đánh giá:<br>- Nhà trường có ít nhất 80% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 30% đạt chuẩn nghề nghiệp giáo viên ở mức tốt.<br>- Đối &nbsp;với trường thuộc vùng khó khăn có ít nhất 70% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 20% đạt chuẩn nghề nghiệp giáo viên ở mức tốt.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Hồ sơ quản lý nhân sự của nhà trường.<br>- Danh sách giáo viên của nhà trường có thông tin về trình độ đào tạo;<br>- Danh sách giáo viên đạt trên chuẩn về trình độ đào tạo của nhà trường;<br>- Kết quả đánh giá, xếp loại giáo viên hằng năm của nhà trường theo quy định chuẩn nghề nghiệp giáo viên;<br>- Báo cáo tổng kết của nhà trường, công đoàn có nội dung liên quan.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.3: Đối với nhân viên',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có nhân viên hoặc giáo viên kiêm nhiệm để đảm nhiệm các nhiệm vụ do hiệu trưởng phân công;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Số lượng nhân viên đáp ứng nhu cầu chăm sóc, giáo dục trẻ của nhà trường.<br>- Trong trường hợp nhà trường không có đủ nhân viên theo quy định, giáo viên có thể kiêm nhiệm công việc thủ quỹ, văn thư;</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Hồ sơ quản lý nhân sự;<br>- Bảng phân công nhiệm vụ cho giáo viên, nhân viên hằng năm;</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Được phân công công việc phù hợp, hợp lý theo năng lực;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhân viên nhà trường được phân công công việc phù hợp với chuyên môn nghiệp vụ, năng lực thực tế của mỗi người.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Danh sách nhân viên của nhà trường có thông tin về trình độ đào tạo và nghiệp vụ<br>- Bảng phân công nhiệm vụ cho giáo viên, nhân viên hằng năm.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Hoàn thành các nhiệm vụ được giao.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhân viên nhà trường hoàn thành các nhiệm vụ được giao</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Bảng tổng hợp kết quả đánh giá, xếp loại nhân viên hằng năm;<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Số lượng và cơ cấu nhân viên đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường có đủ số lượng nhân viên theo quy định tại khoản 3 Điều 4 và khoản 4 Điều 5 Thông tư liên tịch số 06/2015/TTLT-BGDĐT-BNV ngày 16/3/2015 Bộ GDĐT và Bộ Nội vụ, quy định về danh mục khung vị trí việc làm và định mức số lượng người làm việc trong các cơ sở giáo dục mầm non công lập.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Hồ sơ quản lý nhân sự;<br>- Danh sách nhân viên của nhà trường;<br>- Bảng phân công nhiệm vụ cho nhân viên hằng năm;<br>- Danh sách đánh giá xếp loại nhân viên hằng năm;<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có nhân viên bị kỷ luật từ hình thức cảnh cáo trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trong 05 năm liên tiếp tính đến thời điểm đánh giá nhà trường không có nhân viên bị kỷ luật từ hình thức cảnh cáo trở lên.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Các báo cáo của nhà trường có nội dung đánh giá về việc nhà trường không có nhân viên bị kỷ luật từ hình thức cảnh cáo trở lên;</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có trình độ đào tạo đáp ứng được vị trí việc làm;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Hằng năm, được tham gia đầy đủ các lớp tập huấn, bồi dưỡng chuyên môn, nghiệp vụ theo vị trí việc làm.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Nhân viên có trình độ đào tạo đáp ứng được vị trí việc làm:<br>- Nhân viên kế toán, văn thư, y tế và thủ quỹ có bằng tốt nghiệp trung cấp trở lên theo chuyên môn được giao (hoặc có bằng trung cấp trở lên các chuyên các chuyên ngành khác phù hợp với vị trí việc làm và có chứng chỉ bồi dưỡng do cơ quan có thẩm quyền cấp);<br>- Đối với nhân viên nấu ăn, bảo vệ phải được bồi dưỡng về nghiệp vụ được giao.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Hồ sơ quản lý nhân sự của nhà trường;<br>- Danh sách nhân viên của nhà trường có thông tin về trình độ đào tạo và nghiệp vụ;<br>- Văn bản triệu tập nhân viên tham dự các lớp bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ;<br>- Kết quả học tập tại các lớp bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ;<br>- Chứng chỉ hoặc chứng nhận đã qua lớp bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ.<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 2',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 3: Cơ sở vật chất và thiết bị dạy học',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.1: Diện tích, khuôn viên và sân vườn',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Diện tích khu đất xây dựng hoặc diện tích sàn xây dựng bình quân tối thiểu cho một trẻ đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường có diện tích đất xây dựng theo quy định tại điểm b, khoản 2, Điều 5 Nghị định 46/2017/NĐ-CP ngày 21/4/2017 (Diện tích khu đất xây dựng bình quân tối thiểu 12m2 cho một trẻ em đối với khu vực đồng bằng, trung du; 8m2 cho một trẻ em đối với khu vực thành phố, thị xã và núi cao. Đối với nơi khó khăn về đất đai, có thể thay thế diện tích xây dựng bằng diện tích sàn xây dựng và đảm bảo đủ diện tích theo quy định).</p>',
                                                            cauhoi: '<p>- Nhà trường có diện tích đất Xây dưng đúng theo quy định chưa?<br>- Diện tích sàn xây dựng bình quân cho 1 trẻ là bao nhiêu?<br>- Diện tích đất có đảm bảo cho tất cả trẻ hoạt động không?</p>',
                                                            canthuthap: '<p>- Giấy chứng nhận về quyền sử dụng đất của nhà trường (<br>- Sơ đồ tổng thể và từng khu của nhà trường;<br>- Hồ sơ thiết kế xây dựng của nhà trường</p>',
                                                            noithuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường;</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có cổng, biển tên trường, tường hoặc hàng rào bao quanh; khuôn viên đảm bảo vệ sinh, phù hợp cảnh quan, môi trường thân thiện và an toàn cho trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Có khuôn viên, cổng, biển tên trường;<br>- Khuôn viên có tường hoặc hàng rào bao quanh;<br>- Khuôn viên đảm bảo sạch sẽ, phù hợp với cảnh quan, môi trường;<br>- Thân thiện và an toàn cho trẻ em.</p>',
                                                            cauhoi: '<p>- Nhà trường có khuôn viên, cổng, biển tên trường chưa?<br>- Khuôn viên nhà trường có tường rào bao quanh<br>Chưa?<br>- Khuôn viên nhà trường có đảm bảo vệ sinh sạch<br>Sẽ cho trẻ hoạt động?<br>- Môi trường có an toàn và thân thiện cho trẻ ?</p>',
                                                            canthuthap: '<p>- Ảnh chụp toàn cảnh nhà trường;<br>- Ảnh tư liệu</p>',
                                                            noithuthap: '<p>- Văn thư lưu trữ.<br>- Khuôn viên nhà trường.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Có sân chơi, hiên chơi, hành lang của nhóm, lớp; sân chơi chung; sân chơi - cây xanh bố trí phù hợp với điều kiện của nhà trường, an toàn, đảm bảo cho tất cả trẻ được sử dụng.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Có sân chơi, hiên chơi, hành lang của nhóm, lớp;<br>- Sân chơi chung; sân chơi - cây xanh bố trí phù hợp với điều kiện của nhà trường và đảm bảo an toàn cho trẻ em;<br>- Đảm bảo cho tất cả trẻ em được tiếp cận sử dụng.</p>',
                                                            cauhoi: '<p>- Nhà trường có sân chơi, hiên chơi chưa?<br>sân chơi, hiên chơi, hành lang của nhóm, lớp có đảm bảo diện tích theo qui định và có an toàn cho trẻ không?<br>- sân chơi có cây xanh bóng mát cho trẻ hoạt động không?<br>- sân chơi có đảm bảo cho tất cả trẻ hoạt động hay không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường<br>- Sơ đồ tổng thể và từng khu của nhà trường<br>- Ảnh tư liệu</p>',
                                                            noithuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường;<br>- Văn thư lưu trữ.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Diện tích xây dựng công trình và diện tích sân vườn đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Diện tích xây dựng công trình và diện tích sân vườn đảm bảo theo Tiêu chuẩn quốc gia TCVN 3907:2011về yêu cầu thiết kế trường mầm non, cụ thể<br>- Diện tích xây dựng công trình: không lớn hơn 40%;<br>- Diện tích sân vườn (cây xanh, sân chơi, bãi tập): không nhỏ hơn 40%;</p>',
                                                            cauhoi: '<p>Diện tích xây dựng công trình và diện tích sân vườn đảm bảo theo yêu cầu thiết kế trường mầm non chưa?<br>- Diện tích xây dựng công trình có đảm bảo theo qui định hay không?<br>- Diện tích sân vườn (cây xanh, sân chơi, bãi ) chiếm bao nhiêu % so với diện tích xây dựng?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường<br>- Sơ đồ tổng thể và từng khu của nhà trường</p>',
                                                            noithuthap: '<p>- Văn thư lưu trữ.<br>- Kế toán</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Khuôn viên có tường bao ngăn cách với bên ngoài; có sân chơi của nhóm, lớp; có nhiều cây xanh tạo bóng mát sân trường, thường xuyên được chăm sóc, cắt tỉa đẹp; có vườn cây dành riêng cho trẻ chăm sóc, bảo vệ và tạo cơ hội cho trẻ khám phá, học tập;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Khuôn viên có tường bao ngăn cách với bên ngoài;<br>- Có sân chơi của nhóm, lớp;<br>- Có nhiều cây xanh tạo bóng mát sân trường;<br>- Cây xanh thường xuyên được chăm sóc, cắt tỉa đẹp;<br>- Có vườn cây dành riêng cho trẻ em chăm sóc, bảo vệ và tạo cơ hội cho trẻ em khám phá, học tập.</p>',
                                                            cauhoi: '<p>- Khuôn viên nhà trường có tường bao ngăn cách với bên ngoài?<br>-Các nhóm, lớp có sân chơi cho trẻ?.<br>- Trường có nhiều cây xanh tạo bóng mát sân trường?<br>- Cây xanh có được thường xuyên chăm sóc, cắt tỉa?<br>-Nhà trường có vườn cây dành riêng cho trẻ em chăm sóc, bảo vệ chưa?<br>xanh?</p>',
                                                            canthuthap: '<p>- Sơ đồ tổng thể và từng khu của nhà trường;<br>- Ảnh chụp toàn cảnh nhà trường.<br>- Ảnh tư liệu</p>',
                                                            noithuthap: '<p>- Văn thư lưu trữ.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Khu vực trẻ chơi có đủ thiết bị và đồ chơi ngoài trời theo quy định; có rào chắn an toàn ngăn cách với ao, hồ (nếu có).',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Khu vực trẻ em chơi có đủ thiết bị và đồ chơi ngoài trời theo quy định tại Thông tư 32/2012/TT-BGDĐT, ngày 14/9/2012, Ban hành danh mục thiết bị và đồ chơi ngoài trời cho giáo dục mầm non;<br>- Sân vườn thường xuyên sạch sẽ.</p>',
                                                            cauhoi: '<p>- Khu vực trẻ em chơi có những thiết bị và đồ chơi ngoài trời gì?<br>- Những thiết bị và đồ chơi ngoài trời có đúng theo quy định chưa?<br>- Sân vườn nhà trường có sạch sẽ,có rào đảm bảo an toàn cho trẻ ?</p>',
                                                            canthuthap: '<p>- Hồ sơ quản lý tài sản; tài chính<br>- Thống kê danh mục thiết bị đồ chơi ngoài trời của nhà trường;<br>- Biên bản kiểm tra tài sản có nội dung liên quan;<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan;</p>',
                                                            noithuthap: '<p>- Văn thư lưu trữ.<br>- Kế toán</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Sân vườn có khu vực riêng để thực hiện các hoạt động giáo dục phát triển vận động, có đủ các loại thiết bị và đồ chơi ngoài trời theo Danh mục thiết bị và đồ chơi ngoài trời cho giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành và có bổ sung thiết bị đồ chơi ngoài Danh mục phù hợp với thực tế, đảm bảo an toàn cho trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Sân vườn có khu vực riêng để thực hiện các hoạt động giáo dục phát triển vận động;<br>- Có đủ các loại thiết bị và đồ chơi ngoài trời theo Danh mục thiết bị và đồ chơi ngoài trời cho giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành;<br>- Có bổ sung thiết bị đồ chơi ngoài Danh mục phù hợp với thực tế, đảm bảo an toàn cho trẻ em.</p>',
                                                            cauhoi: '<p>Sân vườn của nhà trường có khu vực riêng để thực hiện các hoạt động chưa?<br>- Nhà trường có đủ các loại thiết bị và đồ chơi ngoài trời theo Danh mục thiết bị và đồ chơi ngoài trời chưa?<br>- Nhà trường có kế hoach bổ sung thiết bị và đồ chơi ngoài trời?<br>- Các thiết bị và đồ chơi<br>Có phù hợp với thực tế và đảm bảo an toàn cho trẻ?</p>',
                                                            canthuthap: '<p>- Sơ đồ tổng thể và từng khu của nhà trường;<br>- Hồ sơ quản lý tài sản, tài chính<br>- Thống kê danh mục thiết bị đồ chơi ngoài trời của nhà trường;<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan;</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lý tài sản và CSVC nhà trường.<br>- Kế toán.</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.2: Khối phòng nhóm trẻ, lớp mẫu giáo và khối phòng phục vụ học tập',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Số phòng của các nhóm trẻ, lớp mẫu giáo tương ứng với số nhóm, lớp theo độ tuổi;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Số phòng của các nhóm trẻ, lớp mẫu giáo tương ứng với số nhóm, lớp theo độ tuổi.</p>',
                                                            cauhoi: '<p>- Số phòng học của trường có đáp ứng đủ số lớp theo độ tuổi đang học tại trường hay không?</p>',
                                                            canthuthap: '<p>- Bảng thống kê số trẻ<br>- Danh sách phòng của các lớp tương ứng với số lớp theo độ tuổi.<br>- Sơ đồ tổng thể từng khu của nhà trường</p>',
                                                            noithuthap: '<p>- PHT phụ trách chuyên môn.</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có phòng sinh hoạt chung, phòng ngủ (có thể dùng phòng sinh hoạt chung làm phòng ngủ đối với lớp mẫu giáo); có phòng để tổ chức hoạt động giáo dục thể chất, giáo dục nghệ thuật hoặc phòng đa chức năng, đảm bảo đáp ứng được nhu cầu tối thiểu hoạt động nuôi dưỡng, chăm sóc và giáo dục trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường có phòng sinh hoạt chung, phòng ngủ. Trong trường hợp nhà trường chưa có phòng ngủ riêng cho trẻ em lớp mẫu giáo có thể sử dụng phòng sinh hoạt chung làm phòng ngủ;<br>- Nhà trường có phòng để tổ chức hoạt động giáo dục thể chất, giáo dục nghệ thuật hoặc phòng đa chức năng, đảm bảo đáp ứng được nhu cầu tối thiểu hoạt động nuôi dưỡng, chăm sóc và giáo dục trẻ em.</p>',
                                                            cauhoi: '<p>- Phòng sinh hoạt chung, phòng ngủ được bố trí cho các lớp như thế nào?<br>- Trường có đầy đủ các phòng giáo dục thể chất, giáo dục nghệ thuật hoặc phòng đa chức năng để phục vụ các hoạt động cho trẻ hay chưa?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường.<br>- Hồ sơ quản lý tài sản, tài chính.</p>',
                                                            noithuthap: '<p>- Văn thư.<br>- Kế toán.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Có hệ thống đèn, hệ thống quạt (ở nơi có điện); có tủ đựng hồ sơ, thiết bị dạy học.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường có đầy đủ hệ thống đèn, hệ thống quạt được trang bị ở các phòng (ở nơi có điện);<br>- Có tủ đựng hồ sơ, thiết bị dạy học.</p>',
                                                            cauhoi: '<p>- Hệ thống đèn, quạt được trang bị ở các phòng đầy đủ chưa?<br>- Có tủ đựng hồ sơ, thiết bị dạy học hay không?</p>',
                                                            canthuthap: '<p>- Biên bản tài sản có nội dung liên quan.<br>- Hồ sơ quản lý tài sản, tài chính</p>',
                                                            noithuthap: '<p>- Văn thư.<br>- Kế toán.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phòng sinh hoạt chung, phòng ngủ, phòng giáo dục thể chất, phòng giáo dục nghệ thuật hoặc phòng đa chức năng đảm bảo đạt chuẩn theo quy định; ',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Phòng sinh hoạt chung, phòng ngủ, phòng giáo dục thể chất, phòng giáo dục nghệ thuật hoặc phòng đa chức năng đảm bảo đạt chuẩn theo quy định tại Điều lệ trường mầm non;</p>',
                                                            cauhoi: '<p>- Các phòng sinh hoạt chung, phòng ngủ, phòng thể chất ….có đủ diện tích, sạch sẽ, thoáng mát về mùa hè, ấm áp vào mùa đông và an toàn cho trẻ không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường.<br>- Sơ đồ tổng thể và từng khu vực của nhà trường.</p>',
                                                            noithuthap: '<p>- Kế toán.<br>- Hồ sơ quản lí hiệu trưởng.</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Hệ thống tủ, kệ, giá đựng đồ chơi, đồ dùng, tài liệu đảm bảo đủ theo quy định, được sắp xếp hợp lý, an toàn, thuận tiện khi sử dụng.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Hệ thống tủ, kệ, giá đựng đồ chơi, đồ dùng, tài liệu:<br>- Đảm bảo đầy đủ, theo quy định tại Điều lệ trường mầm non;<br>- Được sắp xếp hợp lý;<br>- An toàn, thuận tiện khi sử dụng.</p>',
                                                            cauhoi: '<p>- Hệ thống tủ, kệ, giá đựng đồ chơi, đồ dùng, tài liệu có đầy đủ, đảm bảo số lượng, kích thước hay không?<br>- Được bố trí, sắp xếp như thế nào?</p>',
                                                            canthuthap: '<p>- Biên bản kiểm tra tài sản có nội dung liên quan.<br>- Hồ sơ quản lý tài sản, tài chính.<br>- Ảnh tư liệu</p>',
                                                            noithuthap: '<p>- Văn thư lưu trữ.<br>- Giáo viên<br>- Kế toán.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có phòng riêng để tổ chức cho trẻ làm quen với ngoại ngữ, tin học và âm nhạc.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Có phòng riêng để tổ chức cho trẻ em làm quen với ngoại ngữ;<br>- Có phòng riêng để tổ chức cho trẻ em làm quen với tin học;<br>- Có phòng riêng để tổ chức cho trẻ em làm quen với âm nhạc.</p>',
                                                            cauhoi: '<p>- Trường có các phòng riêng để trẻ tham gia hoạt động ngoại khóa làm quen với ngoại ngữ, tin học, âm nhạc không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường?<br>- Sơ đồ tổng thể và từng khu vực của nhà trường.<br>- Biên bản tài sản có nội dung liên quan.</p>',
                                                            noithuthap: '<p>- Kế toán.<br>- Văn thư.</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.3: Khối phòng hành chính - quản trị',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có các loại phòng theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Có đủ các loại phòng theo quy định tại Nghị định 46/2017/NĐ-CP ngày 21/4/2017 Quy định về điều kiện đầu tư và hoạt động trong lĩnh vực giáo dục, (bao gồm: Văn phòng trường, phòng hiệu trưởng, phòng phó hiệu trưởng, phòng hành chính quản trị, phòng y tế, phòng bảo vệ, phòng dành cho nhân viên, khu vệ sinh cho giáo viên, cán bộ, nhân viên, khu để xe cho cán bộ, giáo viên, nhân viên).</p>',
                                                            cauhoi: '<p>- Nhà trường có đủ số lượng các loại phòng theo quy định của điều lệ trường mầm non không?</p>',
                                                            canthuthap: '<p>- Hồ sơ quản lý tài sản.<br>- Hồ sơ thiết kế xây dựng.<br>- Sơ đồ tổng thể và từng khu của nhà trường;</p>',
                                                            noithuthap: '<p>- Bộ phận cơ sở vật chất.</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có trang thiết bị tối thiểu tại các phòng;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Các phòng đều có trang thiết bị tối thiểu để làm việc (có máy vi tính và các phương tiện làm việc).</p>',
                                                            cauhoi: '<p>- Các phòng có đầy đủ các trang thiết bị tối thiểu để làm việc hay không ?</p>',
                                                            canthuthap: '<p>- Hồ sơ quản lý tài sản, tài chính<br>- Biên bản kiểm tra có nội dung liên quan;</p>',
                                                            noithuthap: '<p>- Bộ phận cơ sở vật chất.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Khu để xe cho cán bộ quản lý, giáo viên, nhân viên được bố trí hợp lý, đảm bảo an toàn, trật tự.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Khu để xe cho giáo viên, cán bộ, nhân viên được bố trí hợp lý, đảm bảo an toàn, trật tự.</p>',
                                                            cauhoi: '<p>- Nhà trường có khu để xe cho CB-GV-NV hay chưa?<br>- Khu để xe cho giáo viên có bố trí hợp lý và đảm bảo an toàn, trật tự không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường.<br>- Ảnh tư liệu</p>',
                                                            noithuthap: '<p>- Bộ phận cơ sở vật chất.<br>- Khung cảnh nhà xe</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đảm bảo diện tích theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Văn phòng trường, phòng hiệu trưởng, phòng phó hiệu trưởng, phòng hành chính quản trị, phòng y tế, phòng bảo vệ, phòng dành cho nhân viên đảm bảo đủ diện tích theo quy định tại Điều lệ trường mầm non.</p>',
                                                            cauhoi: '<p>- Các loại phòng có đảm bảo diện tích theo quy định tại Điều lệ trường mầm non không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường.</p>',
                                                            noithuthap: '<p>- Bộ phận cơ sở vật chất.</p>' 
                                                        },
                                                        {
                                                            tieude: 'b) Khu để xe cho cán bộ quản lý, giáo viên, nhân viên có mái che đảm bảo an toàn, tiện lợi.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Khu để xe cho cán bộ quản lý, giáo viên, nhân viên có mái che đảm bảo an toàn, tiện lợi.</p>',
                                                            cauhoi: '<p>- Khu để xe cho cán bộ quản lý, giáo viên, nhân viên có mái che đảm bảo an toàn, tiện lợi hay không?</p>',
                                                            canthuthap: '<p>- Ảnh tư liệu</p>',
                                                            noithuthap: '<p>- Bộ phận cơ sở vật chất.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có đủ các phòng, đảm bảo theo Tiêu chuẩn quốc gia về yêu cầu thiết kế trường mầm non.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Các phòng đảm bảo theo Tiêu chuẩn quốc gia TCVN 3907: 2011 về yêu cầu thiết kế trường mầm non.</p>',
                                                            cauhoi: '<p>- Các phòng có đảm bảo theo tiêu chuẩn quốc gia về thiết kế yêu cầu trường MN không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường.<br>- Sơ đồ tổng thể và từng khu của nhà trường;<br>- Ảnh tư liệu</p>',
                                                            noithuthap: '<p>- Bộ phận cơ sở vật chất.<br>- Khung cảnh nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.4: Khối phòng tổ chức ăn',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Bếp ăn được xây dựng kiên cố hoặc bán kiên cố;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Bếp ăn được xây dựng kiên cố hoặc bán kiên cố</p>',
                                                            cauhoi: '<p>Bếp ăn nhà trường được xây dựng kiên cố hay bán kiên cố?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng;<br>- Ảnh tư liệu</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lý tài sản của Hiệu trưởng.<br>- Kiểm tra thực tế bếp ăn</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Kho thực phẩm được phân chia thành khu vực để các loại thực phẩm riêng biệt, đảm bảo các quy định về vệ sinh an toàn thực phẩm;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Kho thực phẩm được phân chia thành khu vực để các loại thực phẩm riêng biệt,<br>- Đảm bảo các quy định về vệ sinh an toàn thực phẩm;</p>',
                                                            cauhoi: '<p>- Kho thực phẩm có phân chia theo từng loại thực phẩm hay không?<br>- Các loại thực phẩm có được lưu trữ theo quy định về vệ sinh an toàn thực phẩm hay không?</p>',
                                                            canthuthap: '<p>- Biên bản kiểm tra của cơ quan y tế có nội dung liên quan;<br>- Giấy chứng nhận cơ sở đảm bảo về vệ sinh an toàn thực phẩm</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lý Phó Hiệu trưởng bán trú;<br>- Kiểm tra thực tế kho lưu trữ</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Có tủ lạnh lưu mẫu thức ăn.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Có tủ lạnh lưu mẫu thức ăn của trẻ em</p>',
                                                            cauhoi: '<p>- Nhà trường có tủ lạnh để lưu mẫu hay không?<br>- Đồ dùng, thiết bị lưu mẫu thực ăn có đúng quy định không?<br>- Phương pháp lưu mẫu thực phẩm có đúng theo quy trình hay không?</p>',
                                                            canthuthap: '<p>- Hồ sơ quản lý bán trú</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lý của Phó Hiệu trưởng bán trú;<br>- Kiểm tra tủ lạnh thực tế</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Bếp ăn đảm bảo theo quy định tại Điều lệ trường mầm non.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Bếp ăn được xây dựng kiên cố hoặc bán kiên cố;<br>- Bếp ăn đảm bảo theo quy định tại Điều 29 Điều lệ trường mầm non (Văn bản hợp nhất 04/VBHN-BGDĐT, ngày 24-12-2015)<br>- Đảm bảo 0,3 -0,35m2 cho một trẻ em. Gôm có khu sơ chế, khu chế biến, khu nấu ăn, khu chia thức ăn; được thiết kế và tổ chức theo dây chuyền hoạt dộng một chiều<br>- Nhà bếp có các thiết bị sau đây:<br>+ Có đầy đủ đồ dùng phục vụ trẻ em ăn bán trú tại trường; có dụng cụ chế biến thực phẩm đảm bảo vệ sinh, an toàn thực phẩm<br>+ Có tủ lạnh để lưu mẫu thực phẩm của trẻ em bán trú; có đủ nước sử dụng,chất lượng nước phải được cơ quan y tế kiểm định<br>+ Đảm bảo việc xử lý các chất thải đúng quy định; đảm bảo yêu cầu phòng chống cháy nổ</p>',
                                                            cauhoi: '<p>- Bếp ăn có đảm bảo diện tích quy định hay không?<br>- Bếp có được thiết kế và tổ chức theo dây chuyền hoạt động bếp 1 chiều hay không?<br>- Nhà bếp có các thiết bị đồ dùng đầy đủ theo quy định hay không?<br>- Nhà trường có tủ lạnh để lưu mẫu thức ăn hay không? Có nguồn nước sạch để sinh hoạt chưa?<br>- Nhà trường có hệ thống xử lí nước thải chưa?<br>- Có kế hoạch phòng chống cháy nổ không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường<br>- Hồ sơ quản lý tài sản, tài chính<br>- Biên bản kiểm tra có nội dung về cơ sở vật chất.<br>- Biên bản kiểm tra của cơ quan y tế có nội dung liên quan<br>&nbsp;</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lý tài sản của Hiệu trưởng hoặc hiệu phó bán trú.<br>- Kiểm tra bếp ăn thực tế</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Bếp ăn đảm bảo theo Tiêu chuẩn quốc gia về yêu cầu thiết kế trường mầm non.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Bếp ăn đảm bảo theo Tiêu chuẩn quốc gia về yêu cầu thiết kế trường mầm non (Quy định tại khoản 1, 2 Mục VI Phần II của Quy chuẩn QCVN 07:2010/BYT):<br>- Thông thoáng, đủ ánh sáng; cửa sổ phải có lưới để chống chuột, ruồi, nhặng, gián hoặc các côn trùng có hại khác;<br>- Tường, trần nhà và sàn nhà phải nhẵn, bằng phẳng, hạn chế các khe rãnh, góc cạnh, gờ dễ bám bụi, chất bẩn, thuận tiện cho việc làm vệ sinh và khử trùng;<br>- Bàn, ghế, dụng cụ, phương tiện phải được làm bằng vật liệu dễ cọ rửa. Có đủ các phương tiện, trang thiết bị phục vụ cho việc làm vệ sinh và khử trùng;<br>- Dụng cụ chứa thức ăn và sử dụng để ăn uống phải được làm bằng vật liệu dễ làm vệ sinh và không thôi nhiễm yếu tố độc hại;<br>- Có phương tiện bảo quản thực phẩm;<br>- Có hệ thống cung cấp nước sạch và chỗ rửa tay với xà phòng hoặc dung dịch sát khuẩn;<br>- Có phương tiện phân loại, thu gom và vận chuyển rác, thực phẩm, thức ăn thừa; các dụng cụ chứa đựng rác phải được làm bằng vật liệu chắc chắn, có nắp đậy và thuận tiện cho việc làm vệ sinh.</p>',
                                                            cauhoi: '<p>- Bếp ăn được xây dựng đúng theo tiêu chuẩn quốc gia chưa?<br>- Nhà bếp có thông thoáng, đủ ánh sáng hay không? Có đảm bảo vệ sinh trong việc chế biến và lưu trữ thức ăn hay không?<br>- Bàn ghế, dụng cụ nhà bếp được làm bằng vật liệu gì, có đảm bảo vệ sinh hay không?<br>- Có phương tiện bảo quản thực phẩm chưa?<br>- Nhà trường có hệ thống nước sạch hay không? Có chỗ rửa tay dưới vòi nước sạch chưa?<br>- Nhà trường có phương tiện thu gom rác rác chưa?</p>',
                                                            canthuthap: '<p>Hồ sơ thiết kế xây dựng của nhà trường;<br>- Hồ sơ quản lý tài sản;tài chính<br>- Biên bản kiểm tra của cơ quan y tế có nội dung liên quan.</p>',
                                                            noithuthap: '<p>- Phòng Hiệu trưởng<br>- Kế toán<br>- Kế toán<br>- Kiểm tra thực tế<br>- Khu vực nhà bếp.<br>- Hợp đồng thu gom rác.</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.5: Thiết bị, đồ dùng, đồ chơi',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có các thiết bị, đồ dùng, đồ chơi đáp ứng yêu cầu tối thiểu phục vụ nuôi dưỡng, chăm sóc và giáo dục trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường có các thiết bị, đồ dùng, đồ chơi đáp ứng yêu cầu tối thiểu phục vụ nuôi dưỡng, chăm sóc và giáo dục trẻ em quy định tại văn bản hợp nhất số 01/VBHN-BGDĐT ngày 23/3/2015 Ban hành danh mục đồ dùng - đồ chơi - thiết bị dạy học tối thiểu dùng cho giáo dục mầm non).</p>',
                                                            cauhoi: '<p>Nhà trường có các thiết bị, đồ dùng, đồ chơi đáp ứng yêu cầu tối thiểu phục vụ nuôi dưỡng, chăm sóc và giáo dục trẻ em theo quy định không?</p>',
                                                            canthuthap: '<p>Kiểm kê tài sản của nhà trường.<br>- Hồ sơ quản lý tài sản; tài chính</p>',
                                                            noithuthap: '<p>Hiệu trưởng,<br>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Các thiết bị, đồ dùng, đồ chơi tự làm hoặc ngoài danh mục quy định phải đảm bảo tính giáo dục, an toàn, phù hợp với trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Các thiết bị, đồ dùng, đồ chơi giáo viên tự làm hoặc nhà trường tự mua ngoài danh mục quy định phải đảm bảo:<br>- Tính giáo dục:<br>- An toàn, phù hợp với trẻ em.</p>',
                                                            cauhoi: '<p>Các thiết bị, đồ dùng, đồ chơi giáo viên tự làm đã đảm bảo tính giáo dục và an toàn cho trẻ hay không?</p>',
                                                            canthuthap: '<p>- Thống kê danh mục thiết bị, đồ dùng, đồ chơi tự làm<br>Biên bản kiểm tra đánh giá của hiệu trưởng, phó hiệu trưởng, tổ trưởng, nhóm trưởng chuyên môn về hiệu quả sử dụng thiết bị đồ dùng đồ chơi.</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lí csvc nhà trường.<br>- Giáo viên</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm các thiết bị được kiểm kê, sửa chữa.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hằng năm các thiết bị được kiểm kê, sửa chữa.</p>',
                                                            cauhoi: '<p>Hằng năm các thiết bị có được kiểm kê và sữa chữa không?</p>',
                                                            canthuthap: '<p>- Bảng thống kê các thiết bị được sửa chữa hằng năm;<br>- Hồ sơ quản lý tài sản; tài chính</p>',
                                                            noithuthap: '<p>- Kế toán</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hệ thống máy tính được kết nối Internet phục vụ công tác quản lý, hoạt động dạy học;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Hệ thống máy tính của nhà trường được kết nối Internet phục vụ công tác quản lý, hoạt động dạy học.</p>',
                                                            cauhoi: '<p>Hệ thống máy tính của nhà trường được kết nối Internet phục vụ công tác quản lý, hoạt động dạy học hay không?</p>',
                                                            canthuthap: '<p>- Hợp đồng kết nối mạng LAN;<br>- Hồ sơ quản lý tài sản; tài chính</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ thiết bị dạy học theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường có đủ các thiết bị dạy học theo quy định tại Điều lệ trường mầm non.</p>',
                                                            cauhoi: '<p>Nhà trường có đủ các thiết bị dạy học theo quy định tại Điều lệ trường mầm non không?</p>',
                                                            canthuthap: '<p>- Hồ sơ quản lý tài sản; tài chính</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, được bổ sung các thiết bị dạy học, thiết bị dạy học tự làm.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Hằng năm nhà trường bổ sung thêm:<br>- Các thiết bị dạy học mở rộng (thiết bị dạy học ngoài danh mục thiết bị dạy học tối thiểu dùng cho giáo dục mầm non quy định tại văn bản hợp nhất số 01/VBHN-BGDĐT ngày 23/3/2015);<br>- Các thiết bị dạy học do giáo viên tự làm.</p>',
                                                            cauhoi: '<p>Hằng năm nhà trường có bổ sung các thiết bị dạy học mở rộng, các thiết bị dạy học do giáo viên tự làm không?</p>',
                                                            canthuthap: '<p>- Sổ theo dõi mua sắm thiết bị của nhà trường;<br>- Biên bản kiểm kê tài sản;<br>- Thống kê danh mục thiết bị dạy học do giáo viên tự làm</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các thiết bị, đồ dùng, đồ chơi tự làm hoặc ngoài danh mục quy định được khai thác và sử dụng hiệu quả, đáp ứng yêu cầu đổi mới nội dung, phương pháp giáo dục, nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Các thiết bị, đồ dùng, đồ chơi tự làm hoặc ngoài danh mục quy định của nhà trường:<br>- Khai thác, sử dụng thường xuyên;<br>- Sử dụng hiệu quả, đáp ứng yêu cầu đổi mới nội dung, phương pháp giáo dục, nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ em.</p>',
                                                            cauhoi: '<p>Các thiết bị, đồ dùng, đồ chơi tự làm có được sử dụng thường xuyên không?</p>',
                                                            canthuthap: '<p>- Thống kê danh mục thiết bị dạy học do giáo viên tự làm.<br>Biên bản kiểm tra đánh giá của hiệu trưởng, phó hiệu trưởng, tổ trưởng, nhóm trưởng chuyên môn về hiệu quả sử dụng thiết bị đồ dùng đồ chơi.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.6: Khu vệ sinh, hệ thống cấp thoát nước ',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phòng vệ sinh cho trẻ, khu vệ sinh cho cán bộ quản lý, giáo viên, nhân viên đảm bảo không ô nhiễm môi trường; phòng vệ sinh đảm bảo sử dụng thuận lợi cho trẻ khuyết tật;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Phòng vệ sinh cho trẻ, khu vệ sinh cho cán bộ quản lý, giáo viên, nhân viên đảm bảo không ô nhiễm môi trường.<br>- Phòng vệ sinh đảm bảo sử dụng thuận lợi cho trẻ khuyết tật.</p>',
                                                            cauhoi: '<p>- Phòng vệ sinh cho trẻ, khu vệ sinh cho cán bộ quản lý, giáo viên, nhân viên có đảm bảo vệ sinhhay không?<br>- Nhà trường có giải pháp gì để hỗ trợ cho trẻ khuyết tật sử dụng nhà vệ sinh thuận lợi không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường<br>- Biên bản kiểm tra của các cơ quan liên quan</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lý xây dựng của hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có hệ thống thoát nước đảm bảo vệ sinh môi trường; hệ thống nước sạch đảm bảo nước uống và nước sinh hoạt cho giáo viên, nhân viên và trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường có hệ thống thoát nước đảm bảo vệ sinh môi trường;<br>- Hệ thống nước sạch đảm bảo nước uống và nước sinh hoạt cho giáo viên, nhân viên và trẻ.</p>',
                                                            cauhoi: '<p>- Nhà trường có hệ thống thoát nước đảm bảo vệ sinh hay không?<br>- Nhà trường có hệ thống nước sạch chưa? có đảm bảo nước uống và nước sinh hoạt cho giáo viên, nhân viên và trẻ không?</p>',
                                                            canthuthap: '<p>- Hợp đồng cung cấp nước sạch;<br>- Hồ sơ tài sản, tài chính.</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lý tài chính của kế toán<br>(các hóa đơn, phiếu chi, các hợp đồng…)<br>- Hồ sơ quản lí của hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Thu gom rác và xử lý chất thải đảm bảo vệ sinh môi trường.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Thu gom rác và xử lý chất thải đảm bảo vệ sinh môi trường.<br>- Có thùng đựng và phân loại rác thải;<br>- Bố trí đủ các phương tiện, dụng cụ có nắp đậy để phân loại, chứa đựng rác tạm thời trong nhà trường; các phương tiện, dụng cụ này phải thuận tiện cho việc làm vệ sinh và khử trùng;<br>- Phải được thu gom hằng ngày và xử lý bằng cách đốt, chôn lấp hợp vệ sinh hoặc được vận chuyển tới nơi xử lý tập trung. Phải tổ chức thu gom, vận chuyển và xử lý theo các quy định hiện hành. Không để rác thải, nước thải tồn đọng trong khu vực trường gây ô nhiễm môi trường.</p>',
                                                            cauhoi: '<p>- Có thùng đựng và phân loại rác thải chưa? Có bố trí đủ ở các nơi tập trung rác trong trường không?<br>- Có biện pháp thu gom và xử lí rác thải hằng ngày không?</p>',
                                                            canthuthap: '<p>- Hợp đồng thu gom, xử lý chất thải<br>- Biên bản kiểm tra có nội dung liên quan.</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lý tài chính của kế toán ( các hóa đơn, phiếu chi, các hợp đồng…)<br>- Hồ sơ quản lí của hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phòng vệ sinh cho trẻ, khu vệ sinh cho cán bộ quản lý, giáo viên, nhân viên thuận tiện, được xây dựng phù hợp với cảnh quan và theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Phòng vệ sinh cho trẻ, khu vệ sinh cho cán bộ quản lý, giáo viên, nhân viên: thuận tiện, được xây dựng phù hợp với cảnh quan và theo quy định:<br>- Đảm bảo 0,4 - 0,6m2 cho một trẻ; đối với trẻ mẫu giáo có chỗ riêng cho trẻ em trai, trẻ em gái. Phòng vệ sinh có các thiết bị sau:<br>- Cho trẻ mẫu giáo:<br>+ Vòi nước rửa tay;<br>+ Chỗ đi tiểu và bệ xí cho trẻ em trai và trẻ em gái;<br>+ Vòi tắm;<br>+ Bể hoặc bồn chứa nước.<br>- Khu vệ sinh cho cán bộ, giáo viên, nhân viên: Có khu vực vệ sinh riêng cho nam và nữ.</p>',
                                                            cauhoi: '<p>- Phòng vệ sinh cho trẻ có chia khu vực nam, nữ hay không?<br>- Vị trí xây dựng có phù hợp với cảnh quan và đảm bảo diện tích, thiết kế theo qui định hay không?<br>- Trang thiết bị có đầy đủ và phù hợp với từng độ tuổi hay không?<br>- Có khu vệ sinh nam , nữ riêng biệt cho cán bộ, giáo viên, nhân viên không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường;<br>- Hồ sơ quản lý tài sản;tài chính.<br>- Sơ đồ tổng thể hoặc từng khu của nhà trường;</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lí của hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Hệ thống cung cấp nước sạch, hệ thống thoát nước, thu gom và xử lý chất thải đáp ứng quy định của Bộ Giáo dục và Đào tạo và Bộ Y tế.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Hệ thống cung cấp nước sạch, hệ thống thoát nước, thu gom và xử lý chất thải đáp ứng quy định của Bộ Giáo dục và Đào tạo và Bộ Y tế được qui định:<br>Sử dụng nguồn nước từ các cơ sở đủ điều kiện cung cấp nước ăn uống và nước sinh hoạt.<br>+ Trường học phải có hệ thống cống rãnh thoát nước mưa, nước thải sinh hoạt, không để nước ứ đọng xung quanh trường lớp; có hệ thống thoát nước riêng cho khu vực nhà bếp, khu vệ sinh;<br>+ Các trường học hợp đồng với các cơ sở đủ điều kiện thu gom, xử lý chất thải, rác thải sinh hoạt;<br>Khu tập trung rác thải phải được bố trí cách biệt với các khu vực khác và có lối ra vào riêng. Khoảng cách không dưới 25m với khu nhà chính và nằm ở cuối chiều gió;<br>Có quy định về việc phân loại, thu gom, vận chuyển và xử lý rác trong cơ sở giáo dục;<br>Yêu cầu vệ sinh về thu gom, xử lý rác thải: Phải được thu gom hằng ngày và xử lý bằng cách đốt, chôn lấp hợp vệ sinh hoặc được vận chuyển tới nơi xử lý tập trung. Không để rác thải, nước thải tồn đọng trong khu vực trường gây ô nhiễm môi trường.</p>',
                                                            cauhoi: '<p>- Nguồn nước nhà trường sử dụng có đảm bảo vệ sinh hay không?<br>- Trường có hệ thống cống rãnh thoát nước không?<br>- Có hệ thống thoát nước riêng cho khu vực nhà bếp, khu vệ sinh không?<br>- Có hợp đồng thu gom rác hay không?<br>Khu tập trung rác thải đặt cách xa trường không?<br>Có quy định về việc phân loại, thu gom, vận chuyển và xử lý rác không?</p>',
                                                            canthuthap: '<p>- Hợp đồng thu gom và vận chuyển rác;<br>- Hợp đồng cung cấp nước sạch;<br>- Hoá đơn thu tiền nước hằng tháng;<br>- Biên bản kiểm tra của các cấp có nội dung liên quan.</p>',
                                                            noithuthap: '<p>- Hồ sơ quản lý tài chính của kế toán ( các hóa đơn, phiếu chi, các hợp đồng…)<br>- Hồ sơ quản lí của hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 3',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 4: Quan hệ giữa nhà trường, gia đình và xã hội',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 4.1: Ban đại diện cha mẹ trẻ',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Được thành lập và hoạt động theo quy định tại Điều lệ Ban đại diện cha mẹ học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Được thành lập và hoạt động theo quy định tại Điều lệ Ban đại diện cha me học sinh (Thông tư số 55/2011/TT-BG ĐT ngày 22/11//2011).</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Quyết định thành lập Ban đại diện cha mẹ trẻ em;<br>- Danh sách Ban đại diện cha mẹ trẻ em của mỗi nhóm, lớp và của nhà trường;</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Có kế hoạch hoạt động theo năm học; ',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Ban đại diện cha mẹ trẻ em phải có kế hoạch hoạt động theo năm học</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Kế hoạch hoạt động của Ban đại diện cha mẹ trẻ em;</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chức thực hiện kế hoạch hoạt động đúng tiến độ.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Ban đại diện cha mẹ trẻ em tổ chức thực hiện kế hoạch hoạt động đúng tiến độ.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Biên bản họp cha mẹ trẻ em;<br>- Báo cáo hoạt động của Ban đại diện cha mẹ trẻ em;<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan;<br>- Biên bản kiểm tra của các cấp có nội dung liên quan</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường trong việc tổ chức thực hiện nhiệm vụ năm học và các hoạt động giáo dục; hướng dẫn, tuyên truyền, phổ biến pháp luật, chủ trương chính sách về giáo dục đối với cha mẹ trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Ban đại diện cha mẹ trẻ em phối hợp có hiệu quả với nhà trường trong việc tổ chức thực hiện nhiệm vụ năm học và các hoạt động giáo dục<br>- Hướng dẫn, tuyên truyền, phổ biến pháp luật, chủ trương chính sách về giáo dục đối với cha mẹ trẻ em;</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Biên bản họp cha mẹ trẻ (biên bản họp chung toàn trường hoặc họp riêng ở từng nhóm. lớp);<br>- Kế hoạch hoạt động của Ban đại diện cha mẹ trẻ em;<br>- Các văn bản, video (nếu có) có nội dung liên quan đến tuyên truyền, phổ biến pháp luật, chủ trương chính về giáo dục đối với cha mẹ trẻ em;</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường, xã hội trong việc thực hiện các nhiệm vụ theo quy định của Điều lệ Ban đại diện cha mẹ học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Ban đại diện cha mẹ trẻ em phối hợp có hiệu quả với nhà trường, xã hội trong việc thực hiện các nhiệm vụ theo quy định của Điều lệ Ban đại diện cha mẹ học sinh</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Biên bản họp giữa ban đại diện cha mẹ trẻ em và nhà trường.<br>- Danh sách các tổ chức, cá nhân hỗ trợ nhà trường về tài chính, cơ sở vật chất.<br>- Báo cáo tổng kết năm học của nhà trường có nội dung đánh giá về hiệu quả hoạt động của cha mẹ trẻ em góp phần nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ em.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 4.2: Công tác tham mưu cấp ủy đảng, chính quyền và phối hợp với các tổ chức, cá nhân của nhà trường',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tham mưu cấp ủy đảng, chính quyền địa phương để thực hiện kế hoạch giáo dục của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường tham mưu với cấp ủy đảng, chính quyền địa phương về kế hoạch và các biện pháp cụ thể để phát triển nhà trường.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>Các văn bản của nhà trường tham mưu với cấp ủy Đảng, chính quyền địa phương, để thực hiện kế hoạch giáo dục, nhằm nâng cao chất lượng giáo dục trẻ em;</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Tuyên truyền nâng cao nhận thức và trách nhiệm của cộng đồng về chủ trương, chính sách của Đảng, Nhà nước, ngành giáo dục, về mục tiêu, nội dung và kế hoạch giáo dục của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Huy động và sử dụng các nguồn lực hợp pháp của các tổ chức, cá nhân đúng quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường tuyên truyền để nâng cao nhận thức và trách nhiệm của cộng đồng về chủ trương, chính sách của Đảng, Nhà nước, ngành giáo dục, về mục tiêu, nội dung &nbsp;và kế hoạch giáo dục của nhà trường bằng nhiều hình thức như:&nbsp;</p><p>- Tuyên truyền thông qua các cuộc họp giữa nhà trường và cha mẹ trẻ;<br>- Tuyên truyền qua loa phóng thanh của địa phương (phường/làng, xã);<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan;</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Nội dung (văn bản, hình ảnh…) về tuyên truyền, nâng cao nhận thức và trách nhiệm của cộng đồng về chủ trương, chính sách của Đảng, Nhà nước, ngành giáo dục, về mục tiêu, nội dung và kế hoạch giáo dục của nhà trường;<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan;</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tham mưu cấp ủy đảng, chính quyền để tạo điều kiện cho nhà trường thực hiện phương hướng, chiến lược xây dựng và phát triển;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Tham mưu cấp ủy đảng, chính quyền để tạo điều kiện cho nhà trường từng bước thực hiện phương hướng, chiến lược xây dựng và phát triển.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Phương hướng, chiến lược xây dựng và phát triển của nhà trường<br>- Các văn bản của nhà trường tham mưu với các cấp ủy Đảng, chính quyền địa phương để tạo điều kiện cho nhà trường từng bước thực hiện phương hướng, chiến lược xây dựng và phát triển.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Phối hợp với các tổ chức, đoàn thể, cá nhân để tổ chức các hoạt động lễ hội, sự kiện theo kế hoạch, phù hợp với truyền thống của địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường phối hợp với các tổ chức, đoàn thể, cá nhân để tổ chức các hoạt động lễ hội, sự kiện theo kế hoạch, phù hợp với truyền thống của địa phương.</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>- Nội dung hoạt động lễ hội, sự kiện;<br>- Các hình ảnh về hoạt động lễ hội, sự kiện;<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Tham mưu cấp ủy Đảng, chính quyền và phối hợp có hiệu quả với các tổ chức, cá nhân xây dựng nhà trường trở thành trung tâm văn hóa, giáo dục của địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Ban đại diện cha mẹ trẻ em tham mưu với cấp ủy Đảng, chính quyền và phối hợp có hiệu quả với các tổ chức, cá nhân xây dựng nhà trường trở thành trung tâm văn hóa, giáo dục của địa phương</p>',
                                                            cauhoi: null,
                                                            canthuthap: '<p>Quyết định công nhận nhà trường (cơ quan đơn vị) đạt danh hiệu đơn vị văn hóa</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 4',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 5: Hoạt động và kết quả nuôi dưỡng, chăm sóc, giáo dục trẻ',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.1: Thực hiện Chương trình giáo dục mầm non ',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức thực hiện Chương trình giáo dục mầm non theo kế hoạch;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường tổ chức thực hiện chương trình giáo dục mầm non theo kế hoạch.</p>',
                                                            cauhoi: '<p>Nhà trường xây dựng Chương trình giáo dục mầm non theo kế hoạch như thế nào?</p>',
                                                            canthuthap: '<p>- Kế hoạch thực hiện nhiệm vụ năm học nhà trường.</p>',
                                                            noithuthap: '<p>P. hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Nhà trường phát triển Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành phù hợp quy định về chuyên môn của cơ quan quản lý giáo dục, với điều kiện nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường phát triển Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành phù hợp với:<br>- Quy định về chuyên môn của cơ quan quản lý giáo dục (Sở, Phòng Giáo dục)<br>- Điều kiện nhà trường.</p>',
                                                            cauhoi: '<p>Có dựa vào Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành hay không?<br>- Chương trình giáo dục mầm có dựa vào quy định chuyên môn của phòng GD&amp;ĐT huyện Đông hòa và điều kiện thực tế nhà trường không?</p>',
                                                            canthuthap: '<p>- Kế hoạch chuyên môn của nhà trường.<br>- Qui chế chuyên môn của nhà trường.<br>- Kế hoạch giáo dục năm học của nhà trường.<br>- Kế hoạch tổ chức hoạt động giáo dục của giáo viên.<br>- Biên bản dự giờ, họp tổ, nhóm chuyên môn.<br>-v Tổng hợp chuyên môn của nhà trường , giáo viên phiếu đánh giá,... bảng tổng hợp.</p>',
                                                            noithuthap: '<p>Hiệu phó chuyên môn<br>-P. Hiệu trưởng<br>-Tổ trưởng chuyên môn, giáo viên.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Định kỳ rà soát, đánh giá việc thực hiện Chương trình giáo dục mầm non và có điều chỉnh kịp thời, phù hợp.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Định kỳ rà soát, đánh giá việc thực hiện Chương trình giáo dục mầm non<br>- Có điều chỉnh kịp thời, phù hợp.</p>',
                                                            cauhoi: '<p>Có tiến hành rà soát đánh giá, điều chỉnh việc thực hiện chương trình GDMN theo định kỳ hay không?</p>',
                                                            canthuthap: '<p>- Báo cáo sơ kết, tổng kết năm học nhà trường.<br>- Báo cáo sơ kết giáo dục mầm non.<br>- Kế hoạch tổ chức hoạt động giáo dục.<br>- Hồ sơ quản lý chuyên môn.<br>- Văn bản, biên bản họp của các tổ chức trong nhà trường có nội dung rà soát, đánh giá việc thực hiện chương trình.<br>- Các báo cáo của nhà trường có nội dung rà soát đánh giá việc thực hiện chương trình.</p>',
                                                            noithuthap: '<p>P.Hiệu trưởng, tổ chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức thực hiện Chương trình giáo dục mầm non đảm bảo chất lượng;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Tổ chức thực hiện Chương trình giáo dục mầm non đảm bảo chất lượng.</p>',
                                                            cauhoi: '<p>Chương trình giáo dục mầm non có đảm bảo chất lượng hay không?</p>',
                                                            canthuthap: '<p>- Kế hoạch thực hiện nhiệm vụ năm học.<br>- Kế hoạch chuyên môn nhà trường.<br>- Kế hoạch tổ chức hoạt động giáo dục.<br>- Báo cáo sơ kết chương trình GDMN nhà trường.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng.</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Nhà trường phát triển Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành, phù hợp với văn hóa địa phương, đáp ứng khả năng và nhu cầu của trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường phát triển Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành:<br>-Phù hợp với văn hóa địa phương.<br>-Đáp ứng khả năng và nhu cầu của trẻ.</p>',
                                                            cauhoi: '<p>- Chương trình giáo dục mầm non nhà trường có phát triển phù hợp với văn hóa địa phương không?<br>- Chương trình giáo dục mầm non nhà trường phát triển đáp ứng khả năng và nhu cầu của trẻ không?<br>&nbsp;</p>',
                                                            canthuthap: '<p>- Kết quả giáo dục của nhà trường.<br>- Các báo cáo, tổng kết của nhà trường có nội dung đánh giá việc thực hiện.<br>- Kế hoạch hằng ngày của giáo viên có ghi chép theo dõi sự phát triển của trẻ em và hoạt động của nhóm lớp, hồ sơ tổ chức bữa ăn cho trẻ em.<br>- Hồ sơ kết quả đánh giá trẻ em.</p>',
                                                            noithuthap: '<p>Hiệu Trưởng, P. Hiệu Trưởng.<br>-Giáo viên.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Nhà trường phát triển Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành trên cơ sở tham khảo chương trình giáo dục của các nước trong khu vực và thế giới đúng quy định, hiệu quả, phù hợp với thực tiễn của trường, địa phương;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường phát triển Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành trên cơ sở tham khảo chương trình giáo dục của các nước trong khu vực và thế giới đúng quy định, hiệu quả.<br>-Chương trình giáo dục phù hợp với thực tiễn của trường, địa phương.</p>',
                                                            cauhoi: '<p>Nhà trường có kế hoạch phát triển Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành không? Có học hỏi và tham khảo<br>chương trình giáo dục của các nước trong khu vực và thế giới đúng<br>quy định,hiệu quả hay không?<br>- Chương trình giáo dục nhà trường có phù hợp với thực tiễn của trường, địa phương không?</p>',
                                                            canthuthap: '<p>- Kế hoạch thực hiện nhiệm vụ năm học nhà trường.<br>- Kế hoạch chuyên môn nhà trường.<br>- Báo cáo tổng kết , sơ kết năm học.<br>- Kế hoạch tổ chức hoạt động giáo dục.<br>- Báo cáo sơ kết chương trình giáo dục mầm non.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Hằng năm, tổng kết, đánh giá việc thực hiện chương trình giáo dục của nhà trường, từ đó điều chỉnh, cải tiến nội dung, phương pháp giáo dục để nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Hằng năm, tổng kết, đánh giá việc thực hiện chương trình giáo dục.<br>-Điều chỉnh, cải tiến nội dung, phương pháp giáo dục để nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ.</p>',
                                                            cauhoi: '<p>- Hằng năm nhà trường có tổng kết, đánh giá việc thực hiện chương trình giáo dục không?<br>- Nhà trường có kế hoạch điều chỉnh, cải tiến nội dung, phương pháp giáo dục để nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ không?</p>',
                                                            canthuthap: '<p>- Chương trình giáo dục của các nước trong khu vực và thế giới đã được nhà trường tham khảo và áp dụng.<br>- Kết quả đánh giá trẻ em.<br>- Các điều kiện đảm bảo thực hiện chương trình, giáo viên được đào tạo theo chuẩn chương trình, điều kiện cơ sở vật chất.<br>- Các báo cáo của nhà trường có nội dung tổng kết, đánh giá việc thực hiện chương trình.</p>',
                                                            noithuthap: '<p>Hiệu trưởng,<br>Phó hiệu trưởng.</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.2: Tổ chức hoạt động nuôi dưỡng, chăm sóc và giáo dục trẻ',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Thực hiện linh hoạt các phương pháp, đảm bảo phù hợp với mục tiêu, nội dung giáo dục, phù hợp với trẻ mầm non và điều kiện nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Thực hiện linh hoạt các phương pháp:<br>- Đảm bảo phù hợp với mục tiêu, nội dung giáo dục,<br>- Phù hợp với trẻ mầm non và điều kiện nhà trường.</p>',
                                                            cauhoi: '<p>- Kế hoạch giáo dục đã phù hợp với mục tiêu, trẻ mầm non và điều kiện thực tế nhà trường chưa?<br>- Báo cáo tổng kết năm học đã đánh giá đúng thực trạng của nhà trường chưa?</p>',
                                                            canthuthap: '<p>- Kế hoạch thực hiện nhiệm vụ năm học nhà trường.<br>- Kế hoạch chuyên môn của nhà trường.<br>- Kế hoạch tổ chức hoạt động giáo dục của giáo viên.<br>- Báo cáo tổng kết năm học của nhà trường.</p>',
                                                            noithuthap: '<p>P. Hiệu trưởng, Giáo viên</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chức môi trường giáo dục theo hướng tạo điều kiện cho trẻ được vui chơi, trải nghiệm;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Tổ chức môi trường giáo dục theo hướng tạo điều kiện cho trẻ được vui chơi, trải nghiệm.</p>',
                                                            cauhoi: '<p>- Có thường xuyên tổ chức cho trẻ được vui chơi trải nghiệm thực tế không?</p>',
                                                            canthuthap: '<p>- Kế hoạch giáo dục tổ chức môi trường theo hướng tạo điều kiện cho trẻ được vui chơi, trải nghiệm.<br>- Hình ảnh tổ chức môi trường cho trẻ trải nghiệm vui chơi.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng<br>Chuyên môn, văn thư lưu trữ.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chức các hoạt động giáo dục bằng nhiều hình thức đa dạng phù hợp với độ tuổi của trẻ và điều kiện thực tế.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Tổ chức các hoạt động giáo dục bằng nhiều hình thức đa dạng phù hợp với độ tuổi của trẻ và điều kiện thực tế.</p>',
                                                            cauhoi: '<p>- Những hoạt động giáo dục có được thường xuyên tổ chức một cách đa dạng, phù hợp với độ tuổi hoặc điều kiện thực tế hay không?</p>',
                                                            canthuthap: '<p>- Kế hoạch tổ chức hoạt động giáo dục của giáo viên.<br>- Kế hoạch tổ chức các hoạt động lễ hội, tham quan, giã ngoại…<br>- Hình ảnh về các hoạt động và kết quả sản phẩm của trẻ qua các hoạt động.<br>- Báo cáo tổng kết năm học của nhà trường có nội dung liên quan.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng.<br>Thư viện ảnh nhà trường.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Tổ chức các hoạt động thực hành, trải nghiệm, khám phá môi trường xung quanh phù hợp với nhu cầu, hứng thú của trẻ và điều kiện thực tế.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Tổ chức các hoạt động thực hành, trải nghiệm, khám phá môi trường xung quanh phù hợp với nhu cầu, hứng thú của trẻ và điều kiện thực tế.</p>',
                                                            cauhoi: '<p>- Việc lập kế hoạch tổ chức cho trẻ được trải nghiệm khám phá môi trường xung quanh có phù hợp với nhu cầu hứng thú của trẻ và điều kiện thực tế nhà trường hay không?</p>',
                                                            canthuthap: '<p>- Kế hoạch năm, tháng, tuần của trường, nhóm, lớp.<br>- Hình ảnh về các hoạt động và kết quả sản phẩm của trẻ.</p>',
                                                            noithuthap: '<p>P.hiệu trưởng, giáo viên.<br>Hình ảnh lưu trữ văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Tổ chức môi trường giáo dục trong và ngoài lớp học phù hợp với nhu cầu, khả năng của trẻ, kích thích hứng thú, tạo cơ hội cho trẻ tham gia hoạt động vui chơi, trải nghiệm theo phương châm “chơi mà học, học bằng chơi”.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Tổ chức môi trường giáo dục trong và ngoài lớp học phù hợp:<br>- Nhu cầu, khả năng của trẻ em,<br>- Kích thích hứng thú,<br>- Tạo cơ hội cho trẻ tham gia hoạt động vui chơi, trải nghiệm theo phương châm “chơi mà học, học bằng chơi”.</p>',
                                                            cauhoi: '<p>- Các kế hoạch giáo dục có phù hợp với nhu cầu và khả năng của trẻ theo độ tuổi chưa?<br>- Nội dung các kế hoạch của hội thi có phù hợp và phát huy được tính tích cực sáng tạo và tạo cơ hội cho trẻ được khám phá trải nghiệm hay không?</p>',
                                                            canthuthap: '<p>- Kế hoạch thực hiện nhiệm vụ năm học.<br>- Kế hoạch chuyên môn của nhà trường.<br>- Kế hoạch tổ chức hoạt động giáo dục.<br>- Báo cáo tổng kết năm học nhà trường.<br>- Hình ảnh, sản phẩm hoạt động của trẻ.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng, Giáo viên.</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.3: Kết quả nuôi dưỡng và chăm sóc sức khỏe ',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Nhà trường phối hợp với cơ sở y tế địa phương tổ chức các hoạt động chăm sóc sức khỏe cho trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường phối hợp với cơ sở y tế địa phương tổ chức các hoạt động chăm sóc sức khỏe cho trẻ</p>',
                                                            cauhoi: '<p>Nhà trường phối hợp với cơ sở y tế để tổ chức các hoạt động chăm sóc sức khỏe cho trẻ như thế nào?</p>',
                                                            canthuthap: '<p>- Kế hoạch phối hợp Nhà trường và cơ sở y tế địa phương bảo vệ và chăm sóc sức khỏe cho trẻ.<br>- Hợp đồng CSSK giữa Nhà trường và trạm y tế xã</p>',
                                                            noithuthap: '<p>- Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) 100% trẻ được kiểm tra sức khỏe, đo chiều cao, cân nặng, đánh giá tình trạng dinh dưỡng bằng biểu đồ tăng trưởng theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>100% trẻ được kiểm tra sức khỏe, đo chiều cao, cân nặng, đánh giá tình trạng dinh dưỡng bằng biểu đồ tăng trưởng theo quy định</p>',
                                                            cauhoi: '<p>Có bao nhiêu trẻ theo học ở trường được kiểm tra sức khỏe, cân đo đánh giá bằng biểu đồ tăng trưởng theo quy định?</p>',
                                                            canthuthap: '<p>- Bảng tổng hợp kết quả cân, đo, khám sức khỏe định kỳ cho trẻ<br>- Sổ theo dõi sức khỏe của trẻ.<br>- Sổ tổng hợp cân, đo các lớp</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>- Giáo viên<br>- Giáo viên</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Ít nhất 80% trẻ suy dinh dưỡng, thừa cân, béo phì được can thiệp bằng những biện pháp phù hợp, tình trạng dinh dưỡng của trẻ cải thiện so với đầu năm học.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Ít nhất 80% trẻ em suy dinh dưỡng, thừa cân béo ph́ được can thiệp bằng các biện pháp phù hợp<br>- Tình trạng dinh dưỡng của trẻ em được cải thiện so với đầu năm học</p>',
                                                            cauhoi: '<p>- Nhà trường có kế hoạch, biện pháp ǵ để can thiệp trẻ em suy dinh dưỡng, thừa cân béo phì ở trường hay không?<br>- Bao nhiêu trẻ suy dinh dưỡng, thừa cân béo phì được can thiệp bằng những biện pháp phù hợp? Kết quả can thiệp?</p>',
                                                            canthuthap: '<p>- Kế hoạch chăm sóc, giáo dục trẻ suy dinh dưỡng, thừa cân, béo phì.<br>- Bảng tổng hợp kết quả cân, đo, khám sức khỏe định kỳ.<br>- Sổ theo dõi sức khỏe của trẻ.<br>- Báo cáo tổng kết có nội dung liên quan.</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>- Phó hiệu trưởng<br>- Giáo viên<br>- Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Nhà trường tổ chức tư vấn cho cha mẹ trẻ hoặc người giám hộ về các vấn đề liên quan đến sức khỏe, phát triển thể chất và tinh thần của trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường tổ chức tư vấn cho cha mẹ trẻ, hoặc người giám hộ về các vấn đề liên quan tới sức khỏe, phát triển thể chất và tinh thần của trẻ</p>',
                                                            cauhoi: '<p>- Nhà trường có tổ chức tư vấn cho cha mẹ trẻ về vấn đề CSSK cho trẻ không?<br>- Nội dung truyền thông như thế nào?</p>',
                                                            canthuthap: '<p>- Kế hoạch truyền thông cho cha mẹ CSSK của trẻ<br>- Danh sách phụ huynh tham dự<br>- Biên bản họp phụ huynh tuyên truyền CSSK của trẻ<br>- Bảng quyết toán kinh phí tổ chức truyền thông</p>',
                                                            noithuthap: '<p>- Hiệu trưởng (hồ sơ tuyên truyền;<br>- Ban đại diện CMHS<br>- Phó Hiệu trưởng<br>- Kế toán</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Chế độ dinh dưỡng của trẻ tại trường được đảm bảo cân đối, đáp ứng nhu cầu dinh dưỡng, đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Chế độ dinh dưỡng của trẻ em tại trường được đảm bảo cân đối, đáp ứng nhu cầu dinh dưỡng, đảm bảo theo quy định tại QĐ số 77/QĐ-BGDĐT ngày 14/3/2017 như sau:<br>- Xây dựng chế độ ăn, khẩu phần ăn phù hợp với độ tuổi<br>- Số bữa ăn tại cơ sở giáo dục mầm non 1 bữa chính, 1 bữa phụ<br>- Nước uống: khoảng 1,6-2 lít/ trẻ em/ ngày<br>- Xây dựng thực đơn hằng ngày, theo tuần, theo mùa</p>',
                                                            cauhoi: '<p>- Nhà trường xây dựng dựng thực đơn, tính khẩu phần dinh dưỡng cho trẻ đảm bảo chưa?<br>- Nhà trường tổ chức bao nhiêu bữa ăn/ngày?<br>- Trẻ được cung cấp đủ lượng nước/ ngày không?<br>- Trường xây dựng thực đơn có phối hợp theo tuần, theo mùa không?</p>',
                                                            canthuthap: '<p>- Bảng tổng hợp thực đơn theo ngày<br>- Sổ tổng hợp thực phẩm hàng tháng<br>- Bảng cân đối dinh dưỡng<br>- Thư viện thực đơn<br>- Bảng công khai thực đơn<br>- Hợp đồng cung cấp thực phẩm<br>- Hợp đồng nước uống<br>- Báo cáo tổng kết có nội dung liên quan</p>',
                                                            noithuthap: '<p>- Kế toán</p>'
                                                        },
                                                        {
                                                            tieude: 'c) 100% trẻ suy dinh dưỡng, thừa cân, béo phì được can thiệp bằng những biện pháp phù hợp, tình trạng dinh dưỡng của trẻ cải thiện so với đầu năm học.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- 100% trẻ suy dinh dưỡng, thừa cân, béo phì được can thiệp bằng những biện pháp phù hợp.<br>- Tình trạng dinh dưỡng trẻ em cải thiện so với đầu năm</p>',
                                                            cauhoi: '<p>- Bao nhiêu trẻ suy dinh dưỡng, thừa cân béo phì được can thiệp bằng những biện pháp phù hợp? Kết quả can thiệp?</p>',
                                                            canthuthap: '<p>- Kế hoạch chăm sóc, giáo dục trẻ suy dinh dưỡng, thừa cân, béo phì<br>- Bảng tổng hợp kết quả cân, đo, khám sức khỏe định kỳ<br>- Sổ theo dõi sức khỏe của trẻ<br>- Sổ tổng hợp cân, đo các lớp<br>- Báo cáo tổng kết có nội dung liên quan</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>- Phó hiệu trưởng<br>- Giáo viên<br>- Giáo viên<br>- Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có ít nhất 95% trẻ khỏe mạnh, chiều cao, cân nặng phát triển bình thường.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Có ít nhất 95% trẻ em khỏe mạnh, chiều cao, cân nặng phát triển bình thường</p>',
                                                            cauhoi: '<p>Có bao nhiêu trẻ trong trường khỏe mạnh, chiều cao, cân nặng phát triển bình thường?</p>',
                                                            canthuthap: '<p>- Bảng tổng hợp kết quả cân, đo, khám sức khỏe định kỳ<br>- Sổ theo dõi sức khỏe của trẻ<br>- Báo cáo tổng kết</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>- Giáo viên<br>- Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.4: Kết quả giáo dục',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ chuyên cần đạt ít nhất 90% đối với trẻ 5 tuổi, 85% đối với trẻ dưới 5 tuổi; trường thuộc vùng khó khăn đạt ít nhất 85% đối với trẻ 5 tuổi, 80% đối với trẻ dưới 5 tuổi;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Tỷ lệ chuyên cần đạt ít nhất 90% đối với trẻ 5 tuổi, 85% đối với trẻ dưới 5 tuổi; trường thuộc vùng khó khăn đạt ít nhất 85% đối với trẻ 5 tuổi, 80% đối với trẻ dưới 5 tuổi</p>',
                                                            cauhoi: '<p>- Tỷ lệ chuyên cần trẻ 5 tuổi trong trường đạt bao nhiêu?<br>- Tỷ lệ chuyên cần trẻ dưới 5 tuổi trong trường đạt bao nhiêu?</p>',
                                                            canthuthap: '<p>- Bảng tổng hợp tỷ lệ chuyên cần của trẻ<br>- Sổ theo dõi trẻ em</p>',
                                                            noithuthap: '<p>- P.hiệu trưởng.<br>- Giáo viên</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ trẻ 5 tuổi hoàn thành Chương trình giáo dục mầm non đạt ít nhất 85%; trường thuộc vùng khó khăn đạt ít nhất 80%;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Tỷ lệ trẻ 5 tuổi hoàn thành chương trình GDMN đạt ít nhất 85%; trường thuộc vùng khó khăn đạt ít nhất 80%.</p>',
                                                            cauhoi: '<p>- Tỷ lệ trẻ 5 tuổi hoàn thành chương trình GDMN đạt bao nhiêu %?</p>',
                                                            canthuthap: '<p>- Hồ sơ phổ cập<br>- Danh sách trẻ 5 tuổi hoàn thành chương trình giáo dục MN.<br>- Sổ tổng hợp đánh giá cuối độ tuổi của trẻ.</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng.<br>- Phó hiệu trưởng.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Trẻ khuyết tật học hòa nhập, trẻ có hoàn cảnh khó khăn được nhà trường quan tâm giáo dục theo kế hoạch giáo dục cá nhân.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Hoạt động nuôi dưỡng và chăm sóc sức khỏe trẻ em khuyết tật học hòa nhập được thực hiện theo kế hoạch giáo dục cá nhân, áp dụng theo thông tư 03/2018/TT-GDĐT, ngày 29/01/2018 Quy định về giáo dục hòa nhập đối với người khuyết tật<br>- Trẻ em có hoàn cảnh khó khăn được nhà trường quan tâm giáo dục theo kế hoạch giáo dục cá nhân</p>',
                                                            cauhoi: '<p>- Trong năm học 2018-2019 trường có trẻ em khuyết tật học hòa nhập không?<br>- Nhà trường xây dựng kế hoạch can thiệp trẻ khuyết tật học hòa nhập, trẻ có hoàn cảnh khó khăn như thế nào?<br>- Giáo viên xây dựng kế hoạch giáo dục cá nhân cho trẻ khuyết tật học hòa nhập, trẻ có hoàn cảnh khó khăn như thế nào?</p>',
                                                            canthuthap: '<p>- Kế hoạch can thiệp trẻ khuyết tật học hòa nhập (nếu có).<br>- Kế hoạch giúp đỡ trẻ có hoàn cảnh khó khăn(nếu có).<br>- Kế hoạch giáo dục cá nhân dành cho trẻ khuyết tật học hòa nhập. (nếu có).<br>- Danh sách CB,GV,NV giúp đỡ, nhận đỡ đầu học sinh.<br>- Báo cáo kết quả giúp đỡ trẻ có hoàn cảnh khó khăn của nhà trường</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng.<br>- Công đoàn.<br>- Giáo viên.<br>- Công đoàn.<br>- Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ chuyên cần đạt ít nhất 95% đối với trẻ 5 tuổi, 90% đối với trẻ dưới 5 tuổi; trường thuộc vùng khó khăn đạt ít nhất 90% đối với trẻ 5 tuổi, 85% đối với trẻ dưới 5 tuổi;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Tỷ lệ chuyên cần đạt ít nhất 95% đối với trẻ 5 tuổi, 90% đối với trẻ dưới 5 tuổi; trường thuộc vùng khó khăn đạt ít nhất 90% đối với trẻ 5 tuổi, 85% đối với trẻ dưới 5 tuổi</p>',
                                                            cauhoi: '<p>- Tỷ lệ chuyên cần trẻ 5 tuổi trong trường đạt bao nhiêu?<br>- Tỷ lệ chuyên cần trẻ dưới 5 tuổi trong trường đạt bao nhiêu?</p>',
                                                            canthuthap: '<p>- Bảng tổng hợp tỷ lệ chuyên cần của trẻ<br>- Sổ theo dõi trẻ em</p>',
                                                            noithuthap: '<p>- P hiệu trưởng.<br>- Giáo viên</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ trẻ 5 tuổi hoàn thành Chương trình giáo dục mầm non đạt ít nhất 95%; trường thuộc vùng khó khăn đạt ít nhất 90%;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Tỷ lệ trẻ 5 tuổi hoàn thành chương trình GDMN đạt ít nhất 95%; trường thuộc vùng khó khăn đạt ít nhất 90%.</p>',
                                                            cauhoi: '<p>- Tỷ lệ trẻ 5 tuổi hoàn thành chương trình GDMN đạt bao nhiêu %?</p>',
                                                            canthuthap: '<p>- Hồ sơ phổ cập giáo dục mầm non cho trẻ 5 tuổi.<br>- Danh sách trẻ 5 tuổi hoàn thành chương trình giáo dục MN.<br>- Sổ tổng hợp đánh giá cuối độ tuổi của trẻ</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Trẻ khuyết tật học hòa nhập (nếu có) được đánh giá có tiến bộ đạt ít nhất 80%.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trẻ khuyết tật học hòa nhập (nếu có) được đánh giá có tiến bộ đạt ít nhất 80%.</p>',
                                                            cauhoi: '<p>- Trẻ khuyết tật học hòa nhập được đánh giá như thé nào?<br>- Giáo viên có phối hợp với gia đình theo dõi sự tiến bộ của trẻ chưa?</p>',
                                                            canthuthap: '<p>- Hồ sơ chăm sóc trẻ em khuyết tật học hòa nhập(nếu có).<br>- Kế hoạch giáo dục cá nhân của trẻ em khuyết tật được phê duyệt(nếu có).<br>- Ghi chép sự tiến bộ của trẻ em, có nội dung thông tin phối hợp với gia đình(nếu có).<br>- Báo cáo của nhà trường có đánh giá về sự tiến bộ của trẻ khuyết tật(nếu có).</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>- Giáo viên<br>- Giáo viên<br>- Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ trẻ 5 tuổi hoàn thành Chương trình giáo dục mầm non đạt ít nhất 97%; trường thuộc vùng khó khăn đạt ít nhất 95%;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Tỷ lệ trẻ 5 tuổi hoàn thành chương trình GDMN đạt ít nhất 97%; trường thuộc vùng khó khăn đạt ít nhất 95%</p>',
                                                            cauhoi: '<p>Tỷ lệ trẻ 5 hoàn thành chương trình GDMN có đạt theo quy định chưa?</p>',
                                                            canthuthap: '<p>- Hồ sơ phổ cập giáo dục mầm non cho trẻ 5 tuổi.<br>- Danh sách trẻ 5 tuổi hoàn thành chương trình giáo dục MN.<br>- Sổ tổng hợp đánh giá cuối độ tuổi của trẻ</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Trẻ khuyết tật học hòa nhập (nếu có) được đánh giá có tiến bộ đạt ít nhất 85%.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Trẻ khuyết tật học hòa nhập (nếu có) được đánh giá có tiến bộ đạt ít nhất 85%</p>',
                                                            cauhoi: '<p>- Trẻ khuyết tật học hòa nhập được đánh giá như thế nào?<br>- Giáo viên có phối hợp với gia đình theo dõi sự tiến bộ của trẻ chưa?</p>',
                                                            canthuthap: '<p>- Báo cáo của nhà trường có đánh giá về sự tiến bộ của trẻ khuyết tật(nếu có).<br>- Kế hoạch giáo dục cá nhân của trẻ em khuyết tật được phê duyệt (nếu có).<br>- Ghi chép sự tiến bộ của trẻ em, có nội dung thông tin phối hợp với gia đình (nếu có).</p>',
                                                            noithuthap: '<p>- Hiệu trưởng<br>- Giáo viên<br>- Giáo viên</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 5',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    tenchimuc: 'III. KẾT LUẬN CHUNG',
                    loaichimuc: 1
                }
            ]
        case 2:
            return [
                {
                    tenchimuc: 'NỘI DUNG',
                    loaichimuc: 0,
                    isHideTitle: 1,
                    children: [
                        {
                            tenchimuc: 'MỤC LỤC',
                            loaichimuc: 6,
                            isCenterTitle: 1,
                            isDropLine: 1,
                            columns: [
                                {
                                    title: 'NỘI DUNG',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Trang',
                                    dataIndex: 'col1'
                                }
                            ],
                            rows: [
                                {
                                    name: 'Mục lục',
                                    col1: ' '
                                },
                                {
                                    name: 'Danh mục các chữ viết tắt',
                                    col1: ' '
                                },
                                {
                                    name: 'Bảng tổng hợp kết quả tự đánh giá',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần I. CƠ SỞ DỮ LIỆU',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần II. TỰ ĐÁNH GIÁ',
                                    col1: ' '
                                },
                                {
                                    name: 'A. ĐẶT VẤN ĐỀ',
                                    col1: ' '
                                },
                                {
                                    name: 'B. TỰ ĐÁNH GIÁ',
                                    col1: ' '
                                },
                                {
                                    name: 'I. Tự đánh giá Mức 1, Mức 2, Mức 3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 1. Tổ chức và quản lý nhà trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.1: Phương hướng, chiến lược xây dựng và phát triển nhà trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.2: Hội đồng trường (Hội đồng quản trị đối với trường tư thục) và các hội đồng khác',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.3: Tổ chức Đảng Cộng sản Việt Nam, các đoàn thể và tổ chức khác trong nhà trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.4: Hiệu trưởng, phó hiệu trưởng, tổ chuyên môn và tổ văn phòng',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.5: Khối lớp và tổ chức lớp học',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.6: Quản lý hành chính, tài chính và tài sản',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.7: Quản lý cán bộ, giáo viên và nhân viên',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.8: Quản lý các hoạt động giáo dục',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.9: Thực hiện quy chế dân chủ cơ sở',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.10: Đảm bảo an ninh trật tự, an toàn trường học',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 2: Cán bộ quản lý, giáo viên, nhân viên và học sinh',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.1: Đối với hiệu trưởng, phó hiệu trưởng',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.2: Đối với giáo viên',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.3: Đối với nhân viên',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.4: Đối với học sinh',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 3: Cơ sở vật chất và thiết bị dạy học',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.1: Khuôn viên, sân chơi, sân tập',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.2: Phòng học',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.3: Khối phòng phục vụ học tập và khối phòng hành chính - quản trị',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.4: Khu vệ sinh, hệ thống cấp thoát nước',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.5: Thiết bị',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.6: Thư viện',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 4: Quan hệ giữa nhà trường, gia đình và xã hội',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 4.1: Ban đại diện cha mẹ học sinh',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 4.2: Công tác tham mưu cấp ủy Đảng, chính quyền và phối hợp với các tổ chức, cá nhân của nhà trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 5: Hoạt động giáo dục và kết quả giáo dục',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.1: Kế hoạch giáo dục của nhà trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.2: Thực hiện Chương trình giáo dục phổ thông cấp tiểu học',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.3: Thực hiện các hoạt động giáo dục khác',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.4: Công tác phổ cập giáo dục tiểu học',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.5: Kết quả giáo dục',
                                    col1: ' '
                                },
                                {
                                    name: 'III. KẾT LUẬN CHUNG',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần III. PHỤ LỤC',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần IV. PHỤ LỤC ',
                                    col1: ' '
                                },
                                {
                                    name: 'DANH MỤC MÃ MINH CHỨNG',
                                    col1: ' '
                                },
                            ]
                        },
                        {
                            tenchimuc: 'DANH MỤC CÁC CHỮ VIẾT TẮT',
                            loaichimuc: 6,
                            isCenterTitle: 1,
                            isDropLine: 1,
                            columns: [
                                {
                                    title: 'Chữ viết tắt',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Nội dung viết tắt',
                                    dataIndex: 'col1'
                                }
                            ],
                            rows: [
                                {
                                    name: 'ATGT',
                                    col1: 'An toàn giao thông',
                                },
                                {
                                    name: 'BĐD CMHS',
                                    col1: 'Ban đại diện Cha mẹ học sinh',
                                },
                                {
                                    name: 'CB,CC,VC,NLĐ',
                                    col1: 'Cán bộ, công chức, viên chức, NLĐ',
                                },
                                {
                                    name: 'CBQL',
                                    col1: 'Cán bộ quản lí',
                                },
                                {
                                    name: 'CLGD',
                                    col1: 'Chất lượng giáo dục',
                                },
                                {
                                    name: 'GDĐT',
                                    col1: 'Giáo dục đào tạo',
                                },
                                {
                                    name: 'GDTC',
                                    col1: 'Giáo dục thể chất',
                                },
                                {
                                    name: 'GDTH',
                                    col1: 'Giáo dục tiểu học',
                                },
                                {
                                    name: 'GV',
                                    col1: 'Giáo viên',
                                },
                                {
                                    name: 'HS',
                                    col1: 'Học sinh',
                                },
                                {
                                    name: 'HTCTTH',
                                    col1: 'Hoàn thành chương trình tiểu học',
                                },
                                {
                                    name: 'HĐNGLL',
                                    col1: 'Hoạt động ngoài giờ lên lớp',
                                },
                                {
                                    name: 'HĐGD',
                                    col1: 'Hoạt động giáo dục',
                                },
                                {
                                    name: 'NV',
                                    col1: 'Nhân viên',
                                },
                                {
                                    name: 'PCCC',
                                    col1: 'Phòng cháy chữa cháy',
                                },
                                {
                                    name: 'PCGDTH',
                                    col1: 'Phổ cập giáo dục tiểu học',
                                },
                                {
                                    name: 'QĐND',
                                    col1: 'Quân đội Nhân dân',
                                },
                                {
                                    name: 'SNĐ',
                                    col1: 'Sao nhi đồng'
                                },
                                {
                                    name: 'TTLĐXS',
                                    col1: 'Tập thể lao động xuất sắc'
                                },
                                {
                                    name: 'TNTPHCM',
                                    col1: 'Thiếu niên Tiền phong Hồ Chí Minh'
                                },
                                {
                                    name: 'TĐG',
                                    col1: 'Tự đánh giá'
                                },
                                {
                                    name: 'UBND',
                                    col1: 'Ủy ban Nhân dân'
                                }
                            ]
                        },
                        {
                            tenchimuc: 'TỔNG HỢP KẾT QUẢ TỰ ĐÁNH GIÁ',
                            loaichimuc: 0,
                            isCenterTitle: 1,
                            isDropLine: 1,
                            children: [
                                {
                                    tenchimuc: '1. Kết quả đánh giá',
                                    loaichimuc: 0,
                                    children: [
                                        {
                                            tenchimuc: '1.1. Đánh giá tiêu chí Mức 1,2 và 3',
                                            loaichimuc: 6,
                                        },
                                        {
                                            tenchimuc: '1.2. Đánh giá tiêu chí Mức 4',
                                            loaichimuc: 1,
                                        }
                                    ]
                                },
                                {
                                    tenchimuc: '2. Kết luận',
                                    loaichimuc: 1,
                                }
                            ]
                        }
                    ]
                },
                {
                    tenchimuc: 'Phần I: CƠ SỞ DỮ LIỆU',
                    loaichimuc: 0,
                    isCenterTitle: 1,
                    isDropLine: 1,
                    children: [
                        {
                            tenchimuc: 'Thông tin nhà trường',
                            loaichimuc: 6,
                            isHideTitle: 1,
                            columns: [
                                {
                                    title: 'Thông tin',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Nội dung',
                                    dataIndex: 'col1'
                                }
                            ],
                            rows: [
                                {
                                    name: 'Tên trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Tên trước đây',
                                    col1: ' '
                                },
                                {
                                    name: 'Phòng Giáo dục và Đào tạo',
                                    col1: ' '
                                },
                                {
                                    name: 'Tỉnh/thành phố trực thuộc Trung ương',
                                    col1: ' '
                                },
                                {
                                    name: 'Huyện/Quận/Thị xã',
                                    col1: ' '
                                },
                                {
                                    name: 'Xã/Phường/Thị trấn',
                                    col1: ' '
                                },
                                {
                                    name: 'Đạt chuẩn quốc gia',
                                    col1: ' '
                                },
                                {
                                    name: 'Năm thành lập trường (theo quyết định thành lập)',
                                    col1: ' '
                                },
                                {
                                    name: 'Công lập',
                                    col1: ' '
                                },
                                {
                                    name: 'Tư thục',
                                    col1: ' '
                                },
                                {
                                    name: 'Trường chuyên biệt',
                                    col1: ' '
                                },
                                {
                                    name: 'Trường liên kết với nước ngoài',
                                    col1: ' '
                                },
                                {
                                    name: 'Họ và tên hiệu trưởng',
                                    col1: ' '
                                },
                                {
                                    name: 'Điện thoại',
                                    col1: ' '
                                },
                                {
                                    name: 'Fax',
                                    col1: ' '
                                },
                                {
                                    name: 'Website',
                                    col1: ' '
                                },
                                {
                                    name: 'Số điểm trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Loại hình khác',
                                    col1: ' '
                                },
                                {
                                    name: 'Thuộc vùng khó khăn',
                                    col1: ' '
                                },
                                {
                                    name: 'Thuộc vùng đặc biệt khó khăn',
                                    col1: ' '
                                }
                            ]
                        },
                        {
                            tenchimuc: '1. Số lớp học',
                            loaichimuc: 2,
                            columns: [
                                {
                                    title: 'Số lớp học',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Năm học 2015-2016',
                                    dataIndex: 'col1'
                                },
                                {
                                    title: 'Năm học 2016-2017',
                                    dataIndex: 'col2'
                                },
                                {
                                    title: 'Năm học 2017-2018',
                                    dataIndex: 'col3'
                                },
                                {
                                    title: 'Năm học 2018-2019',
                                    dataIndex: 'col4'
                                },
                                {
                                    title: 'Năm học 2019-2020',
                                    dataIndex: 'col5'
                                }
                            ],
                            rows: [
                                {
                                    name: 'Khối lớp 1',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-1'
                                },
                                {
                                    name: 'Khối lớp 2',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-2'
                                },
                                {
                                    name: 'Khối lớp 3',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-3'
                                },
                                {
                                    name: 'Khối lớp 4',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-4'
                                },
                                {
                                    name: 'Khối lớp 5',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-5'
                                },
                                {
                                    name: 'Cộng',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum'
                                }
                            ]
                        },
                        {
                            tenchimuc: '2. Cơ cấu khối công trình của nhà trường',
                            loaichimuc: 2,
                            columns: [
                                {
                                    title: 'TT',
                                    dataIndex: 'sothutu'
                                },
                                {
                                    title: 'Số liệu',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Năm học 2015-2016',
                                    dataIndex: 'col1'
                                },
                                {
                                    title: 'Năm học 2016-2017',
                                    dataIndex: 'col2'
                                },
                                {
                                    title: 'Năm học 2017-2018',
                                    dataIndex: 'col3'
                                },
                                {
                                    title: 'Năm học 2018-2019',
                                    dataIndex: 'col4'
                                },
                                {
                                    title: 'Năm học 2019-2020',
                                    dataIndex: 'col5'
                                },
                                {
                                    title: 'Ghi chú',
                                    dataIndex: 'col6'
                                }
                            ],
                            rows: [
                                {   sothutu: 'I',
                                    name: 'Phòng học, phòng học bộ môn và khối phục vụ học tập',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1'
                                },
                                {
                                    sothutu: '1',
                                    name: 'Phòng học',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-1'
                                },
                                {
                                    sothutu: 'a',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-1-1'
                                },
                                {
                                    sothutu: 'b',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-1-2'
                                },
                                {
                                    sothutu: 'c',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-1-3'
                                },
                                {
                                    sothutu: '2',
                                    name: 'Phòng học bộ môn',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-2'
                                },
                                {
                                    sothutu: 'a',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-2-1'
                                },
                                {
                                    sothutu: 'b',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-2-2'
                                },
                                {
                                    sothutu: 'c',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-2-3'
                                },
                                {
                                    sothutu: '3',
                                    name: 'Khối phòng phục vụ học tập',
                                    col1: '0',
                                    col3: '0',
                                    col2: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-3'
                                },
                                {
                                    sothutu: 'a',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-3-1'
                                },
                                {
                                    sothutu: 'b',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-3-2'
                                },
                                {
                                    sothutu: 'c',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-3-3'
                                },
                                {
                                    sothutu: 'II',
                                    name: 'Khối phòng hành chính - quản trị',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2'
                                },
                                {
                                    sothutu: '1',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2-1'
                                },
                                {
                                    sothutu: '2',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2-2'
                                },
                                {
                                    sothutu: '3',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2-3'
                                },
                                {
                                    sothutu: 'III',
                                    name: 'Thư viện',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-3'
                                },
                                {
                                    sothutu: 'IV',
                                    name: 'Các công trình, khối phòng chức năng khác (nếu có)',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-4'
                                },
                                {
                                    sothutu: ' ',
                                    name: 'Cộng',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum'
                                }
                            ]
                        },
                        {
                            tenchimuc: '3. Cán bộ quản lý, giáo viên, nhân viên',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: 'a) Số liệu tại thời điểm TĐG',
                                    loaichimuc: 2,
                                    columns: [
                                        {
                                            title: '',
                                            dataIndex: 'name'
                                        },
                                        {
                                            title: 'Tổng số',
                                            dataIndex: 'col1'
                                        },
                                        {
                                            title: 'Nữ',
                                            dataIndex: 'col2'
                                        },
                                        {
                                            title: 'Dân tộc',
                                            dataIndex: 'col3'
                                        },
                                        {
                                            title: 'Chưa đạt chuẩn',
                                            dataIndex: 'col4'
                                        },
                                        {
                                            title: 'Đạt chuẩn',
                                            dataIndex: 'col5'
                                        },
                                        {
                                            title: 'Trên chuẩn',
                                            dataIndex: 'col6'
                                        },
                                        {
                                            title: 'Ghi chú',
                                            dataIndex: 'col7'
                                        }
                                    ],
                                    rows: [
                                        {
                                            name: 'Hiệu trưởng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-1'
                                        },
                                        {
                                            name: 'Phó Hiệu trưởng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-2'
                                        },
                                        {
                                            name: 'Tổng phụ trách Đội',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-3'
                                        },
                                        {
                                            name: 'Giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-4'
                                        },
                                        {
                                            name: 'Nhân viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-5'
                                        },
                                        {
                                            name: 'Cộng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum'
                                        },
                                    ]
                                },
                                {
                                    tenchimuc: 'b) Số liệu của 5 năm gần đây',
                                    loaichimuc: 2,
                                    columns: [
                                        {
                                            title: 'TT',
                                            dataIndex: 'sothutu'
                                        },
                                        {
                                            title: 'Số liệu',
                                            dataIndex: 'name'
                                        },
                                        {
                                            title: 'Năm học 2015-2016',
                                            dataIndex: 'col1'
                                        },
                                        {
                                            title: 'Năm học 2016-2017',
                                            dataIndex: 'col2'
                                        },
                                        {
                                            title: 'Năm học 2017-2018',
                                            dataIndex: 'col3'
                                        },
                                        {
                                            title: 'Năm học 2018-2019',
                                            dataIndex: 'col4'
                                        },
                                        {
                                            title: 'Năm học 2019-2020',
                                            dataIndex: 'col5'
                                        }
                                    ],
                                    rows: [
                                        {
                                            sothutu: '1',
                                            name: 'Tổng số giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '2',
                                            name: 'Tỷ lệ giáo viên/lớp',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '3',
                                            name: 'Tỷ lệ giáo viên/học sinh',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '4',
                                            name: 'Tổng số giáo viên dạy giỏi cấp huyện hoặc tương đương trở lên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '5',
                                            name: 'Tổng số giáo viên dạy giỏi cấp tỉnh trở lên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tenchimuc: '4. Học sinh',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: 'a) Số liệu chung',
                                    loaichimuc: 2,
                                    columns: [
                                        {
                                            title: 'Số liệu',
                                            dataIndex: 'name'
                                        },
                                        {
                                            title: 'Năm học 2015-2016',
                                            dataIndex: 'col1'
                                        },
                                        {
                                            title: 'Năm học 2016-2017',
                                            dataIndex: 'col2'
                                        },
                                        {
                                            title: 'Năm học 2017-2018',
                                            dataIndex: 'col3'
                                        },
                                        {
                                            title: 'Năm học 2018-2019',
                                            dataIndex: 'col4'
                                        },
                                        {
                                            title: 'Năm học 2019-2020',
                                            dataIndex: 'col5'
                                        },
                                        {
                                            title: 'Ghi chú',
                                            dataIndex: 'col6'
                                        }
                                    ],
                                    rows: [
                                        {
                                            name: 'Tổng số học sinh',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Nữ',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Dân tộc thiểu số',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Khối lớp 1',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Khối lớp 2',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Khối lớp 3',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Khối lớp 4',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Khối lớp 5',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Tổng số tuyển mới',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Học 2 buổi/ngày',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Bán trú',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Nội trú',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Bình quân số học sinh/lớp học',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Số lượng và tỉ lệ % đi học đúng độ tuổi',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Nữ',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Dân tộc thiểu số',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Tổng số học sinh giỏi cấp huyện/tỉnh (nếu có)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Tổng số học sinh giỏi quốc gia (nếu có)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Tổng số học sinh thuộc đối tượng chính sách',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Nữ',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Dân tộc thiểu số',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Tổng số học sinh (trẻ em) có hoàn cảnh đặc biệt',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        }
                                    ]
                                },
                                {
                                    tenchimuc: 'b) Công tác phổ cập giáo dục tiểu học và kết quả giáo dục',
                                    loaichimuc: 2,
                                    columns: [
                                        {
                                            title: 'Số liệu',
                                            dataIndex: 'name'
                                        },
                                        {
                                            title: 'Năm học 2015-2016',
                                            dataIndex: 'col1'
                                        },
                                        {
                                            title: 'Năm học 2016-2017',
                                            dataIndex: 'col2'
                                        },
                                        {
                                            title: 'Năm học 2017-2018',
                                            dataIndex: 'col3'
                                        },
                                        {
                                            title: 'Năm học 2018-2019',
                                            dataIndex: 'col4'
                                        },
                                        {
                                            title: 'Năm học 2019-2020',
                                            dataIndex: 'col5'
                                        },
                                        {
                                            title: 'Ghi chú',
                                            dataIndex: 'col6'
                                        }
                                    ],
                                    rows: [
                                        {
                                            name: 'Trong địa bàn tuyển sinh của trường tỷ lệ trẻ em 6 tuổi vào lớp 1',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        },
                                        {
                                            name: 'Tỷ lệ học sinh hoàn thành chương trình lớp học',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        },
                                        {
                                            name: 'Tỷ lệ học sinh 11 tuổi hoàn thành chương trình lớp học',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        },
                                        {
                                            name: 'Tỷ lệ trẻ em đến 14 tuổi HTCT tiểu học',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tenchimuc: 'PHẦN II: TỰ ĐÁNH GIÁ',
                    loaichimuc: 0,
                    isCenterTitle: 1,
                    isDropLine: 1,
                    children: [
                        {
                            tenchimuc: 'A. ĐẶT VẤN ĐỀ',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: '1. Tình hình chung nhà trường',
                                    loaichimuc: 1
                                },
                                {
                                    tenchimuc: '2. Mục đích TĐG',
                                    loaichimuc: 1
                                },
                                {
                                    tenchimuc: '3. Tóm tắt quá trình và những vấn đề nổi bặt trong hoạt động TĐG',
                                    loaichimuc: 1
                                }
                            ]
                        },
                        {
                            tenchimuc: 'B. TỰ ĐÁNH GIÁ',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: 'I. TỰ ĐÁNH GIÁ TIÊU CHÍ MỨC 1,2 VÀ 3',
                                    loaichimuc: 0,
                                    children: [
                                        {
                                            tenchimuc: 'Tiêu chuẩn 1: Tổ chức và quản lý nhà trường',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.1: Phương hướng, chiến lược xây dựng và phát triển nhà trường',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phù hợp mục tiêu giáo dục được quy định tại Luật giáo dục, định hướng phát triển kinh tế - xã hội của địa phương theo từng giai đoạn và các nguồn lực của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Phương hướng chiến lược và xây dựng phát triển nhà trường.<br>- Phù hợp với mục tiêu giáo dục phổ thông được quy định tại Luật giáo dục (Điều 27 Văn bản hợp nhất Luật giáo dục số 07/VBHN-VPQH ngày 31 tháng 12 năm 2015)<br>- Phù hợp với định hướng phát triển kinh tế-xã hội của địa phương theo từng giai đoạn;<br>- Phù hợp với các nguồn lực của nhà trường.</p>',
                                                            cauhoi: '<p>Trường có phương hướng chiến lược và kế hoạch xây dựng phát triển nhà trường hay chưa?<br>- Có phù hợp với mục tiêu giáo dục phổ thông được quy định tại Luật giáo dục (Điều 27 Văn bản hợp nhất Luật giáo dục số 07/VBHN-VPQH ngày 31 tháng 12 năm 2015) hay không?<br>- Có phù hợp với định hướng phát triển kinh tế-xã hội của địa phương theo từng giai đoạn hay không?<br>- Có phù hợp với các nguồn lực của nhà trường hay không?</p>',
                                                            canthuthap: '<p>-&nbsp;Văn bản phương hướng chiến lược xây dựng và phát triển nhà trường cấp có thẩm quyền phê duyệt.<br>- Các báo cáo sơ kết, tổng kết.<br>- Kế hoạch phát triển trường lớp từng năm.<br>- Nghị quyết Đại hội Đảng bộ các cấp về định hướng phát triển kinh tế xã hội của ngành hằng năm.<br>-&nbsp;Sổ nghị quyết của nhà trường và nghị quyết Hội đồng trường.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Được xác định bằng văn bản và cấp có thẩm quyền phê duyệt;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Văn bản phương hướng chiến lược xây dựng và phát triển nhà trường được phê duyệt</p>',
                                                            cauhoi: '<p>Trường có phương hướng và kế hoạch xây dựng phát triển nhà trường không?</p>',
                                                            canthuthap: '<p>-Văn bản phương hướng chiến lược xây dựng và phát triển nhà trường cấp có thẩm quyền phê duyệt.<br>- Kế hoạch phát triển biên chế trường lớp hằng năm</p>>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Được công bố công khai bằng hình thức niêm yết tại nhà trường hoặc đăng tải trên trang thông tin điện tử của nhà trường (nếu có) hoặc đăng tải trên các phương tiện thông tin đại chúng của địa phương, trang thông tin điện tử của phòng giáo dục và đào tạo.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Được công bố công khai bằng hình thức niêm yết tại nhà trường hoặc đăng tải trên trang thông tin điện tử của nhà trường.<br>- Hoặc đăng tải trên các phương tiện thông tin đại chúng của địa phương, trang thông tin điện tử của Phòng GD-ĐT, Sở GD-ĐT</p>',
                                                            cauhoi: '<p>Các phương hướng chiến lược phát triển được công bố công khai bằng hình thức niêm yết hay đăng tải trên trang thông tin điện tử của nhà trường hay không?</p>',
                                                            canthuthap: '<p>Cổng thông tin nhà trường</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nhà trường có các giải pháp giám sát việc thực hiện phương hướng, chiến lược xây dựng và phát triển.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường có các giải pháp giám sát việc thực hiện phương hướng, chiến lược xây dựng và phát triển.</p>',
                                                            cauhoi: '<p>Nhà trường đã xây dựng các giải pháp giám sát việc thực hiện phương hướng , chiến lược phát triển hay chưa?</p>',
                                                            canthuthap: '<p>Kế hoạch giám sát thực hiện các giải thực hiện phương hướng chiến lược của tổ chức công đoàn hằng năm.</p>',
                                                            noithuthap: '<p>Công đoàn trường.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0
                                                        },
                                                        {
                                                            tieude: 'Định kỳ rà soát, bổ sung, điều chỉnh phương hướng, chiến lược xây dựng và phát triển. Tổ chức xây dựng phương hướng, chiến lược xây dựng và phát triển có sự tham gia của các thành viên trong Hội đồng trường (Hội đồng quản trị đối với trường tư thục), cán bộ quản lý, giáo viên, nhân viên, cha mẹ học sinh và cộng đồng.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Định kì rà soát, bổ sung, điều chỉnh phương hướng, chiến lược xây dựng và phát triển. Tổ chức xây dựng phương hướng, chiến lược xây dựng và phát triển có sự tham gia của các thành viên trong Hội đồng, cán bộ quản lý, giáo viên, nhân viên cha mẹ học sinh và cộng đồng.</p>',
                                                            cauhoi: '<p>- Nhà trường có rà soát, bổ sung điều chỉnh phương hướng, chiến lược xây dựng và phát triển theo định kì hay chưa?<br>- Tổ chức xây dựng phương hướng, chiến lược xây dựng và phát triển có sự tham gia của các thành viên trong Hội đồng, cán bộ quản lý, giáo viên, nhân viên cha mẹ học sinh và cộng đồng hay chưa?</p>',
                                                            canthuthap: '<p>- Báo cáo;<br>- Biên bản có nội dung rà soát, bổ sung, điều chỉnh phương hướng, chiến lược xây dựng và phát triển.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.2: Hội đồng trường (Hội đồng quản trị đối với trường tư thục) và các hội đồng khác',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Được thành lập theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Hội đồng quản trị đối với trường tiểu học công lập được thành lập theo quy định Điều 23 Điều lệ trường tiểu học<br>(Văn bản hợp nhất số 03/VHHN-BGDĐT ngày 22 tháng 01 năm 2014);<br>- Các hội đông khác:<br>+ Hội đồng thi đua khen thưởng;<br>+ Hội đồng kỷ luật (nếu có);<br>+ Hội đồng tư vấn (Trường hợp cần thiết, hiệu trưởng có thể thành lập các hội đồng tư vấn giúp hiệu trưởng về chuyên môn. quản lý nhà trường. Nhiệm vụ, quyền hạn, thành phần và thời gian hoạt động của các hội đồng tư vấn do hiệu trưởng quy định. Ví dụ : Hội đồng chấm sáng kiến kinh nghiệm; hội đồng chấm thi giáo viên giỏi,...)</p>',
                                                            cauhoi: '<p>- Nhà trường có Hội đồng quản trị đối với trường tiểu học công lập được thành lập theo quy định Điều 23 Điều lệ trường tiểu học (Văn bản hợp nhất số 03/VHHN-BGDĐT ngày 22 tháng 01 năm 2014) không?<br>+ Nhà trường có hội đồng thi đua khen thưởng và hội đồng kỉ luật không?<br>+ Nhà trường có hội đồng tư vấn không?</p>',
                                                            canthuthap: '<p>- Nhà trường có Hội đồng quản trị đối với trường tiểu học công lập được thành lập theo quy định Điều 23 Điều lệ trường tiểu học (Văn bản hợp nhất số 03/VHHN-BGDĐT ngày 22 tháng 01 năm 2014) không?<br>+ Nhà trường có hội đồng thi đua khen thưởng và hội đồng kỉ luật không?<br>+ Nhà trường có hội đồng tư vấn không?</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Thực hiện chức năng, nhiệm vụ và quyền hạn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Thực hiện chức năng, nhiệm vụ, quyền hạn của Hội đồng trường (đối với trường tiểu học công lập) theo qui định Điều 23 Điều lệ trường tiểu học (Văn bản hợp nhất số 03/VHHN-BGDĐT ngày 22 tháng 01 năm 2014).<br><br>- Đối với các hội đồng khác thực hiện chức năng, nhiệm vụ, quyền hạn theo quy định tại Điều 24 Điều lệ trường tiểu học (Văn bản hợp nhất số 03/VHHN-BGDĐT ngày 22 tháng 01 năm 2014).</p>',
                                                            cauhoi: '<p>- Nhà trường có thực hiện chức năng, nhiệm vụ, quyền hạn của Hội đồng trường (đối với trường tiểu học công lập) theo qui định Điều 23 Điều lệ trường tiểu học ( Văn bản hợp nhất số 03/VHHN-BGDĐT ngày 22 tháng 01 năm 2014) không?<br>- Đối với các hội đồng khác thực hiện chức năng, nhiệm vụ, quyền hạn theo quy định tại Điều 24 Điều lệ trường tiểu học (Văn bản hợp nhất số 03/VHHN-BGDĐT ngày 22 tháng 01 năm 2014) không?</p>',
                                                            canthuthap: '<p>- Biên bản của các hội đồng có nội dung liên quan;<br>- Các kế hoạch hoạt động, biên bản sinh hoạt và nghị quyết của hội đồng trường, hội đồng trường.<br>- Sổ nghị quyết và kế hoạch công tác;</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Các hoạt động được định kỳ rà soát, đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Hoạt động của các hội đồng định kỳ được thực hiện rà soát, đánh giá.</p>',
                                                            cauhoi: '<p>- Hoạt động của các hội đồng định kỳ được thực hiện rà soát, đánh giá không?</p>',
                                                            canthuthap: '<p>- Các biên bản có liên quan về việc kiểm tra của các cơ quan chức năng.<br>- Báo cáo sơ kết, tổng kết;</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Hoạt động có hiệu quả, góp phần nâng cao chất lượng giáo dục của nhà trường',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Hoạt động có hiệu quả, góp phần nâng cao chất lượng giáo dục của nhà trường</p>',
                                                            cauhoi: '<p>- Nhà trường hoạt động có hiệu quả, góp phần nâng cao chất lượng giáo dục của nhà trường không?</p>',
                                                            canthuthap: '<p>- Biên bản họp hội đồng<br>(hoặc sổ nghị quyết và kế hoạch công tác);<br>- Các báo cáo sơ kết, tổng kết</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.3: Tổ chức Đảng Cộng sản Việt Nam, các đoàn thể và tổ chức khác trong nhà trường',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Các đoàn thể và tổ chức khác trong nhà trường có cơ cấu tổ chức theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường có tổ chức Công đoàn, Sao Nhi đồng, Đội Thiếu niên, Đoàn Thanh niên Cộng sản Hồ Chí Minh, Chi hội chữ thập đỏ.</p>',
                                                            cauhoi: '<p>Nhà trường có tổ chức Công đoàn, Sao Nhi đồng, Đội Thiếu niên, Đoàn Thanh niên Cộng sản Hồ Chí Minh không?</p>',
                                                            canthuthap: '<p>- Quyết định chuẩn y Ban chấp hành Công đoàn CS nhiệm kì 2017-2022</p>',
                                                            noithuthap: '<p>Công đoàn</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Công đoàn, Sao Nhi đồng, Đội Thiếu niên, Đoàn Thanh niên Cộng sản Hồ Chí Minh, hội chữ thập đỏ hoạt động theo quy định của pháp luật và Điều lệ của từng tổ chức nhằm giúp nhà trường thực hiện mục tiêu giáo dục.</p>',
                                                            cauhoi: '<p>Công đoàn, Sao Nhi đồng, Đội Thiếu niên, Đoàn Thanh niên Cộng sản Hồ Chí Minh có hoạt động theo quy định của pháp luật và Điều lệ của từng tổ chức nhằm giúp nhà trường thực hiện mục tiêu giáo dục không?</p>',
                                                            canthuthap: '<p>- Sổ nghị quyết chi đoàn<br>- Sổ nghị quyết hội chữ thập đỏ.<br>- Kế hoạch hoạt động năm học 2018-2019 của CĐCS<br>-Kế hoạch hoạt động năm học 2018-2019 của Đội TNTP HCM<br>- Các văn bản có liên quan của Công đoàn<br>- Các văn bản có liên quan của Đội TN TPHCM</p>',
                                                            noithuthap: '<p>- Chi đoàn<br>-&nbsp;Hội chữ thập đỏ<br>-&nbsp;Công đoàn<br>-&nbsp;TPT<br>-&nbsp;Công đoàn<br>-&nbsp;TPT</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, các hoạt động được rà soát, đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hằng năm, các hoạt động được rà soát, đánh giá</p>',
                                                            cauhoi: '<p>Hằng năm, các hoạt động có được rà soát, đánh giá không?</p>',
                                                            canthuthap: '<p>Báo cáo tổng kết hoạt động Công đoàn</p>',
                                                            noithuthap: '<p>Công đoàn</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức Đảng Cộng sản Việt Nam có cơ cấu tổ chức và hoạt động theo quy định; trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 01 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Tại thời điểm đánh giá, nhà trường có tổ chức Đảng Cộng sản Việt Nam. Tổ chức Đảng Cộng sản Việt Nam của nhà trường :<br>- Có cơ cấu tổ chức và hoạt động trong khuôn khổ hiến pháp, pháp luật và Điều lệ của Đảng Cộng Sản Việt Nam.<br>- Trong 05 năm liền kề trước khi đề nghị công nhận có ít nhất 01 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên.</p>',
                                                            cauhoi: '<p>-&nbsp;Tại thời điểm đánh giá, nhà trường có tổ chức Đảng Cộng sản Việt Nam. Tổ chức Đảng Cộng sản Việt Nam của nhà trường :<br>- Có cơ cấu tổ chức và hoạt động trong khuôn khổ hiến pháp, pháp luật và Điều lệ của Đảng Cộng Sản Việt Nam không?<br>- Trong 05 năm liền kề trước khi đề nghị công nhận có ít nhất 01 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên không?</p>',
                                                            canthuthap: '<p>- Quyết định chuẩn y chức danh Bí thư chi bộ nhà trường nhiệm kì 2017-2020<br>-&nbsp;Báo cáo của chi bộ nhà trường, kế hoạch công tác, văn bản của Đảng ủy thị trấn đánh giá hoạt động của chi bộ, giấy khen của Đảng ủy thị trấn</p>',
                                                            noithuthap: '<p>- Chi bộ<br>- Chi bộ</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác có đóng góp tích cực cho các hoạt động của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Các đoàn thể, tổ chức khác có đóng góp tích cực cho các hoạt động của nhà trường.</p>',
                                                            cauhoi: '<p>Các đoàn thể, tổ chức khác có đóng góp tích cực cho các hoạt động của nhà trường không?</p>',
                                                            canthuthap: '<p>- Báo cáo của chi bộ nhà trường, văn bản của Đảng ủy thị trấn đánh giá hoạt động của chi bộ của Đảng ủy thị trấn</p>',
                                                            noithuthap: '<p>Chi bộ</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, tổ chức Đảng Cộng sản Việt Nam có ít nhất 02 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Trong 05 năm liền kề trước khi đề nghị công nhận tổ chức Đảng Cộng sản VN có ít nhất 2 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên.</p>',
                                                            cauhoi: '<p>Trong 05 năm liền kề trước khi đề nghị công nhận tổ chức Đảng Cộng sản VN có ít nhất 2 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên không?</p>',
                                                            canthuthap: '<p>- Giấy khen của Đảng ủy thị trấn</p>',
                                                            noithuthap: '<p>Chi bộ</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác đóng góp hiệu quả cho các hoạt động của nhà trường và cộng đồng',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Các đoàn thể, tổ chức khác đóng góp hiệu quả cho các hoạt động của nhà trường và cộng đồng.</p>',
                                                            cauhoi: '<p>Các đoàn thể, tổ chức khác có đóng góp hiệu quả cho các hoạt động của nhà trường và cộng đồng không?</p>',
                                                            canthuthap: '<p>- Báo cáo của chi bộ nhà trường</p>',
                                                            noithuthap: '<p>Chi bộ</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.4: Hiệu trưởng, phó hiệu trưởng, tổ chuyên môn và tổ văn phòng',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có hiệu trưởng, số lượng phó hiệu trưởng theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường có hiệu trưởng; số lượng phó hiệu trưởng theo quy định tại Điều lệ trường Tiểu học</p>',
                                                            cauhoi: '<p>Nhà trường có hiệu trưởng; số lượng phó hiệu trưởng theo quy định tại Điều lệ trường Tiểu học không?</p>',
                                                            canthuthap: '<p>Quyết định bổ nhiệm hiệu trưởng, phó hiệu trưởng.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn và tổ văn phòng có cơ cấu tổ chức theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường có các tổ chuyên môn theo quy định tại điều 18 Điều lệ trường tiểu học ( Văn bản hợp nhất số 03/ VBHN-BGD- ĐT)<br>- Nhà trường có cơ cấu tổ chức của tổ văn phòng theo quy định tại Điều 19 Điều lệ trường tiểu học ( Văn bản họp nhất 03/ VBHN- BGD ĐT)</p>',
                                                            cauhoi: '<p>- Trường đã có các tổ chuyên môn và tổ văn phòng theo quy định tại điều 18 và điều 19 Điều lệ trường tiểu học không?</p>',
                                                            canthuthap: '<p>- Quyết định thành lập các tổ chuyên môn và tổ văn phòng do hiệu trưởng ra quyết định hàng năm</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chuyên môn, tổ văn phòng có kế hoạch hoạt động và thực hiện các nhiệm vụ theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Các tổ chuyên môn và tổ văn phòng có kế hoạch hoạt động tuần, tháng, năm.<br>- Các tổ chuyên môn và tổ văn phòng thực hiện tốt các nhiệm vụ theo quy định tại điều 18 và điều 19 Điều lệ trường tiếu học ( Văn bản hợp nhất số 03 / VBHN- BGD ĐT)</p>',
                                                            cauhoi: '<p>- Các tổ chuyên môn và tổ văn phòng đã có kế hoạch hoạt động tuần, tháng, năm không?<br>- Các tổ chuyên môn và tổ văn phòng thực hiện tốt các nhiệm vụ theo quy định tại điều 18 và điều 19 Điều lệ trường tiếu học ( Văn bản hợp nhất số 03 / VBHN- BGD ĐT) không?</p>',
                                                            canthuthap: '<p>Các kế hoạch tuần, tháng, năm;<br>- Các loại sổ sách chuyên môn<br>- Biên bản kiểm kê tài liệu, thiết bị, tài sản, tài chính,hồ sơ của tổ và của nhà trường hàng năm.<br>- Danh sách đắng kí thi đuavà biên bản họp công tác thi đua của tổ.<br>- Báo cáo sơ kết, tổng kết.<br>- Biên bản xếp loại của các tổ.<br>- Biên bản về đánh giá xếp loại giáo viên theo quy định chuẩn nghề nghiệp giáo viên hàng năm.</p>',
                                                            noithuthap: '<p>Các tổ trưởng chuyên môn và tổ văn phòng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hằng năm, tổ chuyên môn đề xuất và thực hiện được ít nhất 01 (một) chuyên đề chuyên môn có tác dụng nâng cao chất lượng hiệu quả giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Các tổ chuyên môn hàng tháng có họp thảo luận về chuyên đề có tác nâng cao chất lượng dạy học.</p>',
                                                            cauhoi: '<p>- Các tổ chuyên môn hàng tháng có họp thảo luận về chuyên đề có tác nâng cao chất lượng dạy học không?</p>',
                                                            canthuthap: '<p>Các chuyên đề về nâng cao chất lượng dạy học.</p>',
                                                            noithuthap: '<p>Các tổ chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động của tổ chuyên môn, tổ văn phòng được định kỳ rà soát, đánh giá, điều chỉnh.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Các tổ chuyên môn và tổ văn phòng được rà soát, đánh giá, điều chỉnh theo định kì.</p>',
                                                            cauhoi: '<p>- Các tổ chuyên môn và tổ văn phòng được rà soát, đánh giá, điều chỉnh theo định kì không?</p>',
                                                            canthuthap: '<p>Lịch hoạt động các chuyên đề chuyên môn của tổ.<br>- Biên bản sinh hoạt của tổ<br>- Sổ sinh hoạt chuyên môn của giáo viên.<br>- Báo cáo sơ kết, tổng kết.<br>- Kế hoạch hoạt động của tổ chuyên môn , tổ văn phòng</p>',
                                                            noithuthap: '<p>Các tổ chuyên môn, tổ văn phòng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hoạt động của tổ chuyên môn, tổ văn phòng, có đóng góp hiệu quả trong việc nâng cao chất lượng các hoạt động của nhà trường',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Các tổ chuyên môn và tổ văn phòng đã có nhiều đóng góp trong việc nâng cao chất lượng các hoạt động của nhà trường.</p>',
                                                            cauhoi: '<p>Các tổ chuyên môn và tổ văn phòng có nhiều đóng góp trong việc nâng cao chất lượng các hoạt động của nhà trường không?</p>',
                                                            canthuthap: '<p>- Các chuyên đề chuyên môn.<br>-&nbsp;Báo cáo sơ kết, tổng kết.<br>-&nbsp;Kế hoạch hoạt động của tổ chuyên môn, tổ văn phòng.</p>',
                                                            noithuthap: '<p>Các tổ chuyên môn và tổ văn phòng.</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn thực hiện hiệu quả các chuyên đề chuyên môn góp phần nâng cao chất lượng giáo dục',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Tổ chuyên môn thực hiện hiệu quả các chuyên đề chuyên môn góp phần nâng cao chất lượng giáo dục</p>',
                                                            cauhoi: '<p>Tổ chuyên môn thực hiện các chuyên đề chuyên môn góp phần nâng cao chất lượng giáo dục có hiệu quả không?</p>',
                                                            canthuthap: '<p>Các chuyên đề của tổ chuyên môn.<br>- Báo cáo sơ kết , tổng kết<br>- Biên bản kiểm tra của nhà trường về hoạt động của các tổ chuyên môn.<br>- Các minh chứng để chứng minh về việc thực hiện các chuyên đề chuyên môn đã thực hiện.</p>',
                                                            noithuthap: '<p>Các tổ chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.5: Khối lớp và tổ chức lớp học',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có đủ các khối lớp cấp tiểu học;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Đến thời điểm tự đánh giá nhà trường có đủ các khối lớp tiểu học.</p>',
                                                            cauhoi: '<p>Nhà trường có đủ các khối lớp tiểu học đến thời điểm tự đánh giá không?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Thống kê số lớp, học sinh theo năm học.<br>- Báo cáo sơ kết, tổng kết</p>',
                                                            noithuthap: '<p>- Chuyên môn<br>- Chuyên môn<br>- Chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Học sinh được tổ chức theo lớp học; lớp học được tổ chức theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Học sinh được tổ chức theo lớp học. Ở những địa bàn đặc biệt khó khăn có thể tổ chức lớp ghép nhằm tạo điều kiện thuận lợi cho học sinh đi học.<br>Lớp học có lớp trưởng, một hoặc hai lớp phó do tập thể học sinh bầu hoặc do giáo viên chủ nhiệm lớp chỉ định luân phiên trong năm học. Mỗi lớp học được chia thành các tổ học sinh. Mỗi tổ có tổ trưởng, tổ phó do học sinh trong tổ bầu hoặc do giáo viên chủ nhiệm lớp chỉ định luân phiên trong năm học.</p>',
                                                            cauhoi: '<p>- Học sinh có được tổ chức theo lớp học không?<br>-&nbsp;Lớp học có lớp trưởng, một hoặc hai lớp phó do tập thể học sinh bầu hoặc do giáo viên chủ nhiệm lớp chỉ định luân phiên trong năm học không?<br>-&nbsp;Mỗi lớp học được chia thành các tổ học sinh. Mỗi tổ có tổ trưởng, tổ phó do học sinh trong tổ bầu hoặc do giáo viên chủ nhiệm lớp chỉ định luân phiên trong năm học không?</p>',
                                                            canthuthap: '<p>- Bảng tổng hợp thông tin về các lớp theo từng năm học .<br>- Sổ theo dõi sĩ số học sinh<br>- Biên bản họp bầu lớp trưởng,lớp phó, tổ trưởng của các lớp.</p>',
                                                            noithuthap: '<p>- Chuyên môn<br>- Chuyên môn<br>- Giáo viên chủ nhiệm</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Lớp học hoạt động theo nguyên tắc tự quản, dân chủ',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Lớp học hoạt động theo nguyên tắc tự quản, dân chủ.</p>',
                                                            cauhoi: '<p>Lớp học có hoạt động theo nguyên tắc tự quản, dân chủ không ?</p>',
                                                            canthuthap: '<p>- Biên bản bình bầu thi đua của lớp.<br>- Giáo án tiết sinh hoạt lớp</p>',
                                                            noithuthap: '<p>- Giáo viên chủ nhiệm<br>- Giáo viên chủ nhiệm</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trường có không quá 30 (ba mươi) lớp;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trường có không quá 30 (ba mươi) lớp.</p>',
                                                            cauhoi: '<p>Trường có không quá 30 ( ba mươi) lớp không ?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ.<br>- Thống kê số lớp, sĩ số học sinh theo từng năm học .<br>- Báo cáo sơ kết, tổng kết</p>',
                                                            noithuthap: '<p>- Chuyên môn<br>- Chuyên môn<br>- Chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Sĩ số học sinh trong lớp theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Sĩ số học sinh trong lớp không quá 35 em.</p>',
                                                            cauhoi: '<p>Sĩ số học sinh trong lớp có không quá 35 em không?</p>',
                                                            canthuthap: '<p>- Sổ theo dõi sĩ số học sinh .</p>',
                                                            noithuthap: '<p>- Chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chức lớp học linh hoạt và phù hợp với các hình thức hoạt động giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Tổ chức lớp học, linh hoạt và phù hợp với các hình thức hoạt động giáo dục.</p>',
                                                            cauhoi: '<p>Tổ chức lớp học, linh hoạt và phù hợp với các hình thức hoạt động giáo dục không?</p>',
                                                            canthuthap: '<p>- Phiếu lấy ý kiến học sinh về việc được tổ chức các hoạt động trong lớp.<br>- Các hình ảnh, bài viết về tổ chức lớp học linh hoạt và phù hợp với các hình thức hoạt động giáo dục.</p>',
                                                            noithuthap: '<p>- Giáo viên chủ nhiệm<br>- Chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.6: Quản lý hành chính, tài chính và tài sản',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hệ thống hồ sơ của nhà trường được lưu trữ theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Hồ sơ, văn bản lưu trữ đầy đủ, khoa học theo quy định của Luật lưu trữ.</p>',
                                                            cauhoi: '<p>- Nhà trường có hồ sơ, văn bản lưu trữ đầy đủ, khoa học theo quy định của Luật lưu trữ không?</p>',
                                                            canthuthap: '<p>- Sổ quản lý các văn bản, công văn;<br>- Danh mục hồ sơ lưu trữ của nhà trường<br>- Các minh chứng vè việc lưu trữ hồ sơ, văn bản: ảnh, phần mềm theo dõi;<br>- Các biên bản, kết luận, thông báo liên quan của các cấp có thẩm quyền;<br>- Báo cáo sơ kết, tổng kết</p>',
                                                            noithuthap: '<p>Hiệu Trưởng, văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Lập dự toán, thực hiện thu chi, quyết toán, thống kê, báo cáo tài chính và cơ sở vật chất; công khai và định kỳ tự kiểm tra tài chính, tài sản theo quy định; quy chế chỉ tiêu nội bộ được bổ sung, cập nhật phù hợp với điều kiện thực tế và các quy định hiện hành;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Lập dự toán, thực hiện thu chi, quyết toán, thống kế, báo cáo tài chính và tài sản theo quy định;<br>- Công khai và định kỳ tự kiểm tra tài chính, tài sản theo quy định;<br>- Quy chế chi tiêu nội bộ được bổ sung, cập nhật phù hợp với điều kiện thực tế và các quy định hiện hành.</p>',
                                                            cauhoi: '<p>- Nhà trường lập dự toán, thực hiện thu chi, quyết toán, thống kế, báo cáo tài chính và tài sản theo quy định không?<br>- Nhà trường công khai và định kỳ tự kiểm tra tài chính, tài sản theo quy định không?<br>- Nhà trường quy chế chi tiêu nội bộ được bổ sung, cập nhật phù hợp với điều kiện thực tế và các quy định hiện hành không?</p>',
                                                            canthuthap: '<p>- Quy chế chi tiêu nội bộ của nhà trường.<br>- Sổ quản lý tài sản, tài chính;</p>',
                                                            noithuthap: '<p>Hiệu Trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Quản lý, sử dụng tài chính, tài sản đúng mục đích và có hiệu quả để khắc phục các hoạt động giáo dục',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường quản lý, sử dụng tài chính và tài sản đảm bảo:<br>- Đúng mục đích;<br>- Đạt hiệu quả để phục vụ các hoạt động giáo dục.</p>',
                                                            cauhoi: '<p>- Nhà trường nhà trường quản lý, sử dụng tài chính và tài sản đảm bảo không?<br>- Nhà trường đúng mục đích không?<br>- Nhà trường đạt hiệu quả để phục vụ các hoạt động giáo dục không?</p>',
                                                            canthuthap: null,
                                                            noithuthap: '<p>Hiệu Trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Ứng dụng công nghệ thông tin trong công tác quản lý hành chính, tài chính và tài sản của nhà trường',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Ứng dụng công nghệ thông tin hiệu quả trong công tác quản lý hành chính, tài chính và tài sản của nhà trường.</p>',
                                                            cauhoi: '<p>- Nhà trường ứng dụng công nghệ thông tin hiệu quả trong công tác quản lý hành chính, tài chính và tài sản của nhà trường không ?</p>',
                                                            canthuthap: '<p>- Phần mềm quản lý hành chính, tài chính và tài sản của nhà trường;<br>- Sổ quản lý tài sản, tài chính;<br>- Báo cáo sơ kết, tổng kết;<br>- Biên bản kiểm tra hoặc kết luận của cấp trên về việc thanh tra, kiểm toán,...) có đánh giá về nội dung có liên quan.</p>',
                                                            noithuthap: '<p>Hiệu Trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có vi phạm liên quan đến việc quản lý hành chính, tài chính và tài sản theo kết luận của thanh tra, kiểm toán',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Kết luận của thanh tra, kiểm toán trong 5 năm liền kề trước khi dề nghị công nhận nhà trường không có vi phạm liên quan đến:<br>- Quản lý hành chính:<br>- Tài chính:<br>- Tài sản.</p>',
                                                            cauhoi: '<p>- Nhà trường kết luận của thanh tra, kiểm toán trong 5 năm liền kề trước khi dề nghị công nhận nhà trường không có vi phạm liên quan đến không?<br>- Nhà trường quản lý hành chính không?<br>- Nhà trường tài chính không?<br>- Nhà trường tài sản không?</p>',
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có kế hoạch dài hạn, trung hạn và ngắn hạn để tạo các nguồn tài chính hợp pháp phù hợp với điều kiện nhà trường, thực tế địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Có kế hoạch ngắn hạn, trung hạn, dài hạn để tạo ra các nguồn tài chính hợp pháp phù hợp với điều kiện nhà trường, thực tế địa phương</p>',
                                                            cauhoi: '<p>- Nhà trường có kế hoạch ngắn hạn, trung hạn, dài hạn để tạo ra các nguồn tài chính hợp pháp phù hợp với điều kiện nhà trường, thực tế địa phương không?</p>',
                                                            canthuthap: '<p>- Sổ nghị quyết và kế hoạch công tác;<br>- Sổ quản lý tài sản, tài chính;<br>- Báo cáo sơ kết tổng kết;</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]

                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.7: Quản lý cán bộ, giáo viên và nhân viên',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có kế hoạch bồi dưỡng chuyên môn, nghiệp vụ cho đội ngũ cán bộ quản lý, giáo viên và nhân viên;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường đã có đầy đủ kế hoạch hằng năm để bồi dưỡng chuyên môn, nghiệp vụ cho đội ngũ cán bộ quản lý, giáo viên và nhân viên.</p>',
                                                            cauhoi: '<p>Nhà trường có các kế hoạch bồi dưỡng chuyên môn, nghiệp vụ hằng năm cho đội ngũ cán bộ quản lý, giáo viên và nhân viên không?</p>',
                                                            canthuthap: '<p>- Kế hoạch bồi dưỡng, phát triển đội ngũ hằng năm.<br>- Kế hoạch bồi dưỡng cá nhân của giáo viên.<br>- Các báo cáo sơ kết, tổng kết hằng năm.</p>',
                                                            noithuthap: '<p>- Văn thư<br>-&nbsp;Giáo viên<br>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Phân công, sử dụng cán bộ quản lý, giáo viên, nhân viên rõ ràng, hợp lý đảm bảo hiệu quả các hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Hằng năm nhà trường đã có QĐ phân công, sử dụng cán bộ quản lý, giáo viên, nhân viên theo TT 16/2017.<br>-&nbsp;Việc phân công, sử dụng cán bộ quản lý, giáo viên và nhân viên đảm bảo hiệu quả hoạt động của nhà trường.</p>',
                                                            cauhoi: '<p>- Nhà trường đã có QĐ phân công, sử dụng cán bộ quản lý, giáo viên, nhân viên hằng năm đúng quy định không?<br>- Việc phân công đảm bảo hiệu quả hoạt động cho nhà trường không?</p>',
                                                            canthuthap: '<p>- Sổ quản lý cán bộ, giáo viên, nhân viên.<br>- Sổ nghị quyết và kế hoạch công tác.<br>- Các văn bản và biên bản cuộc họp liên quan.<br>- Kế hoạch giáo dục.<br>- Bảng phân công nhiệm vụ cho cán bộ, giáo viên, nhân viên hằng năm.</p>',
                                                            noithuthap: '<p>- Văn thư<br>- Văn thư<br>- Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Cán bộ quản lý, giáo viên và nhân viên được đảm bảo các quyền theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Cán bộ quản lý, giáo viên và nhân viên hằng năm được đảm bảo các quyền theo quy định tại Điều lệ trường tiểu học (Văn bản hợp nhât số 03/VBHN-BGDĐT ngày 22/01/2014 của Bộ GDĐT.</p>',
                                                            cauhoi: '<p>Cán bộ quản lý, giáo viên và nhân viên hăng năm trong trường được đảm bảo các quyền theo quy định tại Điều lệ trường tiểu học không?</p>',
                                                            canthuthap: '<p>- Bảng nhận chế độ lương và các chế độ phụ cấp khác của giáo viên hằng tháng.<br>- Quyết định, giấy triệu tập cử giáo viên đi tập huấn, bồi dưỡng chuyên môn nghiệp vụ.<br>- QĐ khen thưởng, cán bộ, giáo viên và nhân viên hằng năm.<br>- Hồ sơ văn bằng, chứng chỉ của cán bộ quản lý, giáo viên.<br>- Biên bản Hội nghị cán bộ, viên chức hằng năm.<br>- Báo cáo sơ kết, tổng kết công tác của công đoàn.</p>',
                                                            noithuthap: '<p>- Kế toán<br>- Hiệu trưởng.<br>- Công đoàn<br>- Văn thư<br>- Văn thư<br>- Công đoàn</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có các biện pháp để phát huy năng lực của cán bộ quản lý, giáo viên, nhân viên trong việc xây dựng, phát triển và nâng cao chất lượng giáo dục nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Hằng năm nhà trường có các biện pháp để phát huy năng lực của cán bộ, giáo viên, nhân viên trong việc xây dựng, phát triển và nâng cao chất lượng giáo dục.</p>',
                                                            cauhoi: '<p>Nhà trường có các biện pháp để phát huy năng lực của cán bộ, giáo viên, nhân viên trong việc xây dựng, phát triển và nâng cao chất lượng giáo dục nhà trường hằng năm không?</p>',
                                                            canthuthap: '<p>- Kế hoạch hoạt động hằng năm của nhà trường.<br>- Kế hoạch bồi dưỡng giáo viên hằng năm.</p>',
                                                            noithuthap: '<p>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.8: Quản lý các hoạt động giáo dục',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Kế hoạch giáo dục phù hợp với quy định hiện hành, điều kiện thực tế địa phương và điều kiện của nhà trường',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Kế hoạch hoạt động giáo dục của nhà trường đảm bảo:<br>- Phù hợp với quy định hiện hành;<br>- Phù hợp với điều kiện thực tế địa phương và điều kiện của nhà trường</p>',
                                                            cauhoi: '<p>- Nhà trường có kế hoạch hoạt động giáo dục đảm bảo phù hợp với quy định hiện hành và phù hợp với điều kiện thực tế địa phương và điều kiện của nhà trường không?</p>',
                                                            canthuthap: '<p>- Kế hoạch giáo dục;<br>- Kế hoạch giáo dục của giáo viên;<br>- Sổ khen thưởng, kỷ luật;<br>- Sổ nghị quyết và kế hoạch công tác;<br>- Sổ quản lý cán bộ, giáo viên, nhân viên;</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Kế hoạch giáo dục được thực hiện đầy đủ;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường thực hiện đầy đủ kế hoạch giáo dục.</p>',
                                                            cauhoi: '<p>- Nhà trường thực hiện đầy đủ kế hoạch giáo dục không?</p>',
                                                            canthuthap: '<p>- Sổ ghi nội dung các cuộc họp chuyên môn<br>- Biên bản sinh hoạt chuyên môn;<br>- Báo cáo sơ kết, tổng kết;<br>- Nghị quyết họp hội đồng nhà trường có liên quan;<br>- Biên bản sinh hoạt chuyên môn có nội dung liên quan.</p>',
                                                            noithuthap: '<p>Hiệu trưởng và Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Kế hoạch giáo dục được rà soát, đánh giá, điều chỉnh kịp thời',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Định kỳ nhà trường tiến hành rà soát , đánh giá, điều chỉnh kịp thời</p>',
                                                            cauhoi: '<p>- Định kỳ nhà trường tiến hành rà soát , đánh giá, điều chỉnh kịp thời không?</p>',
                                                            canthuthap: '<p>- Biên bản kiểm tra của cấp trên có liên quan.</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp chỉ đạo, kiểm tra, đánh giá của nhà trường đối với các hoạt động giáo dục, được cơ quan quản lý đánh giá hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Các biện pháp chỉ đạo, kiểm tra đánh giá của nhà trường đối với các hoạt động giáo dục được cơ quan quản lý đánh giá đạt hiệu quả</p>',
                                                            cauhoi: '<p>- Các biện pháp chỉ đạo, kiểm tra đánh giá của nhà trường đối với các hoạt động giáo dục được cơ quan quản lý đánh giá đạt hiệu quả không?</p>',
                                                            canthuthap: '<p>- Sổ nghị quyết và kế hoạch công tác;<br>- Kế hoạch giáo dục của nhà trường;<br>- Biên bản kiểm tra cấp có thẩm quyền có nội dung liên quan;<br>- Báo cáo sơ kết tổng kết;<br>- Bằng khen, Giấy khen, Giấy chứng nhận, ... của cấp có thẩm quyền.</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.9: Thực hiện quy chế dân chủ cơ sở',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Cán bộ quản lý, giáo viên, nhân viên được tham gia thảo luận, đóng góp ý kiến khi xây dựng kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Tại thời điểm đánh giá, nhà trường có các biên bản họp lấy ý kiến của cán bộ quản lý, giáo viên, nhân viên tham gia thảo luận, đóng góp ý kiến vào việc xây dựng kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường (theo quy định tại tại Quy chế thực hiện dân chủ trong hoạt động của nhà trường, ban hành kèm theo Quyết định số 04/2000/QĐ-BGDĐT, ngày 01/3/2000 của Bộ trưởng Bộ GDĐT); Các báo cáo của nhà trường hằng năm có nội dung đánh giá kết quả thực hiện kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường.</p>',
                                                            cauhoi: '<p>Tại thời điểm đánh giá, nhà trường có các biên bản họp lấy ý kiến của cán bộ quản lý, giáo viên, nhân viên tham gia thảo luận, đóng góp ý kiến vào việc xây dựng kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường và các báo cáo của nhà trường hằng năm có nội dung đánh giá kết quả thực hiện kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường hay không?</p>',
                                                            canthuthap: '<p>- Các biên bản họp lấy ý kiến của cán bộ quản lý, giáo viên, nhân viên tham gia thảo luận, đóng góp ý kiến vào việc xây dựng kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường (theo quy định tại tại Quy chế thực hiện dân chủ trong hoạt động của nhà trường, ban hành kèm theo Quyết định số 04/2000/QĐ-BGDĐT, ngày 01/3/2000 của Bộ trưởng Bộ GDĐT).<br>- Các báo cáo của nhà trường hằng năm có nội dung đánh giá kết quả thực hiện kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường.</p>',
                                                            noithuthap: '<p>- Nhà trường.<br>- Nhà trường.</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Các khiếu nại, tố cáo, kiến nghị, phản ánh (nếu có) thuộc thẩm quyền xử lý của nhà trường được giải quyết đúng pháp luật;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Hồ sơ giải quyết các khiếu nại, tố cáo, kiến nghị, phản ánh (nếu có) của cán bộ, giáo viên, nhân viên nhân viên, cha mẹ học sinh (thuộc thẩm quyền xử lý của nhà trường).<br>- Các báo cáo của Ban thanh tra nhân dân hằng năm.</p>',
                                                            cauhoi: '<p>- Hồ sơ giải quyết các khiếu nại, tố cáo, kiến nghị, phản ánh (nếu có) của cán bộ, giáo viên, nhân viên, nhân viên, cha mẹ học sinh (thuộc thẩm quyền xử lý của nhà trường) có được giải quyết đầu đủ, đúng pháp luật không?<br>- Có đầy đủ các báo cáo của Ban thanh tra nhân dân hằng năm hay không?</p>',
                                                            canthuthap: '<p>- Hồ sơ giải quyết các khiếu nại, tố cáo, kiến nghị, phản ánh (nếu có) của cán bộ, giáo viên, nhân viên, nhân viên, cha mẹ học sinh (thuộc thẩm quyền xử lý của nhà trường) có được giải quyết đầu đủ, đúng pháp luật.<br>- Có đầy đủ các báo cáo của Ban thanh tra nhân dân hằng năm.</p>',
                                                            noithuthap: '<p>- Nhà trường.<br>- Ban thanh tra nhân dân.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, có báo cáo thực hiện quy chế dân chủ cơ sở',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Quy chế thực hiện dân chủ ở cơ sở.<br>- Các báo cáo hằng năm của Ban chấp hành công đoàn nhà trường có nội dung đánh giá việc thực hiện Quy chế dân chủ ở cơ sở.</p>',
                                                            cauhoi: '<p>- Nhà trường có Quy chế thực hiện dân chủ ở cơ sở hay không?<br>- Các báo cáo hằng năm của Ban chấp hành công đoàn nhà trường có nội dung đánh giá việc thực hiện Quy chế dân chủ ở cơ sở hay không?</p>',
                                                            canthuthap: '<p>- Quy chế thực hiện dân chủ ở cơ sở.<br>- Các báo cáo hằng năm của Ban chấp hành công đoàn nhà trường có nội dung đánh giá việc thực hiện Quy chế dân chủ ở cơ sở.</p>',
                                                            noithuthap: '<p>Nhà trường và BCH công đoàn nhà trường.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp và cơ chế giám sát việc thực hiện quy chế dân chủ cơ sở đảm bảo công khai, minh bạch, hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Nhà trường có các biên bản họp lấy ý kiến của cán bộ quản lý, giáo viên, nhân viên tham gia thảo luận, đóng góp ý kiến vào việc xây dựng kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường (theo quy định tại tại Quy chế thực hiện dân chủ trong hoạt động của nhà trường, ban hành kèm theo Quyết định số 04/2000/QĐ-BGDĐT, ngày 01/3/2000 của Bộ trưởng Bộ GDĐT); Các báo cáo của nhà trường hằng năm có nội dung đánh giá kết quả thực hiện kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường.<br>- Kế hoạch của nhà trường về việc thực hiện quy chế dân chủ ở cơ sở.</p>',
                                                            cauhoi: '<p>- Nhà trường có các biên bản họp lấy ý kiến của cán bộ quản lý, giáo viên, nhân viên tham gia thảo luận, đóng góp ý kiến vào việc xây dựng kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường và các báo cáo của nhà trường hằng năm có nội dung đánh giá kết quả thực hiện kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường hay không?<br>- Nhà trường có kế hoạch về việc thực hiện quy chế dân chủ ở cơ sở đảm bảo công khai, minh bạch, hiệu quả hay không?.</p>',
                                                            canthuthap: '<p>- Các biên bản họp lấy ý kiến của cán bộ quản lý, giáo viên, nhân viên tham gia thảo luận, đóng góp ý kiến vào việc xây dựng kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường (theo quy định tại tại Quy chế thực hiện dân chủ trong hoạt động của nhà trường, ban hành kèm theo Quyết định số 04/2000/QĐ-BGDĐT, ngày 01/3/2000 của Bộ trưởng Bộ GDĐT).<br>- Các báo cáo của nhà trường hằng năm có nội dung đánh giá kết quả thực hiện kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường.<br>- Kế hoạch của nhà trường về việc thực hiện quy chế dân chủ ở cơ sở đảm bảo công khai, minh bạch, hiệu quả.</p>',
                                                            noithuthap: '<p>- Nhà trường.<br>- Nhà trường.<br>- Nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.10: Đảm bảo an ninh trật tự, an toàn trường học',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng, chống tai nạn, thương tích; an toàn phòng, chống cháy, nổ; an toàn phòng, chống thảm họa, thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường; những trường có tổ chức bếp ăn cho học sinh được cấp giấy chứng nhận đủ điều kiện an toàn thực phẩm;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường có phương án đảm bảo an ninh trật tự an toàn phòng chống tai nạn thương tích, phòng chống cháy nổ,phòng chống thảm họa thiên tai, phòng chống dịch bệnh,phòng chống các tệ nạn xã hội và bạo lực trong nhà trường.</p>',
                                                            cauhoi: '<p>Nhà trường có phương án đảm bảo an ninh trật tự an toàn phòng chống tai nạn thương tích, phòng chống cháy nổ, phòng chống thảm họa thiên tai, phòng chống dịch bệnh,phòng chống các tệ nạn xã hội và bạo lực trong nhà trường không?</p>',
                                                            canthuthap: '<p>Văn bản phối hợp với cơ quan công an có nội dung liên quan.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có hộp thư góp ý, đường dây nóng và các hình thức khác để tiếp nhận, xử lý các thông tin phản ánh của người dân; đảm bảo an toàn cho cán bộ quản lý, giáo viên, nhân viên và học sinh trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường có điện thoại đường dây nóng để tiếp nhận xử lí thông tin phản ánh của người dân.</p>',
                                                            cauhoi: '<p>Nhà trường có điện thoại đường dây nóng để tiếp nhận xử lí thông tin phản ánh của người dân không?</p>',
                                                            canthuthap: '<p>Số điện thoại đường dây nóng của nhà trường</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Không có hiện tượng kỳ thị, hành vi bạo lực, vi phạm pháp luật về bình đẳng giới trong nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường không có hiện tượng kì thị hành vi bạo lực vi phạm pháp luât về bình đẳng giới</p>',
                                                            cauhoi: '<p>Nhà trường có hiện tượng kì thị hành vi bạo lực vi phạm pháp luật về bình đẳng giới không ?</p>',
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Cán bộ quản lý, giáo viên, nhân viên và học sinh được phổ biến, hướng dẫn, thực hiện phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng, chống tai nạn, thương tích; an toàn phòng, chống cháy, nổ; an toàn phòng, chống thảm họa, thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường phổ biến cho giáo viên, nhân viên và học sinh có phương án đảm bảo an ninh trật tự an toàn phòng chống tai nạn thương tích,phòng chống cháy nổ, phòng chống thảm họa thiên tai, phòng chống dịch bệnh, phòng chống các tệ nạn xã hội và bạo lực trong nhà trường.</p>',
                                                            cauhoi: '<p>Nhà trường phổ biến cho giáo viên, nhân viên và học sinh có phương án đảm bảo an ninh trật tự an toàn phòng chống tai nạn thương tích, phòng chống cháy nổ, phòng chống thảm họa thiên tai, phòng chống dịch bệnh, phòng chống các tệ nạn xã hội và bạo lực trong nhà trường không?</p>',
                                                            canthuthap: '<p>Biên bản họp hội đồng nhà trường</p>',
                                                            noithuthap: '<p>Hiệu Trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Nhà trường thường xuyên kiểm tra, thu thập, đánh giá, xử lý các thông tin, biểu hiện liên quan đến bạo lực học đường, an ninh trật tự và có biện pháp ngăn chặn kịp thời, hiệu quả;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường kiểm tra xử lí các thông tin liên quan đến bạo lực học đường, đảm bảo an ninh trật tự ngăn chặn kịp thời hiệu quả.</p>',
                                                            cauhoi: '<p>Nhà trường kiểm tra xử lí các thông tin liên quan đến bạo lực học đường, đảm bảo an ninh trật tự ngăn chặn kịp thời hiệu quả không?</p>',
                                                            canthuthap: '<p>Báo cáo sơ kết tổng kết.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về tiêu chuẩn 1',
                                                    loaichimuc: 5,
                                                }
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 2: Cán bộ quản lý, giáo viên, nhân viên và học sinh',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.1: Đối với hiệu trưởng, phó hiệu trưởng',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đạt tiêu chuẩn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hiệu trưởng; phó hiệu trưởng đạt các yêu cầu theo quy định tại Điều lệ trường Tiểu học</p>',
                                                            cauhoi: '<p>Hiệu trưởng; phó hiệu trưởng đạt các yêu cầu theo quy định tại Điều lệ trường Tiểu học không?</p>',
                                                            canthuthap: '<p>- Kết quả đánh giá, xếp loại hiệu trưởng, phó hiệu trưởng hằng năm.<br>- Các hình thức khen thưởng hiệu trưởng, phó hiệu trưởng</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Được đánh giá đạt chuẩn hiệu trưởng trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hiệu trưởng; phó hiệu trưởng được đánh giá đạt chuẩn hiệu trưởng trở lên theo Quy định chuẩn hiệu trưởng</p>',
                                                            cauhoi: '<p>Hiệu trưởng; phó hiệu trưởng được đánh giá đạt chuẩn hiệu trưởng trở lên theo Quy định chuẩn hiệu trưởng không?</p>',
                                                            canthuthap: '<p>- Kết quả đánh giá, xếp loại hiệu trưởng, phó hiệu trưởng hằng năm.<br>- Các hình thức khen thưởng hiệu trưởng, phó hiệu trưởng</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Được bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lý giáo dục theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hiệu trưởng, phó hiệu trưởng được dự các lớp bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lí giáo dục theo quy định</p>',
                                                            cauhoi: '<p>Hiệu trưởng, phó hiệu trưởng được dự các lớp bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lí giáo dục theo quy định không?</p>',
                                                            canthuthap: '<p>- Văn bản triệu tập hiệu trưởng, phó hiệu trưởng tham dự các lớp bồi dưỡng, tập huấn chuyên môn.<br>- Kết quả học tập tại các lớp bồi dưỡng, tập huấn.<br>- Chứng chỉ hoặc chứng nhận đã qua lớp bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lý giáo dục.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 02 năm được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trong 5 năm liên tiếp tính đến thời điểm đánh giá có ít nhất 02 năm được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên theo quy định chuẩn hiệu trưởng</p>',
                                                            cauhoi: '<p>Trong 5 năm liên tiếp tính đến thời điểm đánh giá có ít nhất 02 năm được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên theo quy định chuẩn hiệu trưởng không?</p>',
                                                            canthuthap: '<p>- Kết quả đánh giá, xếp loại hiệu trưởng, phó hiệu trưởng hằng năm.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Được bồi dưỡng, tập huấn về lý luận chính trị theo quy định; được giáo viên, nhân viên trong trường tín nhiệm.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Hiệu trưởng, phó hiệu trưởng nhà trường được bồi dưỡng, tập huấn về lí luận chính trị theo quy định, được giáo viên, nhân viên trong trường tín nhiệm</p>',
                                                            cauhoi: '<p>Hiệu trưởng, phó hiệu trưởng nhà trường được bồi dưỡng, tập huấn về lí luận chính trị theo quy định, được giáo viên, nhân viên trong trường tín nhiệm không?</p>',
                                                            canthuthap: '<p>- Văn bản triệu tập hiệu trưởng, phó hiệu trưởng tham dự các lớp bồi dưỡng, tập huấn về lí luận chính trị.<br>- Chứng chỉ hoặc chứng nhận đã qua lớp bồi dưỡng, tập huấn về lí luận chính trị.<br>- Biên bản lấy ý kiến của giáo viên, nhân viên góp ý về công tác quản lí giáo dục của nhà trường hằng năm.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trong 05 năm liên tiếp tính đến thời điểm đánh giá, đạt chuẩn hiệu trưởng ở mức khá trở lên, trong đó có ít nhất 01 năm đạt chuẩn hiệu trưởng ở mức tốt;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Trong 5 năm liên tiếp tính đến thời điểm đánh giá, hiệu trưởng, phó hiệu trưởng nhà trường đạt chuẩn ở mức khá trở lên, trong đó có ít nhất 01 năm đạt chuẩn ở mức tốt theo Quy định chuẩn hiệu trưởng.</p>',
                                                            cauhoi: '<p>Trong 5 năm liên tiếp tính đến thời điểm đánh giá, hiệu trưởng, phó hiệu trưởng nhà trường đạt chuẩn ở mức khá trở lên, trong đó có ít nhất 01 năm đạt chuẩn ở mức tốt theo Quy định chuẩn hiệu trưởng không?</p>',
                                                            canthuthap: '<p>- Kết quả đánh giá, xếp loại hiệu trưởng, phó hiệu trưởng hằng năm.<br>- Sổ quản lí cán bộ, giáo viên, nhân viên<br>- Sổ khen thưởng kỉ luật</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.2: Đối với giáo viên',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Số lượng giáo viên đảm bảo để dạy các môn học và tổ chức các hoạt động giáo dục theo quy định của Chương trình giáo dục phổ thông cấp tiểu học; có giáo viên làm Tổng phụ trách Đội Thiếu niên Tiền phong Hồ Chí Minh;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Số lượng giáo viên đảm bảo để dạy các môn học và tổ chức các hoạt động giáo dục theo quy định của Chương trình giáo dục phổ thông cấp tiểu học; có giáo viên làm Tổng phụ trách Đội Thiếu niên tiền phong Hồ Chí Minh;</p>',
                                                            cauhoi: '<p>Số lượng giáo viên đảm bảo để dạy các môn học và tổ chức các hoạt động giáo dục theo quy định của Chương trình giáo dục phổ thông cấp tiểu học; có giáo viên làm Tổng phụ trách Đội Thiếu niên tiền phong Hồ Chí Minh không ?</p>',
                                                            canthuthap: '<p>Bảng phân công chuyên môn của nhà trường.</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) 100% giáo viên đạt chuẩn trình độ đào tạo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>100% giáo viên đạt chuẩn trình độ đào tạo theo quy định;</p>',
                                                            cauhoi: '<p>100% giáo viên đạt chuẩn trình độ đào tạo theo quy định;</p>',
                                                            canthuthap: '<p>Sổ quản lý cán bộ, giáo viên, công nhân viên</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Có ít nhất 95% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên. ',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Có ít nhất 95% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên</p>',
                                                            cauhoi: '<p>Có ít nhất 95% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên không?</p>',
                                                            canthuthap: '<p>Danh sách giáo viên có thông tin về trình độ đào tạo</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 55%; đối với các trường thuộc vùng khó khăn đạt ít nhất 40% ;trong 05 năm liên tiếp tính đến thời điểm đánh giá, tỷ lệ giáo viên trên chuẩn trình độ đào tạo được duy trì ổn định và tăng dần theo lộ trình phù hợp;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 55%; đối với các trường thuộc vùng khó khăn đạt ít nhất 40%; trong 05 năm liên tiếp tính đến thời điểm đánh giá, tỷ lệ giáo viên trên chuẩn trình độ đào tạo được duy trì ổn định và tăng dần theo lộ trình phù hợp;</p>',
                                                            cauhoi: '<p>Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 55%; đối với các trường thuộc vùng khó khăn đạt ít nhất 40%; trong 05 năm liên tiếp tính đến thời điểm đánh giá, tỷ lệ giáo viên trên chuẩn trình độ đào tạo được duy trì ổn định và tăng dần theo lộ trình phù hợp không?</p>',
                                                            canthuthap: '<p>Danh sách giáo viên có thông tin về trình độ đào tạo</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có 100% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên, trong đó có ít nhất 60% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên và có ít nhất 50% ở mức khá trở lên đối với trường thuộc vùng khó khăn;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có 100% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên, trong đó có ít nhất 60% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên và có ít nhất 50% ở mức khá trở lên đối với trường thuộc vùng khó khăn;</p>',
                                                            cauhoi: '<p>Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có 100% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên, trong đó có ít nhất 60% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên và có ít nhất 50% ở mức khá trở lên đối với trường thuộc vùng khó khăn không?</p>',
                                                            canthuthap: '<p>Kết quả đánh giá, xếp loại GV hằng năm của nhà trường theo quy định chuẩn nghề nghiệp GV</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có giáo viên bị kỷ luật từ hình thức cảnh cáo trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có giáo viên bị kỷ luật từ hình thức cảnh cáo trở lên.</p>',
                                                            cauhoi: '<p>Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có giáo viên bị kỷ luật từ hình thức cảnh cáo trở lên không?</p>',
                                                            canthuthap: '<p>Sổ khen thưởng, kỷ luật.</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 65%, đối với các trường thuộc vùng khó khăn đạt ít nhất 50%',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 65%, đối với các trường thuộc vùng khó khăn đạt ít nhất 50%;</p>',
                                                            cauhoi: '<p>Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 65%, đối với các trường thuộc vùng khó khăn đạt ít nhất 50% không?</p>',
                                                            canthuthap: '<p>Danh sách giáo viên đạt trên chuẩn về trình độ đào tạo của nhà trường</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 80% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 30% đạt chuẩn nghề nghiệp giáo viên ở mức tốt; đối với trường thuộc vùng khó khăn có ít nhất 70% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 20% đạt chuẩn nghề nghiệp giáo viên ở mức tốt;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 80% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 30% đạt chuẩn nghề nghiệp giáo viên ở mức tốt; đối với trường thuộc vùng khó khăn có ít nhất 70% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 20% đạt chuẩn nghề nghiệp giáo viên ở mức tốt.</p>',
                                                            cauhoi: '<p>Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 80% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 30% đạt chuẩn nghề nghiệp giáo viên ở mức tốt; đối với trường thuộc vùng khó khăn có ít nhất 70% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 20% đạt chuẩn nghề nghiệp giáo viên ở mức tốt không?</p>',
                                                            canthuthap: '<p>Kết quả đánh giá, xếp loại GV hằng năm của nhà trường theo quy định chuẩn nghề nghiệp GV</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.3: Đối với nhân viên',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có nhân viên hoặc giáo viên kiêm nhiệm để đảm nhiệm các nhiệm vụ do hiệu trưởng phân công;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Số lượng nhân viên đáp ứng các nhiệm vụ được giao<br>- Trong trường hợp nhà trường không có đủ nhân viên theo quy định tại thông tư liên tịch số 16/1017/TT- BGD ĐT ngày 12 tháng 7 năm 2017 về việc hướng dẫn danh mục khung vị trí việc làm và định mức số lượng người làm việc trong các cơ sở giáo dục phổ thông công lập, giáo viên có thể kiêm nhiệm công việc thủ quỹ, văn thư, …</p>',
                                                            cauhoi: '<p>Số lượng nhân viên đáp ứng các nhiệm vụ được giao không?<br>Trong trường hợp nhà trường không có đủ nhân viên theo quy định tại thông tư liên tịch số 16/1017/TT- BGD ĐT ngày 12 tháng 7 năm 2017 về việc hướng dẫn danh mục khung vị trí việc làm và định mức số lượng người làm việc trong các cơ sở giáo dục phổ thông công lập, giáo viên có thể kiêm nhiệm công việc thủ quỹ, văn thư không?</p>',
                                                            canthuthap: '<p>Số lượng nhân viên đáp ứng các nhiệm vụ được giao không?<br>Trong trường hợp nhà trường không có đủ nhân viên theo quy định tại thông tư liên tịch số 16/1017/TT- BGD ĐT ngày 12 tháng 7 năm 2017 về việc hướng dẫn danh mục khung vị trí việc làm và định mức số lượng người làm việc trong các cơ sở giáo dục phổ thông công lập, giáo viên có thể kiêm nhiệm công việc thủ quỹ, văn thư không?</p>',
                                                            noithuthap: '<p>- Sổ quản lý cán bộ, giáo viên , nhân viên.<br>- Sổ khen thưởng, kỉ luật.<br>- Danh sách nhân viên của nhà trường có thông tin về trình độ nghiệp vụ.</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Được phân công công việc phù hợp, hợp lý theo năng lực;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhân viên nhà trường được phân công công việc phù hợp với chuyên môn nghiệp vụ, năng lực thực tế của mỗi người.</p>',
                                                            cauhoi: '<p>Nhân viên nhà trường được phân công công việc phù hợp với chuyên môn nghiệp vụ, năng lực thực tế của mỗi người không?</p>',
                                                            canthuthap: '<p>- Bảng phân công nhiệm vụ cho giáo viên, nhân viên hằng năm.</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Hoàn thành các nhiệm vụ được giao.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhân viên nhà trường hoàn thành các nhiệm vụ được giao.</p>',
                                                            cauhoi: '<p>Nhân viên nhà trường có hoàn thành các nhiệm vụ được giao không?</p>',
                                                            canthuthap: '<p>- Bảng tổng hợp kết quả đánh giá, xếp loại nhân viên hằng năm.<br>- Báo cáo sơ kết tổng kết.<br>- Sổ khen thưởng kỷ luật</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Số lượng và cơ cấu nhân viên đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường có đủ nhân viên theo quy định tại thông tư liên tịch số 16/1017/TT- BGD ĐT ngày 12 tháng 7 năm 2017 về việc hướng dẫn danh mục khung vị trí việc làm và định mức số lượng người làm việc trong các cơ sở giáo dục phổ thông công lập.</p>',
                                                            cauhoi: '<p>Nhà trường có đủ nhân viên theo quy định tại thông tư liên tịch số 16/1017/TT- BGD ĐT ngày 12 tháng 7 năm 2017 về việc hướng dẫn danh mục khung vị trí việc làm và định mức số lượng người làm việc trong các cơ sở giáo dục phổ thông công lập không?</p>',
                                                            canthuthap: '<p>- Sổ quản lý cán bộ giáo viên, nhân viên.<br>- Sổ khen thưởng kỷ luật.<br>- Bảng phân công nhiệm vụ cho giáo viên, nhân viên hằng năm.<br>-Danh sách nhân viên của nhà trường có thông tin về trình độ nghiệp vụ.</p>',
                                                            noithuthap: '<p>Hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có nhân viên bị kỷ luật từ hình thức cảnh cáo trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trong 5 năm liên tiếp tính đến thời điểm đánh giá, không có nhân viên nào bị kỉ luật từ hình thức cảnh báo trở lên</p>',
                                                            cauhoi: '<p>Trong 5 năm liên tiếp tính đến thời điểm đánh giá, không có nhân viên nào bị kỉ luật từ hình thức cảnh báo trở lên không?</p>',
                                                            canthuthap: '<p>- Báo cáo sơ kết tổng kết.<br>- Danh sách đánh giá xếp loại nhân viên hằng năm.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có trình độ đào tạo đáp ứng được vị trí việc làm;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Nhân viên có trình độ đào tạo đáp ứng được vị trí việc làm:<br>- Nhân viên kế toán, văn thư, y tế và thủ quỹ có bằng tốt nghiệp trung cấp trở lên theo chuyên môn được giao<br>- Đối với nhân viên nấu ăn , bảo vệ phải được bồi dưỡng về nghiệp vụ được giáo</p>',
                                                            cauhoi: '<p>Nhân viên có trình độ đào tạo đáp ứng được vị trí việc làm:<br>- Nhân viên kế toán, văn thư, y tế và thủ quỹ có bằng tốt nghiệp trung cấp trở lên theo chuyên môn được giao không?<br>Đối với nhân viên nấu ăn , bảo vệ phải được bồi dưỡng về nghiệp vụ được giáo không?</p>',
                                                            canthuthap: '<p>- Danh sách nhân viên của nhà trường có thông tin về trình độ đào tạo và nghiệp vụ</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Hằng năm, được tham gia đầy đủ các khóa, lớp tập huấn, bồi dưỡng chuyên môn, nghiệp vụ theo vị trí việc làm',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Hằng năm, các nhân viên được tham gia đầy đủ các khóa, lớp tập huấn, bồi dưỡng chuyên môn, nghiệp vụ theo vị trí được phân công</p>',
                                                            cauhoi: '<p>Hằng năm, các nhân viên được tham gia đầy đủ các khóa, lớp tập huấn, bồi dưỡng chuyên môn, nghiệp vụ theo vị trí được phân công không?</p>',
                                                            canthuthap: '<p>- Kết quả học tập tại các lớp bồi dưỡng , tập huấn về chuyên môn, nghiệp vụ.<br>- Văn bản triệu tập nhân viên tham dự các lớp bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ.<br>- Chứng chỉ hoặc chứng nhận đã qua lớp bồi dưỡng, tập huấn về chuyên môn , nghiệp vụ.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.4: Đối với học sinh',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đảm bảo về tuổi học sinh tiểu học theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Đảm bảo về tuổi học sinh tiểu học theo quy định .</p>',
                                                            cauhoi: '<p>Học sinh có đảm bảo về tuổi học sinh tiểu học theo quy định không?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Học bạ học sinh<br>- Các hình thức khen thưởng hiệu trưởng, phó hiệu trưởng</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Thực hiện các nhiệm vụ theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Thực hiện các nhiệm vụ theo quy định Điều lệ trường tiểu học.</p>',
                                                            cauhoi: '<p>Học sinh có Thực hiện các nhiệm vụ theo quy định Điều lệ trường tiểu học không?</p>',
                                                            canthuthap: '<p>- Học bạ học sinh<br>- Sổ liên lạc</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Được đảm bảo các quyền theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Được đảm bảo các quyền theo quy định Điều lệ trường tiểu học vác quy định khác ( như Luật trẻ em )</p>',
                                                            cauhoi: '<p>Học sinh của trường được đảm bảo các quyền theo quy định Điều lệ trường tiểu học vác quy định khác ( như Luật trẻ em )</p>',
                                                            canthuthap: '<p>- Phiếu hỏi về việc đảm bảo các quyền cho học sinh của nhà trường.<br>- Báo cáo sơ kết, tổng kết</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Học sinh vi phạm các hành vi không được làm được phát hiện kịp thời, được áp dụng các biện pháp giáo dục phù hợp và có chuyển biến tích cực.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Học sinh vi phạm các hành vi không được làm được phát hiện kịp thời, có các biện pháp giáo dục phù hợp và có chuyển biến tích cực.</p>',
                                                            cauhoi: '<p>Học sinh vi phạm các hành vi không được làm được phát hiện kịp thời, có các biện pháp giáo dục phù hợp và có chuyển biến tích cực không?</p>',
                                                            canthuthap: '<p>- Sổ chủ nhiệm</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Học sinh có thành tích trong học tập, rèn luyện có ảnh hưởng tích cực đến các hoạt động của lớp và nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Học sinh có thành tích trong học tập, rèn luyện có ảnh hưởng tích cực đến các hoạt động của lớp và nhà trường</p>',
                                                            cauhoi: '<p>Học sinh có thành tích trong học tập, rèn luyện có ảnh hưởng tích cực đến các hoạt động của lớp và nhà trường không?</p>',
                                                            canthuthap: '<p>- Sổ chủ nhiệm.<br>- Các hình thức khen thưởng đối với học sinh của nhà trường.<br>- Báo cáo sơ kết, tổng kết .</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 2',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 3: Cơ sở vật chất và thiết bị dạy học',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.1: Khuôn viên, khu sân chơi, sân tập',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Khuôn viên đảm bảo xanh, sạch, đẹp, an toàn để tổ chức các hoạt động giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Khuôn viên đảm bảo xanh, sạch, đẹp, an toàn để tổ chức các hoạt động giáo dục</p>',
                                                            cauhoi: '<p>Khuôn viên có đảm bảo xanh, sạch, đẹp, an toàn để tổ chức các hoạt động giáo dục không?</p>',
                                                            canthuthap: '<p>- Giấy chứng nhận quyền sử dụng đất của nhà trường<br>- Hồ sơ thiết kế xây dựng của nhà trường.<br>- Kế hoạch xây dựng trường học xanh, sạch, đẹp, an toàn.<br>- Báo cáo sơ kết về việc thực hiện trường học xanh, sạch, đẹp, an toàn</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có cổng trường, biển tên trường và tường hoặc hàng rào bao quanh;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Có cổng trường, biển tên trường và tường hoặc hàng rào bao quanh.</p>',
                                                            cauhoi: '<p>Trường có cổng trường, biển tên trường và tường hoặc hàng rào bao quanh không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Có sân chơi, sân tập thể dục thể thao.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Có sân chơi, sân tập thể dục thể thao</p>',
                                                            cauhoi: '<p>Trường có sân chơi, sân tập thể dục thể thao không?</p>',
                                                            canthuthap: '<p>- Báo cáo sơ kết của nhà trường.<br>- Báo cáo tổng kết của nhà trường.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Diện tích khuôn viên, sân chơi, sân tập theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Diện tích xây dựng công trình và diện tích sân vườn của nhà trường đảm bảo theo tiêu chuẩn quốc gia TCVN 8793:2011 về yêu cầu thiết kế trường tiểu học.</p>',
                                                            cauhoi: '<p>Diện tích xây dựng công trình và diện tích sân vườn của nhà trường có đảm bảo theo tiêu chuẩn quốc gia TCVN 8793:2011 về yêu cầu thiết kế trường tiểu học không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường.<br>- Sổ quản lí tài sản, tài chính</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Sân chơi, sân tập đảm bảo cho học sinh luyện tập thường xuyên và hiệu quả;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Sân chơi, sân tập của nhà trường đảm bảo cho học sinh luyện tập thường xuyên và hiệu quả.</p>',
                                                            cauhoi: '<p>Sân chơi, sân tập của nhà trường có đảm bảo cho học sinh luyện tập thường xuyên và hiệu quả không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường.<br>- Báo cáo sơ kết của nhà trường.<br>- Báo cáo tổng kết của nhà trường.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Sân chơi, sân tập bằng phẳng, có cây bóng mát, có đồ chơi, thiết bị vận động.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Trường có sân chơi, sân tập bằng phẳng, có cây bóng mát, có đồ chơi, thiết bị vận động.</p>',
                                                            cauhoi: '<p>Trường có sân chơi, sân tập bằng phẳng, có cây bóng mát, có đồ chơi, thiết bị vận động không?</p>',
                                                            canthuthap: '<p>- Sổ quản lí tài sản, tài chính<br>- Báo cáo sơ kết của nhà trường.<br>- Báo cáo tổng kết của nhà trường.</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.2: Phòng học',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đủ mỗi lớp một phòng học riêng, quy cách phòng học theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Trường có đủ mỗi lớp một phòng học riêng, quy cách phòng học theo quy định.</p>',
                                                            cauhoi: '<p>Trường có đủ mỗi lớp một phòng học riêng, quy cách phòng học theo quy định không?</p>',
                                                            canthuthap: '<p>- Sổ quản lí tài sản, tài chính.<br>- Biên bản kiểm kê tài sản, cơ sở vật chất.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Bàn, ghế học sinh đúng tiêu chuẩn và đủ chỗ ngồi cho học sinh; có bàn ghế phù hợp cho học sinh khuyết tật học hòa nhập (nếu có); bàn, ghế giáo viên, bảng lớp theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường có đủ bàn, ghế học sinh đúng tiêu chuẩn và đủ chỗ ngồi cho học sinh; bàn 2 chỗ ngồi.<br>- Nhà trường có bàn ghế phù hợp cho học sinh khuyết tật học hòa nhập.<br>- Nhà trường trang bị bàn, ghế giáo viên, bảng lớp theo đúng quy định</p>',
                                                            cauhoi: '<p>- Nhà trường có bàn, ghế học sinh đúng tiêu chuẩn và đủ chỗ ngồi cho học sinh (bàn 2 chỗ ngồi); có bàn ghế phù hợp cho học sinh khuyết tật học hòa nhập và có bàn, ghế giáo viên, bảng lớp theo quy định không?</p>',
                                                            canthuthap: '<p>- Bảng theo dõi tài sản từng lớp<br>&nbsp;</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Có hệ thống đèn, hệ thống quạt (ở nơi có điện); có hệ thống tủ đựng hồ sơ, thiết bị dạy học.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường có đủ hệ thống đèn, hệ thống quạt trang bị ở các phòng; có hệ thống tủ đựng hồ sơ, thiết bị dạy học.</p>',
                                                            cauhoi: '<p>Nhà trường có đủ hệ thống đèn, hệ thống quạt trang bị ở các phòng và có hệ thống tủ đựng hồ sơ, thiết bị dạy học không?</p>',
                                                            canthuthap: '<p>- Bảng theo dõi tài sản từng bộ phận: (Hiệu trưởng, chuyên môn, kế toán- văn thư, thư viện thiết bị)</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Diện tích phòng học đạt tiêu chuẩn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường có đủ các phòng học diện tích đạt tiêu chuẩn theo quy định, đảm bảo theo tiêu chuẩn quốc gia TCVN 8793:2011 về yêu cầu thiết kế trường tiểu học.</p>',
                                                            cauhoi: '<p>Diện tích các phòng học của nhà trường có đạt tiêu chuẩn theo quy định, đảm bảo theo tiêu chuẩn quốc gia TCVN 8793:2011 về yêu cầu thiết kế trường tiểu học không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường.<br>- Sổ quản lí tài sản, tài chính</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Tủ đựng thiết bị dạy học có đủ các thiết bị dạy học;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Kích thước, vật liệu, kết cấu, kiểu dáng, màu sắc bàn, ghế học sinh theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường có đủ hệ thống tủ, kệ, giá đựng đồ chơi, đồ dùng, tài liệu:<br>- Đảm bảo đầy đủ, theo quy định tại điều lệ trường tiểu học<br>- Được sắp xếp hợp lí<br>- An toàn, thuận tiện khi sử dụng.</p>',
                                                            cauhoi: '<p>Nhà trường có đảm bảo đầy đủ hệ thống tủ, kệ, giá đựng đồ chơi, đồ dùng, tài liệu theo quy định tại điều lệ trường tiểu học đã được sắp xếp một cách hợp lí, an toàn và thuận tiện khi sử dụng không?</p>',
                                                            canthuthap: '<p>- Báo cáo sơ kết của thiết bị, thư viện<br>- Biên bản kiểm kê tài sản, cơ sở vật chất</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có các phòng riêng biệt để dạy các môn âm nhạc, mỹ thuật, khoa học và ngoại ngữ; có phòng để hỗ trợ cho học sinh có hoàn cảnh khó khăn, học sinh có năng khiếu (nếu có).',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Nhà trường có các phòng riêng biệt để dạy các môn Âm nhạc, mĩ thuật, khoa học và ngoại ngữ.</p>',
                                                            cauhoi: '<p>Nhà trường có bố trí các phòng riêng biệt để dạy các môn Âm nhạc, mĩ thuật, khoa học và ngoại ngữ không?</p>',
                                                            canthuthap: '<p>- Sổ quản lí tài sản, tài chính<br>- Sơ đồ tổng thể các phòng của nhà trường.<br>- Biên bản kiểm kê tài sản</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.3: Khối phòng phục vụ học tập và khối phòng hành chính - quản trị',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có phòng giáo dục nghệ thuật, phòng học tin học, phòng thiết bị giáo dục, phòng truyền thống và hoạt động Đội đáp ứng các yêu cầu tối thiểu các hoạt động giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Trường có phòng giáo dục nghệ thuật, phòng học tin học, phòng thiết bị giáo dục, phòng truyền thống và hoạt động Đội đáp ứng các yêu cầu tối thiểu các hoạt động giáo dục.</p>',
                                                            cauhoi: '<p>Trường có đủ phòng giáo dục nghệ thuật, phòng học tin học, phòng thiết bị giáo dục, phòng truyền thống và hoạt động Đội đáp ứng các yêu cầu tối thiểu các hoạt động giáo dục không?</p>',
                                                            canthuthap: '<p>- Sổ quản lí tài sản, tài chính.<br>- Sơ đồ tổng thể của nhà trường.<br>- Bảng theo dõi tài sản phòng tin học, phòng hoạt động Đội</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Khối phòng hành chính - quản trị đáp ứng các yêu cầu tối thiểu các hoạt động hành chính - quản trị của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Khối phòng hành chính - quản trị của nhà trường được trang bị đầy đủ bàn, ghế, tủ, máy tính và các phương tiện khác để làm việc.</p>',
                                                            cauhoi: '<p>Khối phòng hành chính - quản trị của nhà trường được trang bị đầy đủ bàn, ghế, tủ, máy tính và các phương tiện khác để làm việc không?</p>',
                                                            canthuthap: '<p>Biên bản kiểm kê tài sản</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Khu để xe được bố trí hợp lý, đảm bảo an toàn, trật tự.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường có khu để xe cho giáo viên, cán bộ, nhân viên và được bố trí hợp lý, đảm bảo an toàn, trật tự.</p>',
                                                            cauhoi: '<p>Nhà trường có khu để xe cho giáo viên, cán bộ, nhân viên và được bố trí hợp lý, đảm bảo an toàn, trật tự không?</p>',
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Khối phòng phục vụ học tập và khối phòng hành chính - quản trị theo quy định; khu bếp, nhà ăn, nhà nghỉ (nếu có) phải đảm bảo điều kiện sức khỏe, an toàn, vệ sinh cho giáo viên, nhân viên và học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường có đủ các phòng: Văn phòng trường, phòng hiệu trưởng, phòng phó hiệu trưởng, phòng hành chính quản trị, phòng y tế, phòng bảo vệ, phòng dành riêng cho nhân viên đảm bảo đủ diện tích theo quy định tại Điều lệ trường tiểu học.</p>',
                                                            cauhoi: '<p>Nhà trường có đủ các phòng: Văn phòng trường, phòng hiệu trưởng, phòng phó hiệu trưởng, phòng hành chính quản trị, phòng y tế, phòng bảo vệ, phòng dành riêng cho nhân viên đảm bảo đủ diện tích theo quy định tại Điều lệ trường tiểu học không?</p>',
                                                            canthuthap: '<p>- Sổ quản lí tài sản, tài chính<br>- Biên bản kiểm kê tài sản</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có nơi lưu trữ hồ sơ, tài liệu chung.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Nhà trường có bố trí nơi lưu trữ hồ sơ, tài liệu chung.</p>',
                                                            cauhoi: '<p>Nhà trường có bố trí nơi lưu trữ hồ sơ, tài liệu chung không?</p>',
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Khối phòng phục vụ học tập, phòng hành chính - quản trị có đầy đủ các thiết bị, được sắp xếp hợp lý, khoa học và hỗ trợ hiệu quả các hoạt động nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Nhà trường đã trang bị đầy đủ các thiệt bị cho khối phòng phục vụ học tập, khối phòng hành chính – quản trị và được sắp xếp hợp lý, khoa học, hỗ trợ hiệu quả các hoạt động nhà trường.</p>',
                                                            cauhoi: '<p>Nhà trường có trang bị đầy đủ các thiệt bị cho khối phòng phục vụ học tập, khối phòng hành chính – quản trị và được sắp xếp hợp lý, khoa học, hỗ trợ hiệu quả các hoạt động nhà trường không?</p>',
                                                            canthuthap: '<p>- Sổ quản lí tài sản, tài chính<br>- Biên bản kiểm kê tài sản<br>- Báo cáo sơ kết, tổng kết.<br>- Biến bản kiểm tra chuyên ngành của Phòng GD</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.4: Khu vệ sinh, hệ thống cấp thoát nước',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Khu vệ sinh riêng cho nam, nữ, giáo viên, nhân viên, học sinh đảm bảo không ô nhiễm môi trường; khu vệ sinh đảm bảo sử dụng thuận lợi cho học sinh khuyết tật học hòa nhập;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Trường có hai khu vệ sinh riêng cho nam, nữ, giáo viên, nhân viên, học sinh đảm bảo không ô nhiễm môi trường; khu vệ sinh đảm bảo sử dụng thuận lợi cho học sinh khuyết tật hòa nhập</p>',
                                                            cauhoi: '<p>Khu vệ sinh nhà trường có đảm bảo hợp vệ sinh riêng cho nam, nữ, giáo viên, nhân viên, học sinh và thuận lợi cho học sinh khuyết tật hòa nhập. theo quy định tại Điều lệ trường Tiểu học không?</p>',
                                                            canthuthap: '<p>- Sổ quản lý tài sản,tài chính<br>- Biên bản kiểm tra tài sản</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Hệ thống thoát nước đảm bảo vệ sinh môi trường; hệ thống cấp nước sạch đảm bảo nước uống và nước sinh hoạt cho giáo viên, nhân viên và học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Trường có hệ thống thoát nước đảm bảo vệ sinh môi trường; hệ thống cấp nước sạch đảm bảo nước uống và nước sinh hoạt cho giáo viên, nhân viên và học sinh.</p>',
                                                            cauhoi: '<p>- Trường có hệ thống thoát nước; cung cấp nước uống sạch cho học sinh và giáo viên theo quy định Điều lệ trường tiểu học không?</p>',
                                                            canthuthap: '<p>- Hợp động cung cấp nước sạch.<br>- Biên bản kiểm tra của các cơ quan y tế về nước sạch<br>- Sổ quản lý tài sản, tài chính</p>',
                                                            noithuthap: '<p>Y tế</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Thu gom rác và xử lý chất thải đảm bảo vệ sinh môi trường.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Trường có hố rác, thu gom rác và xử lý chất thải đảm bảo vệ sinh môi trường.</p>',
                                                            cauhoi: '<p>Thu gom rác và xử lý chất thải có đảm bảo vệ sinh môi trường không ?</p>',
                                                            canthuthap: '<p>Biên bản kiểm tra của các cơ quan y tế về vệ sinh môi trường</p>',
                                                            noithuthap: '<p>Y tế</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Khu vệ sinh đảm bảo thuận tiện, được xây dựng phù hợp với cảnh quan và theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Trường có khu vệ sinh đảm bảo thuận tiện, được xây dựng phù hợp với cảnh quan và theo qui định Tiêu chuẩn của quốc gia TCVN 8793:2011 về yêu cầu thiết kế trường tiểu học.</p>',
                                                            cauhoi: '<p>- Khu vệ sinh của nhà trường có đảm bảo thuận tiện, được xậy dựng phù hợp với cảnh quan và theo quy định Tiêu chuẩn của quốc gia TCVN 8793:2011 về yêu cầu thiết kế trường tiểu học không?</p>',
                                                            canthuthap: '<p>- Hồ sơ thiết kế xây dựng của nhà trường<br>- Sơ đồ tổng quát của nhà trường</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Hệ thống cấp nước sạch, hệ thống thoát nước, thu gom và xử lý chất thải đáp ứng quy định của Bộ Giáo dục và Đào tạo và Bộ Y tế.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trường có hệ thống cấp nước sạch, hệ thống thoát nước, thu gom và xử lý chất thải đáp ứng quy định đánh giá trước tháng 7năm 2016; đảm bảo theo quy định tại khoản 3 và 4 Điều 9, khoản 4 Điều 14 thông tư liên tịch số 22/2013TTLT- BGDĐT- BYT ngày 18/06/2013đánh giá công tác y tế tại các cơ sở giáo dục.</p>',
                                                            cauhoi: '<p>Hệ thống cấp nước sạch, hệ thống thoát nước, thu gom và xử lý chất thải đáp ứng quy định của Bộ GD ĐT và Bộ y Tế không?</p>',
                                                            canthuthap: '<p>- Hợp đồng cung cấp nước sạch; hóa đơn thu tiền nước hằng tháng .<br>- Biên bản kiểm tra của các cơ quan y tế về nước sạch<br>- Sổ quản lý tài sản, tài chính</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.5: Thiết bị',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có đủ thiết bị văn phòng và các thiết bị khác phục vụ các hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường có đủ thiết bị văn phòng và các thiết bị khác phục vụ các hoạt động khác của nhà trường</p>',
                                                            cauhoi: '<p>- Trường có đủ thiết bị văn phòng và các thiết bị khác phục vụ các hoạt động khác của nhà trường không?</p>',
                                                            canthuthap: '<p>- Thống kê danh mục thiết bị, đồ dùng, đồ chơi của nhà trường.<br>- Sổ quản lý tài sản, tài chính.<br>- Biên bản kiểm kê tài sản.</p>',
                                                            noithuthap: '<p>- Thư viện<br>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ thiết bị dạy học đáp ứng yêu cầu tối thiểu theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Có đủ thiết bị dạy học theo quy định Thông tư 15/2009/TT-BGD ĐT, ngày 16 tháng 7 năm 2009 của BGD ĐT ban hành danh mục thiết bị dạy học tối thiểu cấp tiểu học.</p>',
                                                            cauhoi: '<p>- Trường có đủ thiết bị dạy học theo quy định Thông tư 15/2009/TT-BGD ĐT, ngày 16 tháng 7 năm 2009 của BGD ĐT ban hành danh mục thiết bị dạy học tối thiểu cấp tiểu học không?</p>',
                                                            canthuthap: '<p>- Thống kê danh mục thiết bị, đồ dùng, đồ chơi của nhà trường.<br>- Biên bản kiểm tra của Phòng GD-ĐT huyện Sơn Hòa.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm các thiết bị được kiểm kê, sửa chữa.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hằng năm các thiết bị được kiểm kê, sửa chữa.</p>',
                                                            cauhoi: '<p>- Hằng năm các thiết bị có được kiểm kê, sửa chữa không?</p>',
                                                            canthuthap: '<p>- Bảng thống kê các thiết bị được sửa chữa hằng năm.<br>- Hóa đơn sửa chữa các thiết bị.</p>',
                                                            noithuthap: '<p>Cơ sở vật chất.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hệ thống máy tính được kết nối Internet phục vụ công tác quản lý, hoạt động dạy học;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Hệ thống máy tính được kết nói internet phục vụ công tác, hoạt động dạy học.</p>',
                                                            cauhoi: '<p>- Trường có hệ thống máy tính được kết nói internet phục vụ công tác, hoạt động dạy học không?</p>',
                                                            canthuthap: '<p>- Hợp đồng kết nối mạng LAN.<br>- Hóa đơn thanh toán tiền Internet hằng tháng của nhà trường.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ thiết bị dạy học theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Có đủ thiết bị dạy học theo quy định</p>',
                                                            cauhoi: '<p>- Trường có trang bị đủ thiết bị dạy học theo quy định không?</p>',
                                                            canthuthap: '<p>- Sổ quản lý tài sản, tài chính.<br>- Biên bản kiểm kê tài sản.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, được bổ sung các thiết bị dạy học và thiết bị dạy học tự làm.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Hằng năm nhà trường bổ sung thêm:<br>- Các thiết bị dạy học<br>- Các thiết bị dạy học do giáo viên tự làm</p>',
                                                            cauhoi: '<p>- Hằng năm thư viện nhà trường có được bổ sung các thiết bị dạy học do nhà trường mua sắm và thiết bị dạy học do giáo viên tự làm không?</p>',
                                                            canthuthap: '<p>- Thống kê danh mục thiết bị dạy học do giáo viên tự làm.<br>- Hóa đơn hợp đồng mua đồ dùng, thiết bị hằng năm.</p>',
                                                            noithuthap: '<p>Thư viện</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Thiết bị dạy học, thiết bị dạy học tự làm được khai thác, sử dụng hiệu quả đáp ứng yêu cầu đổi mới nội dung phương pháp dạy học và nâng cao chất lượng giáo dục của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Thiết bị dạy học, thiết bị dạy học tự làm được khai thác, sử dụng hiệu quả đáp ứng yêu cầu đổi mới nội dung phương pháp dạy học và nâng cao chất lượng giáo dục của nhà trường.</p>',
                                                            cauhoi: '<p>- Các thiết bị dạy học, thiết bị dạy học tự làm được khai thác, sử dụng hiệu quả đáp ứng yêu cầu đổi mới nội dung phương pháp dạy học và nâng cao chất lượng giáo dục của nhà trường không?</p>',
                                                            canthuthap: '<p>- Sổ quản lý tài sản, tài chính.<br>- Sổ dự giờ.<br>- Biên bản kiểm tra, đánh giá của hiệu trưởng, phó hiệu trưởng, tổ trưởng, nhóm trưởng, chuyên môn với các thành viên trong tổ chuyên môn.</p>',
                                                            noithuthap: '<p>-&nbsp;Văn Thư<br>- Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.6: Thư viện',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Được trang bị sách, báo, tạp chí, bản đồ, tranh ảnh giáo dục, băng đĩa giáo khoa và các xuất bản phẩm tham khảo tối thiểu phục vụ hoạt động dạy học;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Thư viện tường được trang bị sách, báo, tạp chí, bản đồ, tranh ảnh giáo dục, băng đĩa giáo khoa và các xuất bản tham khảo tối thiểu phục vụ hoạt động dạy học.</p>',
                                                            cauhoi: '<p>Thư viện trường có được trang bị sách, báo, tạp chí, bản đồ, tranh ảnh giáo dục, băng đĩa giáo khoa và các xuất bản tham khảo tối thiểu phục vụ hoạt động dạy học không ?</p>',
                                                            canthuthap: '<p>- Sổ theo dõi kinh phí<br>- Biên bản kiểm tra</p>',
                                                            noithuthap: '<p>-&nbsp;Thư viện<br>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động của thư viện đáp ứng yêu cầu tối thiểu hoạt động dạy học của cán bộ quản lý, giáo viên, nhân viên, học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hoạt động thư viện đáp ứng yêu cầu tối thiểu hoạt động dạy học của cán bộ quản lí, giáo viên, nhân viên, học sinh.</p>',
                                                            cauhoi: '<p>Hoạt động thư viện có đáp ứng yêu cầu tối thiểu hoạt động dạy học của cán bộ quản lí, giáo viên, nhân viên, học sinh không ?</p>',
                                                            canthuthap: '<p>- Sổ nhập sách<br>- Sổ theo dõi mượn - trả sách giáo khoa; sách tham khảo; đồ dung dạy học…</p>',
                                                            noithuthap: '<p>Thư viện</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm thư viện được kiểm kê, bổ sung sách, báo, tạp chí, bản đồ, tranh ảnh giáo dục, băng đĩa giáo khoa và các xuất bản phẩm tham khảo.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Hằng năm thư viện được kiểm kê, bổ sung sách, báo, tạp chí, bản đồ, tranh ảnh giáo dục, băng đĩa giáo khoa và các xuất bản tham khảo</p>',
                                                            cauhoi: '<p>Hằng năm thư viện được kiểm kê; bổ sung sách, báo, tạp chí, bản đồ, tranh ảnh giáo dục, băng đĩa giáo khoa và các xuất bản tham khảo không ?</p>',
                                                            canthuthap: '<p>- Hồ sơ kiểm kê cuối năm<br>- Giấy đề xuất mua sách báo, đồ dùng dạy học, hóa đơn thanh toán</p>',
                                                            noithuthap: '<p>Thư viện</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Thư viện của nhà trường đạt Thư viện trường học đạt chuẩn trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Thư viện của nhà trường đạt Thư viện trường học đạt chuẩn trở lên (theo quy định tại Quyết định số 01/2003/ QĐ-BGD&amp;ĐT ngày 02 tháng 01 năm 2003 của Bộ trưởng Bộ GDĐT về việc ban hành Quy định tiêu chuẩn thư viện trường phổ thông)</p>',
                                                            cauhoi: '<p>Thư viện của nhà trường có đạt Thư viện trường học đạt chuẩn trở lên (theo quy định tại Quyết định số 01/2003/ QĐ-BGD&amp;ĐT ngày 02 tháng 01 năm 2003 của Bộ GDĐT về việc ban hành Quy định tiêu chuẩn thư viện trường phổ thông ) không?</p>',
                                                            canthuthap: '<p>- Sổ theo dõi kinh phí<br>- QĐ công nhận Thư viện trường học đạt chuẩn</p>',
                                                            noithuthap: '<p>Thư viện</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Thư viện của nhà trường đạt Thư viện trường học tiên tiến trở lên; hệ thống máy tính của thư viện được kết nối Internet đáp ứng nhu cầu nghiên cứu, hoạt động dạy học, các hoạt động khác của cán bộ quản lý, giáo viên, nhân viên và học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Thư viện của nhà trường đạt Thư viện trường học tiên tiến trở lên (theo quy định tại Quyết định số 01/2003/QĐ-BGD&amp;ĐT ngày 02 tháng 01 năm 2003 của Bộ trưởng Bộ GDĐT về việc ban hành Quy định tiêu chuẩn thư viện trường phổ thông)<br>- Hệ thống máy tính của thư viện được kết nối Internet đáp ứng nhu cầu nghiên cứu, hoạt động dạy học, các hoạt động khác của cán bộ quản lý, giáo viên, nhân viên và học sinh.</p>',
                                                            cauhoi: '<p>- Thư viện của nhà trường đã đạt Thư viện trường học tiên tiến trở lên (theo quy định tại Quyết định số 01/2003/QĐ-BGD&amp;ĐT ngày 02 tháng 01 năm 2003 của Bộ trưởng Bộ GDĐT về việc ban hành Quy định tiêu chuẩn thư viện trường phổ thông) không?<br>- Hệ thống máy tính của thư viện nhà trường có đảm bảo đầy đủ số lượng và được kết nối Internet đáp ứng nhu cầu nghiên cứu, hoạt động dạy học, các hoạt động khác của cán bộ quản lý, giáo viên, nhân viên và học sinh không?</p>',
                                                            canthuthap: '<p>- Sổ theo dõi kinh phí<br>- QĐ công nhận Thư viện trường học đạt tiên tiến.<br>- Báo cáo sơ kết<br>- Sổ theo dõi nhập số máy tính được kết nối Internet</p>',
                                                            noithuthap: '<p>Thư viện</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 3',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 4: Quan hệ giữa nhà trường, gia đình và xã hội',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 4.1: Ban đại diện cha mẹ học sinh',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Được thành lập và hoạt động theo quy định tại Điều lệ Ban đại diện cha mẹ học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Được thành lập và hoạt động theo quy định tại Điều lệ Ban ĐDCMHS (thông tư số 55/2011/TT-BGDĐT ngày 22/11/20110</p>',
                                                            cauhoi: '<p>BĐDCMHS có thành lập và hoạt động theo quy định tại điều lệ BĐDCMHS hay không?</p>',
                                                            canthuthap: '<p>- Ban đại diện cha mẹ học sinh được thành lập theo thông tư số 55/2011/TT-BGDĐT ngày 22/11/2011</p>',
                                                            noithuthap: '<p>- Nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Có kế hoạch hoạt động theo năm học;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Có kế hoạch hoạt động theo năm học</p>',
                                                            cauhoi: '<p>BĐDCMHS có kế hoạch hoạt động năm học hay không? Có xây dựng Quy chế hoạt động không? Có huy động được các nguồn lực xã hội tăng cường cơ sở vật chất cho nhà trường trong năm học hay không?</p>',
                                                            canthuthap: '<p>- Kế hoạch hoạt động của BĐDCMHS năm học 2018-2019.</p>',
                                                            noithuthap: '<p>- BĐDCMHS và nhà trường.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chức thực hiện kế hoạch hoạt động đúng tiến độ.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Tổ chức thực hiện kế hoạch hoạt động đúng tiến độ</p>',
                                                            cauhoi: '<p>Trong năm học các hoạt động có được kiểm tra, đánh giá hay không?</p>',
                                                            canthuthap: '<p>-&nbsp;Báo cáo hoạt động của BĐDCMHS<br>-&nbsp;Biên bản họp phụ huynh học sinh đầu năm học 2018-2019 của các lớp.<br>- Sổ nghị quyết của BĐDCMHS.<br>- Biên bản họp giữa Ban<br>ĐDCMHS với nhà trường<br>-&nbsp;Các báo cáo và bảng tổng hợp thu, chi quỹ năm học 2018-2019.<br>-&nbsp;Báo cáo sơ kết, tổng kết của BĐDCMHS.</p>',
                                                            noithuthap: '<p>Nhà trường và BĐDCMHS năm học 2018-2019.<br>- BĐDCMHS và nhà trường.<br>- BĐDCMHS và nhà trường.<br>- BĐDCMHS và nhà trường.<br>- Nhà trường và các lớp<br>- Nhà trường và các lớp</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường trong việc tổ chức thực hiện nhiệm vụ năm học và các hoạt động giáo dục; hướng dẫn, tuyên truyền, phổ biến pháp luật, chủ trương chính sách về giáo dục đối với cha mẹ học sinh; huy động học sinh đến trường, vận động học sinh đã bỏ học trở lại lớp.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>-&nbsp;Ban ĐDCMHS phối hợp có hiệu quả với nhà trường trong việc tổ chức thực hiện nhiệm vụ năm học và các HĐGD.<br>- Hướng dẫn tuyên truyền, phổ biến pháp luật, chủ trương chính sách về GD đối với CMHS</p>',
                                                            cauhoi: '<p>Ban ĐDCMHS có phối hợp với nhà trường trong việc tổ chức thực hiện nhiệm vụ năm học, tuyên truyền phổ biến pháp luật chủ trương chính sách và các HĐGD không?</p>',
                                                            canthuthap: '<p>-&nbsp;Sổ nghị quyết, kế hoạch công tác.<br>- Biên bản họp phụ huynh học sinh đầu năm học 2018-2019 của các lớp.<br>-&nbsp;Kế hoạch HĐ của Ban ĐDCMHS.<br>-&nbsp;Báo cáo HĐ của Ban ĐDCMHS.<br>- Biên bản họp giữa Ban<br>ĐDCMHS với nhà trường<br>-&nbsp;Báo cáo sơ kết, tổng kết.</p>',
                                                            noithuthap: '<p>-&nbsp;Nhà trường<br>-&nbsp;BĐDCMHS và Nhà trường.<br>- BĐDCMHS và Nhà trường.<br>-&nbsp;BĐDCMHS và Nhà trường.<br>-&nbsp;BĐDCMHS và Nhà trường.<br>-&nbsp;BĐDCMHS và Nhà trường.</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường, xã hội trong việc thực hiện các nhiệm vụ theo quy định của Điều lệ Ban đại diện cha mẹ học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Phối hợp có hiệu quả với nhà trường và xã hội trong việc thực hiện các nhiệm vụ theo quy định của Điều lệ Ban ĐDCMHS</p>',
                                                            cauhoi: '<p>Ban ĐDCMHS phối hợp với nhà trường và xã hội trong việc thực hiện các nhiệm vụ theo quy định của Điều lệ Ban ĐDCMHS có hiệu quả không?</p>',
                                                            canthuthap: '<p>-&nbsp;Sổ nghị quyết, kế hoạch công tác.<br>-&nbsp;Biên bản họp giữa Ban<br>ĐDCMHS với nhà trường<br>- Danh sách các tổ chức, cá nhân hỗ trợ tài chính,<br>-&nbsp;Danh sách các tổ chức, cá nhân hỗ trợ CSVC<br>-&nbsp;Báo cáo sơ kết, tổng kết.</p>',
                                                            noithuthap: '<p>- BĐDCMHS và Nhà trường<br>- BĐDCMHS và Nhà trường<br>- Nhà trường<br>-&nbsp;Nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 4.2: Công tác tham mưu cấp uỷ Đảng, chính quyền và phối hợp với các tổ chức, cá nhân của nhà trường',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tham mưu cấp ủy Đảng, chính quyền để thực hiện kế hoạch giáo dục của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường tham mưu với ủy Đảng, chính quyền địa phương về kế hoạch và các biện pháp cụ thể để phát triển nhà trường.</p>',
                                                            cauhoi: '<p>Tại thời điểm tự đánh giá nhà trường có văn bản tham mưu với cấp ủy Đảng, chính quyền để thực hiện kế hoạch giáo dục của nhà trường hay không? Có các biên bản họp phối hợp hay không?</p>',
                                                            canthuthap: '<p>- Các văn bản tham mưu, các biên bản họp phối hợp.</p>',
                                                            noithuthap: '<p>- Nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tuyên truyền nâng cao nhận thức và trách nhiệm của cộng đồng về chủ trương, chính sách của Đảng, Nhà nước, ngành Giáo dục; về mục tiêu, nội dung và kế hoạch giáo dục của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường tuyên truyền để nâng cao nhận thức và trách nhiệm của cộng đồng về chủ trương chính sách của Đảng, Nhà nước, ngành giáo dục về mục tiêu, nội dung và kế hoạch giáo dục của nhà trường bằng nhiều hình thức khác nhau ( Qua các cuộc họp, qua các phương tiện truyền thông)</p>',
                                                            cauhoi: '<p>Nhà trường có các văn bản, kế hoạch tuyên truyền và Quy chế phối hợp hay không?</p>',
                                                            canthuthap: '<p>- Các văn bản, kế hoạch tuyên truyền và các Quy chế phối hợp.</p>',
                                                            noithuthap: '<p>- Nhà trường.</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Huy động và sử dụng các nguồn lực hợp pháp của các tổ chức, cá nhân đúng quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nhà trường huy động và sử dụng các nguồn lực hợp pháp của các tổ chức, cá nhân đúng quy định.</p>',
                                                            cauhoi: '<p>Trong năm học 2018-2019 nhà trường có huy động được các nguồn lực xây dựng cơ sở vật chất, hỗ trợ học sinh hay không?</p>',
                                                            canthuthap: '<p>- Bảng phân tích nguồn lực đóng góp của gia đình, cộng đồng, các tổ chức cho nhà trường năm học 2018-2019.<br>-&nbsp;Sổ nghị quyết, kế hoạch công tác.<br>- Danh sách kí nhận các nguồn lực được hỗ trợ (biên bản bàn giao CSVC cho nhà trường; danh sách học sinh kí nhận các khoản hỗ trợ,…).<br>-&nbsp;Báo cáo sơ kết, tổng kết<br>-&nbsp;Sổ quản lí tài sản<br>-&nbsp;Sổ quản lí thiết bị</p>',
                                                            noithuthap: '<p>- Nhà trường và bộ phận kế toán trường.<br>-&nbsp;Nhà trường<br>-&nbsp;Nhà trường và TPT đội TNTPHCM<br>-&nbsp;Nhà trường<br>- Kế toán<br>- TVTB</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tham mưu cấp ủy Đảng, chính quyền để tạo điều kiện cho nhà trường thực hiện phương hướng, chiến lược xây dựng và phát triển;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Tham mưu cấp ủy Đảng, chính quyền để tạo điều kiện cho nhà trường từng bước thực hiện phương hướng, chiến lược xây dựng và phát triển</p>',
                                                            cauhoi: '<p>Tại thời điểm tự đánh giá nhà trường văn bản tham mưu với cấp ủy Đảng, chính quyền để thực hiện kế hoạch giáo dục , phương hướng và chiến lược phát triển của nhà trường hay không? Có các biên bản họp phối hợp hiệu quả hay không?</p>',
                                                            canthuthap: '<p>-Các văn bản tham mưu, các biên bản họp phối hợp.</p>',
                                                            noithuthap: '<p>Nhà trường.</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Phối hợp với các tổ chức, đoàn thể, cá nhân để giáo dục truyền thống lịch sử, văn hóa, đạo đức lối sống, pháp luật, nghệ thuật, thể dục thể thao và các nội dung giáo dục khác cho học sinh; chăm sóc di tích lịch sử, cách mạng, công trình văn hóa; chăm sóc gia đình thương binh, liệt sĩ, gia đình có công với cách mạng, Bà mẹ Việt Nam anh hùng ở địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Phối hợp với các tổ chức, đoàn thể, cá nhân để giáo dục truyền thống lịch sử, văn hóa đạo đức lối sống, pháp luật, nghệ thuật, thể dục thể thao và các nội dung giáo dục khác cho học sinh: chăm sóc di tích lịch sử, cách mạng, công trình văn hóa; chăm sóc gia đình thương binh liệt sĩ, gia đình có công với cách mạng, bà mẹ Việt Nam Anh hùng ở địa phương</p>',
                                                            cauhoi: '<p>Nhà trường có các văn bản, kế hoạch tuyên truyền và Quy chế phối hợp hay không?</p>',
                                                            canthuthap: '<p>-&nbsp;Các văn bản của nhà trường tham mưu với cấp ủy Đảng, chính quyền địa phương để thực hiện kế hoạch giáo dục của nhà trường<br>- Các báo cáo của chi bộ.<br>- Báo cáo của nhà trường<br>- Báo cáo của Công đoàn<br>- Sổ công tác Đội</p>',
                                                            noithuthap: '<p>- Nhà trường.<br>- Chi bộ<br>- Nhà trường<br>- Công Đoàn<br>- TPT Đội TNTP</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Tham mưu cấp ủy Đảng, chính quyền và phối hợp có hiệu quả với các tô chức, cá nhân xây dựng nhà trường trở thành trung tâm văn hóa, giáo dục của địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Nhà trường Tham mưu cấp ủy Đảng, chính quyền và phối hợp có hiệu quả với các tổ chức, cá nhân xây dựng trường trở thành trung tâm văn hóa, giáo dục của địa phương</p>',
                                                            cauhoi: '<p>Nhà trường có tham mưu với cấp ủy Đảng, chính quyền và phối hợp có hiệu quả với các tổ chức, cá nhân xây dựng trường trỏ thành trung tâm văn hóa, giáo dục của địa phương hay không?</p>',
                                                            canthuthap: '<p>- Các văn bản của cấp có thẩm quyền công nhận nhà trường đạt đơn vị văn hóa.</p>',
                                                            noithuthap: '<p>- Nhà trường</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 4',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 5: Hoạt động giáo dục và kết quả giáo dục',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.1: Kế hoạch giáo dục của nhà trường',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đảm bảo theo quy định của Chương trình giáo dục phổ thông cấp tiểu học, các quy định về chuyên môn của cơ quan quản lý giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>-&nbsp;Nhà trường có kế hoạch giáo dục đảm bảo theo quy định của Chương trình giáo dục phổ thông cấp tiểu học.<br>- Kế hoạch giáo dục của nhà trường đảm bảo các quy định về chuyên môn của cơ quan quản lý giáo dục (Sở GDĐT, Phòng GDĐT)</p>',
                                                            cauhoi: '<p>- Kế hoạch giáo dục của nhà trường đảm bảo theo quy định của Chương trình giáo dục phổ thông cấp tiểu học không?<br>- Kế hoạch giáo dục của nhà trường đảm bảo các quy định về chuyên môn của cơ quan quản lý giáo dục (Sở GDĐT, Phòng GDĐT)</p>',
                                                            canthuthap: '<p>- Lịch báo giảng của tổ năm học 2014-2015, 2015-2016, 2016-2017,2017-2018, 2018-2019<br>- Kế hoạch hoạt động chuyên môn năm 2018-2019<br>- Kế hoạch triển khai dạy KNS cho học sinh tiểu học năm học 2017-2018<br>- Sổ sinh hoạt chuyên môn triển khai dạy giáo dục quốc phòng và an ninh, bảo vệ môi trường, tiết kiệm năng lượng.</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>-&nbsp;Văn thư<br>-&nbsp;Phó hiệu trưởng<br>-&nbsp;Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Đảm bảo mục tiêu giáo dục toàn diện thông qua các hoạt động giáo dục được xây dựng trong kế hoạch;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường đảm bảo mục tiêu giáo dục toàn diện thông qua các hoạt động giáo dục được xây dựng trong kế hoạch</p>',
                                                            cauhoi: '<p>- Nhà trường đảm bảo mục tiêu giáo dục toàn diện thông qua các hoạt động giáo dục được xây dựng trong kế hoạch không?</p>',
                                                            canthuthap: '<p>- Kế hoạch hoạt động chuyên môn năm 2018-2019<br>- Kế hoạch tập luyện bóng đá , Aerobic cho học sinh tham gia cấp huyện năm học 2018-2019<br>- Kế hoạch giao lưu năng khiếu Toán- Tiếng Việt cấp trường năm học 2017- 2018.<br>- Kế hoạch giao lưu “Tiếng Việt của chúng em” cho học sinh dân tộc thiểu số cấp trường năm học 2018-2019<br>- Báo cáo sơ kết công tác chuyên môn học kì I và triển khai phương hướng nhiệm vụ học kì II năm học 2018-2019.<br>- Báo cáo sơ kết công tác chuyên môn học kì I và triển khai phương hướng nhiệm vụ học kì II năm học 2017-2018<br>- Báo cáo tổng kết công tác chuyên môn năm học 2017-2018</p>',
                                                            noithuthap: '<p>- Văn thư<br>- Tổng phụ trách Đội<br>- Phó hiệu trưởng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Được giải trình và được cơ quan có thẩm quyền xác nhận.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Kế hoạch giáo dục nhà trường được giải trình và được cơ quan thẩm quyền xác nhận</p>',
                                                            cauhoi: '<p>- Kế hoạch giáo dục nhà trường được giải trình và được cơ quan thẩm quyền xác nhận không?</p>',
                                                            canthuthap: '<p>- Thông báo kết quả kiểm tra chuyên ngành Trường Tiểu học TT Củng Sơn 2.</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đảm bảo tính cập nhật các quy định về chuyên môn của cơ quan quản lý giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Hằng năm, nhà trường có kế hoạch giáo dục đảm bảo tính cập nhật các quy định về chuyên môn của cơ quan quản lý giáo dục.</p>',
                                                            cauhoi: '<p>- Nhà trường có kế hoạch giáo dục đảm bảo tính cập nhật các quy định về chuyên môn của cơ quan quản lý giáo dục?</p>',
                                                            canthuthap: '<p>- Kế hoạch hoạt động chuyên môn năm 2017-2018<br>- Kế hoạch hoạt động chuyên môn năm 2018- 2019</p>',
                                                            noithuthap: '<p>Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Được phổ biến, công khai để giáo viên, học sinh, cha mẹ học sinh, cộng đồng biết và phối hợp, giám sát nhà trường thực hiện kế hoạch.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Kế hoạch giáo dục được phổ biến, công khai để giáo viên, học sinh, cha mẹ học sinh, cộng đồng biết và phối hợp, giám sát nhà trường thực hiện kế hoạch.</p>',
                                                            cauhoi: '<p>- Kế hoạch giáo dục có được phổ biến, công khai để giáo viên, học sinh, cha mẹ học sinh, cộng đồng biết và phối hợp, giám sát nhà trường thực hiện kế hoạch không?</p>',
                                                            canthuthap: '<p>- Biên bản họp chuyên môn thông báo về giải thể thao học đường cấp huyện năm học 2018-2019.<br>- Biên bản họp ban đại diện cha mẹ học sinh<br>- Biên bản họp phụ huynh học sinh lần thứ nhất năm học 2018-2019 của lớp.<br>- Kế hoạch hoạt động tập thể sinh hoạt lớp<br>&nbsp;</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>-&nbsp;Hiệu trưởng<br>-&nbsp;Giáo viên chủ nhiệm<br>-&nbsp;Giáo viên chủ nhiệm</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.2: Thực hiện Chương trình giáo dục phổ thông cấp tiểu học',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức dạy học đúng, đủ các môn học và các hoạt động giáo dục đảm bảo mục tiêu giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Tổ chức dạy đủ, đúng các môn học và các hoạt động giáo dục đảm bảo mục tiêu giáo dục.</p>',
                                                            cauhoi: '<p>Trường có Tổ chức dạy đủ, đúng các môn học và các hoạt động giáo dục đảm bảo mục tiêu giáo dục không ?</p>',
                                                            canthuthap: '<p>- Sổ nghị quyết và kế hoạch công tác.<br>- Sổ ghi chép nội dung các cuộc họp chuyên môn.<br>- Văn bản/biên bản họp của các tổ chức trong nhà trường có nội dung rà soát, đánh giá việc thực hiện chương trình.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng, tổ chuyên môn, tổ văn phòng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Vận dụng các phương pháp, kỹ thuật dạy học, tổ chức hoạt động dạy học đảm bảo mục tiêu, nội dung giáo dục, phù hợp đối tượng học sinh và điều kiện nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Vận dụng các phương pháp, kỹ thuật dạy học, tổ chức hoạt động dạy học đảm bảo mục tiêu, nội dung giáo dục, phù hợp đối tượng học sinh và điều kiện nhà trường.</p>',
                                                            cauhoi: '<p>Nhà trường có vận dụng các phương pháp, kỹ thuật dạy học, tổ chức hoạt động dạy học đảm bảo mục tiêu, nội dung giáo dục, phù hợp đối tượng học sinh và điều kiện nhà trường không ?</p>',
                                                            canthuthap: '<p>- Sổ ghi chép nội dung sinh hoạt chuyên môn và dự giờ.<br>- Kế hoạch giáo dục của nhà trường, tổ chuyên môn, tổ văn phòng, của giáo viên được phê duyệt.<br>- Chương trình giáo dục của nhà trường đã được điều chỉnh.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng, tổ chuyên môn, tổ văn phòng</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Thực hiện đúng quy định về đánh giá học sinh tiểu học.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Thực hiện đúng quy định về đánh giá học sinh tiểu học quy định Thông tư 22/2016/TT-BGĐT, ngày 22 tháng 9 năm 2016 của Bộ GDĐT</p>',
                                                            cauhoi: '<p>Trường có thực hiện đúng quy định về đánh giá học sinh tiểu học quy định Thông tư 22/2016/TT-BGĐT, ngày 22 tháng 9 năm 2016 của Bộ GDĐT không?</p>',
                                                            canthuthap: '<p>- Báo cáo sơ kết , tổng kết.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng, tổ chuyên môn, tổ văn phòng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Thực hiện đúng chương trình, kế hoạch giáo dục; lựa chọn nội dung, thời lượng, phương pháp, hình thức dạy học phù hợp với từng đối tượng và đáp ứng yêu cầu, khả năng nhận thức của học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Thực hiện đúng chương trình, kế hoạch giáo dục ; lựa chọn nội dung, thời lượng phương pháp, hình thức dạy học phù hợp với từng đối tượng và đáp ứng nhu cầu, khả năng nhận thức của học sinh.</p>',
                                                            cauhoi: '<p>Nhà trường có thực hiện đúng chương trình, kế hoạch giáo dục ; lựa chọn nội dung, thời lượng phương pháp, hình thức dạy học phù hợp với từng đối tượng và đáp ứng nhu cầu, khả năng nhận thức của học sinh không?</p>',
                                                            canthuthap: '<p>- Kế hoạch giáo dục của nhà trường, của tổ chuyên môn, tổ văn phòng của giáo viên được phê duyệt.<br>- Các báo cáo chuyên đề của nhà trường và tổ chuyên môn.<br>- Sổ nghị quyết và kế hoạch công tác.<br>- Sổ ghi chép các cuộc họp chuyên môn.<br>- Sổ ghi chép nội dung chuyên môn và dự giờ.<br>- Văn bản/biên bản họp của các tổ chức trong nhà trường có nội dung rà soát, đánh giá việc thực hiện chương trình.<br>- Chương trình giáo dục của nhà trường đã được điều chỉnh.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng, tổ chuyên môn, tổ văn phòng</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Phát hiện và bồi dưỡng học sinh có năng khiếu, phụ đạo học sinh gặp khó khăn trong học tập, rèn luyện.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Phát hiện và bồi dưỡng học sinh có năng khiếu, phụ đạo học sinh gặp khó khăn trong học tập, rèn luyện.</p>',
                                                            cauhoi: '<p>Nhà trường có phát hiện và bồi dưỡng học sinh có năng khiếu, phụ đạo học sinh gặp khó khăn trong học tập, rèn luyện không Phát hiện và bồi dưỡng học sinh có năng khiếu, phụ đạo học sinh gặp khó khăn trong học tập, rèn luyện ?</p>',
                                                            canthuthap: '<p>- Các hình thức khen thưởng của học sinh.<br>- Sổ theo dõi kết quả kiểm tra, đánh giá học sinh; hồ sơ giáo dục đối với học sinh khuyết tật (nếu có);<br>- Bảng tổng hợp kết quả giáo dục của học sinh.<br>- Báo cáo sơ kết, tổng kết.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng, tổ chuyên môn, tổ văn phòng</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Hằng năm, rà soát, phân tích, đánh giá hiệu quả và tác động của các biện pháp, giải pháp tổ chức các hoạt động giáo dục nhằm nâng cao chất lượng dạy học của giáo viên, học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Hằng năm, rà soát, phân tích, đánh giá hiệu quả và tác động của các biện pháp, giải pháp tổ chức các hoạt động giáo dục nhằm nâng cao chất lượng dạy học của giáo viên, học sinh.</p>',
                                                            cauhoi: '<p>Hằng năm, trường có rà soát, phân tích, đánh giá hiệu quả và tác động của các biện pháp, giải pháp tổ chức các hoạt động giáo dục nhằm nâng cao chất lượng dạy học của giáo viên, học sinh không ?</p>',
                                                            canthuthap: '<p>- Báo cáo sơ kết, tổng kết.<br>- Sổ ghi chép nội dung chuyên môn và dự giờ.<br>- Sổ theo dõi kết quả kiểm tra, đánh giá học sinh; hồ sơ giáo dục đối với học sinh khuyết tật (nếu có);<br>- Báo cáo chuyên đề, sáng kinh nghiệm.</p>',
                                                            noithuthap: '<p>Phó hiệu trưởng, tổ chuyên môn, tổ văn phòng</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.3: Thực hiện các hoạt động giáo dục khác',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đảm bảo theo kế hoạch;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Có chương trình các hoạt động giáo dục khác (hoạt động ngoại khóa, hoạt động vui chơi,thể dục thể thao, tham quan du lịch, giao lưu văn hóa; hoạt động bảo vệ môi trường; lao động công ích và các hoạt động xã hội khác) của nhà trường được thực hiện đầy đủ theo kế hoạch đã đề ra.</p>',
                                                            cauhoi: '<p>Chương trình các hoạt động giáo dục khác (hoạt động ngoại khóa, hoạt động vui chơi,thể dục thể thao, tham quan du lịch, giao lưu văn hóa; hoạt động bảo vệ môi trường; lao động công ích và các hoạt động xã hội khác) của nhà trường được thực hiện đảm bảo theo kế hoạch không?</p>',
                                                            canthuthap: '<p>Các kế hoạch hoạt động ngoại khóa, hoạt động vui chơi, thể dục thể thao, tham quan du lịch, giao lưu văn hóa,…</p>',
                                                            noithuthap: '<p>Tổng Phụ trách Đội</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Nội dung và hình thức tổ chức các hoạt động phong phú, phù hợp điều kiện của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Nội dung và hình thức tổ chức các hoạt động phong phú, phù hợp điều kiện nhà trường</p>',
                                                            cauhoi: '<p>Nội dung và hình thức tổ chức các hoạt động phong phú, phù hợp điều kiện nhà trường không?</p>',
                                                            canthuthap: '<p>- Sổ công tác Đội.<br>- Báo cáo sơ kết, tổng kết của Đội.<br>- Các sản phẩm của các hoạt ...động giáo dục ngoài giờ lên lớp.<br>- Hình ảnh, video, tư liệu về các hoạt động Giáo dục ngoài giờ lên lớp.</p>',
                                                            noithuthap: '<p>Tổng Phụ trách Đội</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Đảm bảo cho tất cả học sinh được tham gia.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Đảm bảo cho tất cả học sinh được tham gia</p>',
                                                            cauhoi: '<p>Chương trình các hoạt động giáo dục khác: đảm bảo cho tất cả học sinh được tham gia 100% không?</p>',
                                                            canthuthap: '<p>- Sổ theo dõi kết quả kiểm tra, đánh giá học sinh; hồ sơ giáo dục đối với học sinh khuyết tật.<br>- Sổ ghi chép nội dung các cuộc họp chuyên môn.<br>- Sổ ghi chép nội dung các cuộc họp chuyên môn và dự giờ;</p>',
                                                            noithuthap: '<p>- P.hiệu trưởng<br>-&nbsp;P.hiệu trưởng<br>-&nbsp;Tổ trưởng chuyên môn<br>&nbsp;</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Được tổ chức có hiệu quả, tạo cơ hội cho học sinh tham gia tích cực, chủ động, sáng tạo.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Được tổ chức có hiệu quả;<br>- Tạo cơ hội cho học sinh tham gia tích cực, chủ động, sáng tạo.</p>',
                                                            cauhoi: '<p>- Chương trình các hoạt động giáo dục khác,được tổ chức có hiệu quả không?<br>- Tạo cơ hội cho học sinh tham gia tích cực, chủ động, sáng tạo không?.</p>',
                                                            canthuthap: '<p>Các văn bản của cấp có thẩm quyền, các tổ chức xã hội đánh giá, ghi nhận học sinh nhà trường khi thực hiện các hoạt động giáo dục ngoài giờ lên lớp.<br>- Báo cáo Sơ kết<br>- Báo cáo Tổng kết<br>-Sổ theo dõi kết quả kiểm tra, đánh giá học sinh;hồ Sơ giáo dục đối với học sinh khuyết tật.<br>- Các sản phẩm của các hoạt động giáo dục ngoài giờ lên lớp.<br>- Hình ảnh,video,tư liệu về các hoạt động Giáo dục ngoài giờ lên lớp</p>',
                                                            noithuthap: '<p>- Văn thư<br>-&nbsp;Tổng Phụ trách Đội</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nội dung và hình thức tổ chức các hoạt động phân hóa theo nhu cầu, năng lực sở trường của học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Nội dung và hình thức tổ chức các hoạt động phân hóa theo nhu cầu, năng lực sở trường của học sinh</p>',
                                                            cauhoi: '<p>Nội dung và hình thức tổ chức các hoạt động được phân hóa theo nhu cầu, năng lực sở trường của học sinh không?</p>',
                                                            canthuthap: '<p>- Bản đăng ký của học sinh tham gia các hoạt động giáo dục ngoài giờ lên lớp.<br>- Các văn bản của cấp có thẩm quyền, các tổ chức xã hội đánh giá, ghi nhận học sinh nhà trường khi thực hiện các hoạt động giáo dục ngoài giờ lên lớp.<br>- Báo cáo Sơ kết<br>- Báo cáo Tổng kết<br>- Các sản phẩm của các hoạt động giáo dục ngoài giờ lên lớp.<br>- Sổ theo dõi kết quả kiểm tra, đánh giá học sinh; Hồ sơ giáo dục đối với học sinh khuyết tật.<br>- Sổ ghi chép nội dung các cuộc họp chuyên môn.<br>- Sổ ghi chép nội dung các cuộc họp chuyên môn và dự giờ.</p>',
                                                            noithuthap: '<p>-&nbsp;Tổng Phụ trách Đội<br>- Văn thư<br>-&nbsp;Văn thư<br>-&nbsp;P.hiệu trưởng<br>-&nbsp;P.hiệu trưởng<br>-&nbsp;Tổ trưởng chuyên môn</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.4: Công tác phổ cập giáo dục tiểu học',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Thực hiện nhiệm vụ phổ cập giáo dục theo phân công;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Thực hiện nhiệm vụ phổ cập giáo dục theo phân công<br>( Nghị định số 20/2014/NĐ-CP ngày 24 tháng 3 năm 2014 của Chính phủ về phổ cập giáo dục xóa mù chữ)</p>',
                                                            cauhoi: '<p>Trường có thực hiện nhiệm vụ phổ cập giáo dục theo phân công ( Nghị định số 20/2014/NĐ-CP ngày 24 tháng 3 năm 2014 của Chính phủ về phổ cập giáo dục xóa mù chữ) không ?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Sổ Phổ cập giáo dục tiểu học<br>- Kế hoạch tuyển sinh hằng năm<br>- Báo cáo sơ kết tổng kết</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Trong địa bàn tuyển sinh của trường tỷ lệ trẻ em 6 tuổi vào lớp 1 đạt ít nhất 90%;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Trong địa bàn tuyển sinh của trường tỷ lệ trẻ em 6 tuổi vào lớp 1 đạt ít nhất 90%</p>',
                                                            cauhoi: '<p>Trong địa bàn tuyển sinh của trường tỷ lệ trẻ em 6 tuổi vào lớp 1 đạt ít nhất 90% không?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Sổ Phổ cập giáo dục tiểu học<br>- Kế hoạch tuyển sinh hằng năm<br>- Báo cáo sơ kết tổng kết</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Quản lý hồ sơ, số liệu phổ cập giáo dục tiểu học đúng quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>Quản lý hồ sơ, số liệu phổ cập giáo dục tiểu học đúng quy định tại Nghị định số 20/20/2014/NĐ-CP ngày 24 tháng 3 năm 2014 của Chính phủ về phổ cập giáo dục, xóa mù chữ.</p>',
                                                            cauhoi: '<p>Trường có quản lý hồ sơ, số liệu phổ cập giáo dục tiểu học đúng quy định tại Nghị định số 20/20/2014/NĐ-CP ngày 24 tháng 3 năm 2014 của Chính phủ về phổ cập giáo dục, xóa mù chữ không?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Sổ Phổ cập giáo dục tiểu học<br>- Kế hoạch tuyển sinh hằng năm<br>- Báo cáo sơ kết tổng kết</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trong địa bàn tuyển sinh của trường tỷ lệ trẻ 6 tuổi vào lớp 1 đạt ít nhất 95%.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>Trong địa bàn truyển sinh của trường tỷ lệ trẻ 6 tuổi vào lớp 1 đạt ít nhất 95%</p>',
                                                            cauhoi: '<p>Trong địa bàn truyển sinh của trường tỷ lệ trẻ 6 tuổi vào lớp 1 đạt ít nhất 95% không?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Sổ Phổ cập giáo dục tiểu học<br>- Kế hoạch tuyển sinh hằng năm<br>- Báo cáo sơ kết tổng kết</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trong địa bàn tuyển sinh của trường tỷ lệ trẻ 6 tuổi vào lớp 1 đạt ít nhất 98%.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>Trong địa bàn truyển sinh của trường tỷ lệ trẻ 6 tuổi vào lớp 1 đạt ít nhất 98%</p>',
                                                            cauhoi: '<p>Trong địa bàn truyển sinh của trường tỷ lệ trẻ 6 tuổi vào lớp 1 đạt ít nhất 98% không?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Sổ Phổ cập giáo dục tiểu học<br>- Kế hoạch tuyển sinh hằng năm<br>- Báo cáo sơ kết tổng kết</p>',
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.5: Kết quả giáo dục',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 70%;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường có tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 70%</p>',
                                                            cauhoi: '<p>- Nhà trường có tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 70% không?</p>',
                                                            canthuthap: '<p>- Sổ theo dõi chất lượng học sinh của mỗi lớp hằng năm<br>- Báo cáo tổng kết công tác chuyên môn năm học 2017-2018</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ học sinh 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 65%;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường có tỷ lệ học sinh 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 65%</p>',
                                                            cauhoi: '<p>- Nhà trường có tỷ lệ học sinh 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 65% không?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Sổ theo dõi chất lượng học sinh của lớp 5 hằng năm<br>- Báo cáo tổng kết công tác chuyên môn năm học 2017-2018</p>',
                                                            noithuthap: '<p>- Phó hiệu trường<br>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'c) Tỷ lệ trẻ em đến 14 tuổi hoàn thành chương trình tiểu học đạt ít nhất 80%, đối với trường thuộc xã có điều kiện kinh tế - xã hội đặc biệt khó khăn đạt ít nhất 70%.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: '<p>- Nhà trường có tỷ lệ trẻ em đến 14 tuổi hoàn thành chương trình tiểu học đạt ít nhất 80% .</p>',
                                                            cauhoi: '<p>- Nhà trường có tỷ lệ trẻ em đến 14 tuổi hoàn thành chương trình tiểu học đạt ít nhất 80% không?</p>',
                                                            canthuthap: '<p>- Sổ Đăng bộ<br>+ Năm học 2014 – 2015<br>+ Năm học 2015 – 2016 đến 2018 – 2019<br>- Sổ theo dõi chất lượng</p>',
                                                            noithuthap: '<p>- Phó hiệu trường</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 85%;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Nhà trường có tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 85%</p>',
                                                            cauhoi: '<p>- Nhà trường có tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 85% không ?</p>',
                                                            canthuthap: '<p>- Có sổ theo dõi chất lượng học sinh của mỗi lớp hằng năm<br>- Báo cáo tổng kết công tác chuyên môn năm học 2017-2018</p>',
                                                            noithuthap: '<p>-&nbsp;Phó hiệu trưởng<br>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ trẻ em 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 80%, đối với trường thuộc xã có điều kiện kinh tế - xã hội đặc biệt khó khăn đạt ít nhất 70%; các trẻ em 11 tuổi còn lại đều đang học các lớp tiểu học.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: '<p>- Nhà trường có tỷ lệ trẻ em 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 80%, các trẻ em 11 tuổi còn lại đều đang học các lớp tiểu học</p>',
                                                            cauhoi: '<p>- Nhà trường có tỷ lệ trẻ em 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 80%, các trẻ em 11 tuổi còn lại đều đang học các lớp tiểu học không?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Có sổ theo dõi chất lượng học sinh của mỗi lớp hằng năm<br>- Báo cáo tổng kết công tác chuyên môn năm học 2017-2018</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 95%;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Nhà trường có tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 95%</p>',
                                                            cauhoi: '<p>- Nhà trường có tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 95% không ?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Có sổ theo dõi chất lượng học sinh của mỗi lớp hằng năm<br>- Báo cáo tổng kết công tác chuyên môn năm học 2017-2018</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ trẻ em 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 90%, đối với trường thuộc xã có điều kiện kinh tế - xã hội đặc biệt khó khăn đạt ít nhất 80%; các trẻ em 11 tuổi còn lại đều đang học các lớp tiểu học.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: '<p>- Nhà trường có tỷ lệ trẻ em 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 90%, các trẻ em 11 tuổi còn lại đều đang học các lớp tiểu học</p>',
                                                            cauhoi: '<p>- Nhà trường có tỷ lệ trẻ em 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 90%, các trẻ em 11 tuổi còn lại đều đang học các lớp tiểu học không?</p>',
                                                            canthuthap: '<p>- Sổ đăng bộ<br>- Có sổ theo dõi chất lượng học sinh của mỗi lớp hằng năm<br>- Báo cáo tổng kết công tác chuyên môn năm học 2017-2018</p>',
                                                            noithuthap: '<p>- Phó hiệu trưởng<br>- Văn thư</p>'
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 5',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    tenchimuc: 'III. KẾT LUẬN CHUNG',
                    loaichimuc: 1
                }
            ]
        case 3:
            return [
                {
                    tenchimuc: 'NỘI DUNG',
                    loaichimuc: 0,
                    isHideTitle: 1,
                    children: [
                        {
                            tenchimuc: 'MỤC LỤC',
                            loaichimuc: 6,
                            isCenterTitle: 1,
                            isDropLine: 1,
                            columns: [
                                {
                                    title: 'NỘI DUNG',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Trang',
                                    dataIndex: 'col1'
                                }
                            ],
                            rows: [
                                {
                                    name: 'Mục lục',
                                    col1: ' '
                                },
                                {
                                    name: 'Danh mục các chữ viết tắt',
                                    col1: ' '
                                },
                                {
                                    name: 'Bảng tổng hợp kết quả tự đánh giá',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần I. CƠ SỞ DỮ LIỆU',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần II. TỰ ĐÁNH GIÁ',
                                    col1: ' '
                                },
                                {
                                    name: 'A. ĐẶT VẤN ĐỀ',
                                    col1: ' '
                                },
                                {
                                    name: 'B. TỰ ĐÁNH GIÁ',
                                    col1: ' '
                                },
                                {
                                    name: 'I. Tự đánh giá Mức 1, Mức 2, Mức 3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 1. Tổ chức và quản lý nhà trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Mở đầu',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.2',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.4',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.5',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.6',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.7',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.8',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.9',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 1.10',
                                    col1: ' '
                                },
                                {
                                    name: 'Kết luận về Tiêu chuẩn 1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 2: Cán bộ quản lý, giáo viên, nhân viên và học sinh',
                                    col1: ' '
                                },
                                {
                                    name: 'Mở đầu',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.2',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 2.4',
                                    col1: ' '
                                },
                                {
                                    name: 'Kết luận về Tiêu chuẩn 2',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 3: Cơ sở vật chất và thiết bị dạy học',
                                    col1: ' '
                                },
                                {
                                    name: 'Mở đầu',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.2',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.4',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.5',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 3.6',
                                    col1: ' '
                                },
                                {
                                    name: 'Kết luận về Tiêu chuẩn 3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 4: Quan hệ giữa nhà trường, gia đình và xã hội',
                                    col1: ' '
                                },
                                {
                                    name: 'Mở đầu',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 4.1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 4.2',
                                    col1: ' '
                                },
                                {
                                    name: 'Kết luận về Tiêu chuẩn 4',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chuẩn 5: Hoạt động giáo dục và kết quả giáo dục',
                                    col1: ' '
                                },
                                {
                                    name: 'Mở đầu',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.1',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.2',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.3',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.4',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.5',
                                    col1: ' '
                                },
                                {
                                    name: 'Tiêu chí 5.6',
                                    col1: ' '
                                },
                                {
                                    name: 'Kết luận về Tiêu chuẩn 5',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần III. KẾT LUẬN CHUNG',
                                    col1: ' '
                                },
                                {
                                    name: 'Phần IV. PHỤ LỤC ',
                                    col1: ' '
                                },
                            ]
                        },
                        {
                            tenchimuc: 'DANH MỤC CÁC CHỮ VIẾT TẮT',
                            loaichimuc: 6,
                            isCenterTitle: 1,
                            isDropLine: 1,
                            columns: [
                                {
                                    title: 'Chữ viết tắt',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Nội dung viết tắt',
                                    dataIndex: 'col1'
                                }
                            ],
                            rows: [
                                {
                                    name: 'ATGT',
                                    col1: 'An toàn giao thông',
                                },
                                {
                                    name: 'BĐD CMHS',
                                    col1: 'Ban đại diện Cha mẹ học sinh',
                                },
                                {
                                    name: 'CB,CC,VC,NLĐ',
                                    col1: 'Cán bộ, công chức, viên chức, NLĐ',
                                },
                                {
                                    name: 'CBQL',
                                    col1: 'Cán bộ quản lí',
                                },
                                {
                                    name: 'CLGD',
                                    col1: 'Chất lượng giáo dục',
                                },
                                {
                                    name: 'GDĐT',
                                    col1: 'Giáo dục đào tạo',
                                },
                                {
                                    name: 'GDTC',
                                    col1: 'Giáo dục thể chất',
                                },
                                {
                                    name: 'GDTH',
                                    col1: 'Giáo dục tiểu học',
                                },
                                {
                                    name: 'GV',
                                    col1: 'Giáo viên',
                                },
                                {
                                    name: 'HS',
                                    col1: 'Học sinh',
                                },
                                {
                                    name: 'HTCTTH',
                                    col1: 'Hoàn thành chương trình tiểu học',
                                },
                                {
                                    name: 'HĐNGLL',
                                    col1: 'Hoạt động ngoài giờ lên lớp',
                                },
                                {
                                    name: 'HĐGD',
                                    col1: 'Hoạt động giáo dục',
                                },
                                {
                                    name: 'NV',
                                    col1: 'Nhân viên',
                                },
                                {
                                    name: 'PCCC',
                                    col1: 'Phòng cháy chữa cháy',
                                },
                                {
                                    name: 'PCGDTH',
                                    col1: 'Phổ cập giáo dục tiểu học',
                                },
                                {
                                    name: 'QĐND',
                                    col1: 'Quân đội Nhân dân',
                                },
                                {
                                    name: 'SNĐ',
                                    col1: 'Sao nhi đồng'
                                },
                                {
                                    name: 'TTLĐXS',
                                    col1: 'Tập thể lao động xuất sắc'
                                },
                                {
                                    name: 'TNTPHCM',
                                    col1: 'Thiếu niên Tiền phong Hồ Chí Minh'
                                },
                                {
                                    name: 'TĐG',
                                    col1: 'Tự đánh giá'
                                },
                                {
                                    name: 'UBND',
                                    col1: 'Ủy ban Nhân dân'
                                }
                            ]
                        },
                        {
                            tenchimuc: 'TỔNG HỢP KẾT QUẢ TỰ ĐÁNH GIÁ',
                            loaichimuc: 0,
                            isCenterTitle: 1,
                            isDropLine: 1,
                            children: [
                                {
                                    tenchimuc: '1. Kết quả đánh giá',
                                    loaichimuc: 0,
                                    children: [
                                        {
                                            tenchimuc: '1.1. Đánh giá tiêu chí Mức 1,2 và 3',
                                            loaichimuc: 6,
                                        },
                                        {
                                            tenchimuc: '1.2. Đánh giá tiêu chí Mức 4',
                                            loaichimuc: 1,
                                        }
                                    ]
                                },
                                {
                                    tenchimuc: '2. Kết luận',
                                    loaichimuc: 1,
                                }
                            ]
                        }
                    ]
                },
                {
                    tenchimuc: 'Phần I: CƠ SỞ DỮ LIỆU',
                    loaichimuc: 0,
                    isCenterTitle: 1,
                    isDropLine: 1,
                    children: [
                        {
                            tenchimuc: 'Thông tin nhà trường',
                            loaichimuc: 6,
                            isHideTitle: 1,
                            columns: [
                                {
                                    title: 'Thông tin',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Nội dung',
                                    dataIndex: 'col1'
                                }
                            ],
                            rows: [
                                {
                                    name: 'Tên trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Tên trước đây',
                                    col1: ' '
                                },
                                {
                                    name: 'Sở (Phòng) Giáo dục và Đào tạo',
                                    col1: ' '
                                },
                                {
                                    name: 'Tỉnh/thành phố trực thuộc Trung ương',
                                    col1: ' '
                                },
                                {
                                    name: 'Huyện/Quận/Thị xã',
                                    col1: ' '
                                },
                                {
                                    name: 'Xã/Phường/Thị trấn',
                                    col1: ' '
                                },
                                {
                                    name: 'Đạt chuẩn quốc gia',
                                    col1: ' '
                                },
                                {
                                    name: 'Năm thành lập trường (theo quyết định thành lập)',
                                    col1: ' '
                                },
                                {
                                    name: 'Công lập',
                                    col1: ' '
                                },
                                {
                                    name: 'Tư thục',
                                    col1: ' '
                                },
                                {
                                    name: 'Trường chuyên biệt',
                                    col1: ' '
                                },
                                {
                                    name: 'Trường liên kết với nước ngoài',
                                    col1: ' '
                                },
                                {
                                    name: 'Họ và tên hiệu trưởng',
                                    col1: ' '
                                },
                                {
                                    name: 'Điện thoại',
                                    col1: ' '
                                },
                                {
                                    name: 'Fax',
                                    col1: ' '
                                },
                                {
                                    name: 'Website',
                                    col1: ' '
                                },
                                {
                                    name: 'Số điểm trường',
                                    col1: ' '
                                },
                                {
                                    name: 'Loại hình khác',
                                    col1: ' '
                                },
                                {
                                    name: 'Thuộc vùng khó khăn',
                                    col1: ' '
                                },
                                {
                                    name: 'Thuộc vùng đặc biệt khó khăn',
                                    col1: ' '
                                }
                            ]
                        },
                        {
                            tenchimuc: '1. Số lớp học',
                            loaichimuc: 2,
                            columns: [
                                {
                                    title: 'Số lớp học',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Năm học 2015-2016',
                                    dataIndex: 'col1'
                                },
                                {
                                    title: 'Năm học 2016-2017',
                                    dataIndex: 'col2'
                                },
                                {
                                    title: 'Năm học 2017-2018',
                                    dataIndex: 'col3'
                                },
                                {
                                    title: 'Năm học 2018-2019',
                                    dataIndex: 'col4'
                                },
                                {
                                    title: 'Năm học 2019-2020',
                                    dataIndex: 'col5'
                                }
                            ],
                            rows: [
                                {
                                    name: 'Khối lớp 6',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-1'
                                },
                                {
                                    name: 'Khối lớp 7',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-2'
                                },
                                {
                                    name: 'Khối lớp 8',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-3'
                                },
                                {
                                    name: 'Khối lớp 9',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum-4'
                                },
                                {
                                    name: 'Cộng',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    sumtype: 'sum'
                                }
                            ]
                        },
                        {
                            tenchimuc: '2. Cơ cấu khối công trình của nhà trường',
                            loaichimuc: 2,
                            columns: [
                                {
                                    title: 'TT',
                                    dataIndex: 'sothutu'
                                },
                                {
                                    title: 'Số liệu',
                                    dataIndex: 'name'
                                },
                                {
                                    title: 'Năm học 2015-2016',
                                    dataIndex: 'col1'
                                },
                                {
                                    title: 'Năm học 2016-2017',
                                    dataIndex: 'col2'
                                },
                                {
                                    title: 'Năm học 2017-2018',
                                    dataIndex: 'col3'
                                },
                                {
                                    title: 'Năm học 2018-2019',
                                    dataIndex: 'col4'
                                },
                                {
                                    title: 'Năm học 2019-2020',
                                    dataIndex: 'col5'
                                },
                                {
                                    title: 'Ghi chú',
                                    dataIndex: 'col6'
                                }
                            ],
                            rows: [
                                {
                                    sothutu: 'I',
                                    name: 'Phòng học, phòng học bộ môn và khối phục vụ học tập',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1'
                                },
                                {
                                    sothutu: '1',
                                    name: 'Phòng học',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-1'
                                },
                                {
                                    sothutu: 'a',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-1-1'
                                },
                                {
                                    sothutu: 'b',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-1-2'
                                },
                                {
                                    sothutu: 'c',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-1-3'
                                },
                                {
                                    sothutu: '2',
                                    name: 'Phòng học bộ môn',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-2'
                                },
                                {
                                    sothutu: 'a',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-2-1'
                                },
                                {
                                    sothutu: 'b',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-2-2'
                                },
                                {
                                    sothutu: 'c',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-2-3'
                                },
                                {
                                    sothutu: '3',
                                    name: 'Khối phòng phục vụ học tập',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-3'
                                },
                                {
                                    sothutu: 'a',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-3-1'
                                },
                                {
                                    sothutu: 'b',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-3-2'
                                },
                                {
                                    sothutu: 'c',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-1-3-3'
                                },
                                {
                                    sothutu: 'II',
                                    name: 'Khối phòng hành chính - quản trị',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2'
                                },
                                {
                                    sothutu: '1',
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2-1'
                                },
                                {
                                    sothutu: '2',
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2-2'
                                },
                                {
                                    sothutu: '3',
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-2-3'
                                },
                                {
                                    sothutu: 'III',
                                    name: 'Thư viện',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-3'
                                },
                                {
                                    sothutu: 'IV',
                                    name: 'Các công trình, khối phòng chức năng khác (nếu có)',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum-4'
                                },
                                {
                                    sothutu: ' ',
                                    name: 'Cộng',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                    sumtype: 'sum'
                                }
                            ]
                        },
                        {
                            tenchimuc: '3. Cán bộ quản lý, giáo viên, nhân viên',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: 'a) Số liệu tại thời điểm TĐG',
                                    loaichimuc: 2,
                                    columns: [
                                        {
                                            title: '',
                                            dataIndex: 'name'
                                        },
                                        {
                                            title: 'Tổng số',
                                            dataIndex: 'col1'
                                        },
                                        {
                                            title: 'Nữ',
                                            dataIndex: 'col2'
                                        },
                                        {
                                            title: 'Dân tộc',
                                            dataIndex: 'col3'
                                        },
                                        {
                                            title: 'Chưa đạt chuẩn',
                                            dataIndex: 'col4'
                                        },
                                        {
                                            title: 'Đạt chuẩn',
                                            dataIndex: 'col5'
                                        },
                                        {
                                            title: 'Trên chuẩn',
                                            dataIndex: 'col6'
                                        },
                                        {
                                            title: 'Ghi chú',
                                            dataIndex: 'col7'
                                        }
                                    ],
                                    rows: [
                                        {
                                            name: 'Hiệu trưởng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-1'
                                        },
                                        {
                                            name: 'Phó Hiệu trưởng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-2'
                                        },
                                        {
                                            name: 'Giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-3'
                                        },
                                        {
                                            name: 'Nhân viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum-4'
                                        },
                                        {
                                            name: 'Cộng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' ',
                                            sumtype: 'sum'
                                        },
                                    ]
                                },
                                {
                                    tenchimuc: 'b) Số liệu của 5 năm gần đây',
                                    loaichimuc: 2,
                                    columns: [
                                        {
                                            title: 'TT',
                                            dataIndex: 'sothutu'
                                        },
                                        {
                                            title: 'Số liệu',
                                            dataIndex: 'name'
                                        },
                                        {
                                            title: 'Năm học 2015-2016',
                                            dataIndex: 'col1'
                                        },
                                        {
                                            title: 'Năm học 2016-2017',
                                            dataIndex: 'col2'
                                        },
                                        {
                                            title: 'Năm học 2017-2018',
                                            dataIndex: 'col3'
                                        },
                                        {
                                            title: 'Năm học 2018-2019',
                                            dataIndex: 'col4'
                                        },
                                        {
                                            title: 'Năm học 2019-2020',
                                            dataIndex: 'col5'
                                        }
                                    ],
                                    rows: [
                                        {
                                            sothutu: '1',
                                            name: 'Tổng số giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '2',
                                            name: 'Tỷ lệ giáo viên/lớp',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '3',
                                            name: 'Tỷ lệ giáo viên/học sinh',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '4',
                                            name: 'Tổng số giáo viên dạy giỏi cấp huyện hoặc tương đương trở lên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            sothutu: '5',
                                            name: 'Tổng số giáo viên dạy giỏi cấp tỉnh trở lên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tenchimuc: '4. Học sinh',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: 'a) Số liệu chung',
                                    loaichimuc: 2,
                                    columns: [
                                        {
                                            title: 'Số liệu',
                                            dataIndex: 'name'
                                        },
                                        {
                                            title: 'Năm học 2015-2016',
                                            dataIndex: 'col1'
                                        },
                                        {
                                            title: 'Năm học 2016-2017',
                                            dataIndex: 'col2'
                                        },
                                        {
                                            title: 'Năm học 2017-2018',
                                            dataIndex: 'col3'
                                        },
                                        {
                                            title: 'Năm học 2018-2019',
                                            dataIndex: 'col4'
                                        },
                                        {
                                            title: 'Năm học 2019-2020',
                                            dataIndex: 'col5'
                                        },
                                        {
                                            title: 'Ghi chú',
                                            dataIndex: 'col6'
                                        }
                                    ],
                                    rows: [
                                        {
                                            name: 'Tổng số học sinh',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Nữ',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Dân tộc thiểu số',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Khối lớp 6',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Khối lớp 7',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Khối lớp 8',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Khối lớp 9',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Tổng số tuyển mới',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Học 2 buổi/ngày',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Bán trú',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Nội trú',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Bình quân số học sinh/lớp học',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Số lượng và tỉ lệ % đi học đúng độ tuổi',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Nữ',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Dân tộc thiểu số',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Tổng số học sinh giỏi cấp huyện/tỉnh (nếu có)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Tổng số học sinh giỏi quốc gia (nếu có)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Tổng số học sinh thuộc đối tượng chính sách',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Nữ',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: '- Dân tộc thiểu số',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        },
                                        {
                                            name: 'Tổng số học sinh (trẻ em) có hoàn cảnh đặc biệt',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' ',
                                        }
                                    ]
                                },
                                {
                                    tenchimuc: 'b) Kết quả giáo dục',
                                    loaichimuc: 2,
                                    columns: [
                                        {
                                            title: 'Số liệu',
                                            dataIndex: 'name'
                                        },
                                        {
                                            title: 'Năm học 2015-2016',
                                            dataIndex: 'col1'
                                        },
                                        {
                                            title: 'Năm học 2016-2017',
                                            dataIndex: 'col2'
                                        },
                                        {
                                            title: 'Năm học 2017-2018',
                                            dataIndex: 'col3'
                                        },
                                        {
                                            title: 'Năm học 2018-2019',
                                            dataIndex: 'col4'
                                        },
                                        {
                                            title: 'Năm học 2019-2020',
                                            dataIndex: 'col5'
                                        },
                                        {
                                            title: 'Ghi chú',
                                            dataIndex: 'col6'
                                        }
                                    ],
                                    rows: [
                                        {
                                            name: 'Tỷ lệ học sinh xếp loại giỏi',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        },
                                        {
                                            name: 'Tỷ lệ học sinh xếp loại khá',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        },
                                        {
                                            name: 'Tỷ lệ học sinh xếp loại yếu, kém',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        },
                                        {
                                            name: 'Tỷ lệ học sinh xếp loại hạnh kiểm tốt',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        },
                                        {
                                            name: 'Tỷ lệ học sinh xếp loại hạnh kiểm khá',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        },
                                        {
                                            name: 'Tỷ lệ học sinh xếp loại hạnh kiểm trung bình',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        },
                                        {
                                            name: 'Tỷ lệ học sinh tốt nghiệp THCS (THPT)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: ' '
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tenchimuc: 'PHẦN II: TỰ ĐÁNH GIÁ',
                    loaichimuc: 0,
                    isCenterTitle: 1,
                    isDropLine: 1,
                    children: [
                        {
                            tenchimuc: 'A. ĐẶT VẤN ĐỀ',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: '1. Tình hình chung nhà trường',
                                    loaichimuc: 1
                                },
                                {
                                    tenchimuc: '2. Mục đích TĐG',
                                    loaichimuc: 1
                                },
                                {
                                    tenchimuc: '3. Tóm tắt quá trình và những vấn đề nổi bặt trong hoạt động TĐG',
                                    loaichimuc: 1
                                }
                            ]
                        },
                        {
                            tenchimuc: 'B. TỰ ĐÁNH GIÁ',
                            loaichimuc: 0,
                            children: [
                                {
                                    tenchimuc: 'I. TỰ ĐÁNH GIÁ TIÊU CHÍ MỨC 1,2 VÀ 3',
                                    loaichimuc: 0,
                                    children: [
                                        {
                                            tenchimuc: 'Tiêu chuẩn 1: Tổ chức và quản lý nhà trường',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.1: Phương hướng, chiến lược xây dựng và phát triển nhà trường',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phù hợp với mục tiêu giáo dục được quy định tại Luật giáo dục, định hướng phát triển kinh tế - xã hội của địa phương theo từng giai đoạn và các nguồn lực của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Được xác định bằng văn bản và cấp có thẩm quyền phê duyệt; ',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Được công bố công khai bằng hình thức niêm yết tại nhà trường hoặc đăng tải trên trang thông tin điện tử của nhà trường (nếu có) hoặc đăng tải trên các phương tiện thông tin đại chúng của địa phương, trang thông tin điện tử của phòng giáo dục và đào tạo, sở giáo dục và đào tạo.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nhà trường có các giải pháp giám sát việc thực hiện phương hướng chiến lược xây dựng và phát triển.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0
                                                        },
                                                        {
                                                            tieude: 'Định kỳ rà soát, bổ sung, điều chỉnh phương hướng, chiến lược xây dựng và phát triển. Tổ chức xây dựng phương hướng, chiến lược xây dựng và phát triển có sự tham gia của các thành viên trong Hội đồng trường (Hội đồng quản trị đối với trường tư thục), cán bộ quản lý, giáo viên, nhân viên, học sinh, cha mẹ học sinh và cộng đồng.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.2: Hội đồng trường (Hội đồng quản trị đối với trường tư thục) và các hội đồng khác',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Được thành lập theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Thực hiện chức năng, nhiệm vụ và quyền hạn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Các hoạt động được định kỳ rà soát, đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Hoạt động có hiệu quả, góp phần nâng cao chất lượng giáo dục của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.3: Tổ chức Đảng Cộng sản Việt Nam, các đoàn thể và tổ chức khác trong nhà trường',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Các đoàn thể và tổ chức khác trong nhà trường có cơ cấu tổ chức theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, các hoạt động được rà soát, đánh giá.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức Đảng Cộng sản Việt Nam có cơ cấu tổ chức và hoạt động theo quy định; trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 01 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác có đóng góp tích cực trong các hoạt động của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, tổ chức Đảng Cộng sản Việt Nam có ít nhất 02 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên; ',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác có đóng góp hiệu quả trong các hoạt động nhà trường và cộng đồng.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.4: Hiệu trưởng, phó hiệu trưởng, tổ chuyên môn và tổ văn phòng',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có hiệu trưởng, số lượng phó hiệu trưởng theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn và tổ văn phòng có cơ cấu tổ chức theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chuyên môn, tổ văn phòng có kế hoạch hoạt động và thực hiện các nhiệm vụ theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hằng năm, tổ chuyên môn đề xuất và thực hiện được ít nhất 01 (một) chuyên đề có tác dụng nâng cao chất lượng và hiệu quả giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động của tổ chuyên môn, tổ văn phòng được định kỳ rà soát, đánh giá, điều chỉnh.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hoạt động của tổ chuyên môn, tổ văn phòng có đóng góp hiệu quả trong việc nâng cao chất lượng các hoạt động trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn thực hiện hiệu quả các chuyên đề chuyên môn góp phần nâng cao chất lượng giáo dục.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.5: Khối lớp và tổ chức lớp học',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có đủ các lớp của cấp học;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Học sinh được tổ chức theo lớp; lớp học được tổ chức theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Lớp học hoạt động theo nguyên tắc tự quản, dân chủ. ',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trường có không quá 45 (bốn mươi lăm) lớp. Sỹ số học sinh trong lớp theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trường có không quá 45 (bốn mươi lăm) lớp. Mỗi lớp ở cấp trung học cơ sở và trung học phổ thông có không quá 40 (bốn mươi) học sinh, lớp tiểu học không quá 35 (ba mươi lăm) học sinh (nếu có). Số học sinh trong lớp của trường chuyên biệt theo quy định tại quy chế tổ chức và hoạt động của trường chuyên biệt.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.6: Quản lý hành chính, tài chính và tài sản',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hệ thống hồ sơ của nhà trường được lưu trữ theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Lập dự toán, thực hiện thu chi, quyết toán, thống kê, báo cáo tài chính và tài sản; công khai và định kỳ tự kiểm tra tài chính, tài sản theo quy định; quy chế chi tiêu nội bộ được bổ sung, cập nhật phù hợp với điều kiện thực tế và các quy định hiện hành;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Quản lý, sử dụng tài chính, tài sản đúng mục đích và có hiệu quả để phục vụ các hoạt động giáo dục.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Ứng dụng công nghệ thông tin hiệu quả trong công tác quản lý hành chính, tài chính và tài sản của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có vi phạm liên quan đến việc quản lý hành chính, tài chính và tài sản theo kết luận của thanh tra, kiểm toán. ',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có kế hoạch ngắn hạn, trung hạn và dài hạn để tạo các nguồn tài chính hợp pháp phù hợp với điều kiện nhà trường, thực tế địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]

                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.7: Quản lý cán bộ, giáo viên và nhân viên',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có kế hoạch bồi dưỡng chuyên môn, nghiệp vụ cho đội ngũ cán bộ quản lý, giáo viên và nhân viên;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Phân công, sử dụng cán bộ quản lý, giáo viên, nhân viên rõ ràng, hợp lý đảm bảo hiệu quả hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Cán bộ quản lý, giáo viên và nhân viên được đảm bảo các quyền theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có các biện pháp để phát huy năng lực của cán bộ quản lý, giáo viên, nhân viên trong việc xây dựng, phát triển và nâng cao chất lượng giáo dục nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.8: Quản lý các hoạt động giáo dục',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Kế hoạch giáo dục phù hợp với quy định hiện hành, điều kiện thực tế địa phương và điều kiện của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Kế hoạch giáo dục được thực hiện đầy đủ;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Kế hoạch giáo dục được rà soát, đánh giá, điều chỉnh kịp thời.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp chỉ đạo, kiểm tra, đánh giá của nhà trường đối với các hoạt động giáo dục, được cơ quan quản lý đánh giá đạt hiệu quả. Quản lý hoạt động dạy thêm, học thêm trong nhà trường theo quy định (nếu có).',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.9: Thực hiện quy chế dân chủ cơ sở',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Cán bộ quản lý, giáo viên, nhân viên được tham gia thảo luận, đóng góp ý kiến khi xây dựng kế hoạch, nội quy, quy định, quy chế liên quan đến các hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Các khiếu nại, tố cáo, kiến nghị, phản ánh (nếu có) thuộc thẩm quyền xử lý của nhà trường được giải quyết đúng pháp luật;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, có báo cáo thực hiện quy chế dân chủ cơ sở.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp và cơ chế giám sát việc thực hiện quy chế dân chủ cơ sở đảm bảo công khai, minh bạch, hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 1.10: Đảm bảo an ninh trật tự, an toàn trường học',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng, chống tai nạn, thương tích; an toàn phòng, chống cháy, nổ; an toàn phòng, chống thảm họa, thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường; những trường có tổ chức bếp ăn cho học sinh được cấp giấy chứng nhận đủ điều kiện an toàn thực phẩm;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Có hộp thư góp ý, đường dây nóng và các hình thức khác để tiếp nhận, xử lý các thông tin phản ánh của người dân; đảm bảo an toàn cho cán bộ quản lý, giáo viên, nhân viên và học sinh trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Không có hiện tượng kỳ thị, hành vi bạo lực, vi phạm pháp luật về bình đẳng giới trong nhà trường',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Cán bộ quản lý, giáo viên, nhân viên và học sinh được phổ biến, hướng dẫn và thực hiện phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng, chống tai nạn, thương tích; an toàn phòng, chống cháy, nổ; an toàn phòng, chống thảm họa, thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Nhà trường thường xuyên kiểm tra, thu thập, đánh giá, xử lý các thông tin, biểu hiện liên quan đến bạo lực học đường, an ninh trật tự và có biện pháp ngăn chặn kịp thời, hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về tiêu chuẩn 1',
                                                    loaichimuc: 5,
                                                }
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 2: Cán bộ quản lý, giáo viên, nhân viên và học sinh',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.1: Đối với hiệu trưởng, phó hiệu trưởng',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đạt tiêu chuẩn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Được đánh giá đạt chuẩn hiệu trưởng trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Được bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lý giáo dục theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 02 năm được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Được bồi dưỡng, tập huấn về lý luận chính trị theo quy định; được giáo viên, nhân viên trong trường tín nhiệm.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trong 05 năm liên tiếp tính đến thời điểm đánh giá, được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên, trong đó có ít nhất 01 năm được đánh giá đạt chuẩn hiệu trưởng ở mức tốt.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.2: Đối với giáo viên',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Số lượng, cơ cấu giáo viên đảm bảo thực hiện Chương trình giáo dục và tổ chức các hoạt động giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) 100% giáo viên đạt chuẩn trình độ đào tạo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Có ít nhất 95% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, tỷ lệ giáo viên trên chuẩn trình độ đào tạo được duy trì ổn định và tăng dần theo lộ trình phù hợp;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có 100% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên, trong đó có ít nhất 60% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên và có ít nhất 50% ở mức khá trở lên đối với trường thuộc vùng khó khăn;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Có khả năng tổ chức các hoạt động trải nghiệm, hướng nghiệp, định hướng phân luồng cho học sinh; có khả năng hướng dẫn nghiên cứu khoa học; trong 05 năm liên tiếp tính đến thời điểm đánh giá không có giáo viên bị kỷ luật từ hình thức cảnh cáo trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 80% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 30% đạt chuẩn nghề nghiệp giáo viên ở mức tốt; đối với trường thuộc vùng khó khăn có ít nhất 70% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 20% đạt chuẩn nghề nghiệp giáo viên ở mức tốt;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, giáo viên có báo cáo kết quả nghiên cứu khoa học.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.3: Đối với nhân viên',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có nhân viên hoặc giáo viên kiêm nhiệm để đảm nhiệm các nhiệm vụ do hiệu trưởng phân công;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Được phân công công việc phù hợp, hợp lý theo năng lực;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Hoàn thành các nhiệm vụ được giao.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Số lượng và cơ cấu nhân viên đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có nhân viên bị kỷ luật từ hình thức cảnh cáo trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có trình độ đào tạo đáp ứng được vị trí việc làm;',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Hằng năm, được tham gia đầy đủ các khóa, lớp tập huấn, bồi dưỡng chuyên môn, nghiệp vụ theo vị trí việc làm.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 2.4: Đối với học sinh',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đảm bảo về tuổi học sinh theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Thực hiện các nhiệm vụ theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Được đảm bảo các quyền theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Học sinh vi phạm các hành vi không được làm được phát hiện kịp thời, được áp dụng các biện pháp giáo dục phù hợp và có chuyển biến tích cực.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Học sinh có thành tích trong học tập, rèn luyện có ảnh hưởng tích cực đến các hoạt động của lớp và nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 2',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 3: Cơ sở vật chất và thiết bị dạy học',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.1: Khuôn viên, khu sân chơi, bãi tập',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Khuôn viên đảm bảo xanh, sạch, đẹp, an toàn để tổ chức các hoạt động giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Có cổng trường, biển tên trường và tường hoặc rào bao quanh;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Khu sân chơi, bãi tập có đủ thiết bị tối thiểu, đảm bảo an toàn để luyện tập thể dục, thể thao và các hoạt động giáo dục của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Khu sân chơi, bãi tập đáp ứng yêu cầu tổ chức các hoạt động giáo dục.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các trường nội thành, nội thị có diện tích ít nhất 6m2/học sinh; các trường khu vực nông thôn có diện tích ít nhất 10m2/học sinh; đối với trường trung học được thành lập sau năm 2001 đảm bảo có diện tích mặt bằng theo quy định. Khu sân chơi, bãi tập có diện tích ít nhất bằng 25% tổng diện tích sử dụng của trường.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.2: Phòng học, phòng học bộ môn và khối phục vụ học tập',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phòng học có đủ bàn ghế phù hợp với tầm vóc học sinh, có bàn ghế của giáo viên, có bảng viết, đủ điều kiện về ánh sáng, thoáng mát; đảm bảo học nhiều nhất là hai ca trong một ngày;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ phòng học bộ môn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Có phòng hoạt động Đoàn - Đội, thư viện và phòng truyền thống.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phòng học, phòng học bộ môn được xây dựng đạt tiêu chuẩn theo quy định, đảm bảo điều kiện thuận lợi cho học sinh khuyết tật học hòa nhập;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Khối phục vụ học tập, đáp ứng yêu cầu các hoạt động của nhà trường và theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các phòng học, phòng học bộ môn có đủ các thiết bị dạy học theo quy định. Có phòng để tổ chức các hoạt động giáo dục cho học sinh hoàn cảnh đặc biệt (nếu có).',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.3: Khối hành chính - quản trị',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đáp ứng yêu cầu tối thiểu các hoạt động hành chính - quản trị của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Khu để xe được bố trí hợp lý, đảm bảo an toàn, trật tự;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Định kỳ sửa chữa, bổ sung các thiết bị khối hành chính - quản trị.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Khối hành chính - quản trị theo quy định; khu bếp, nhà ăn, nhà nghỉ (nếu có) phải đảm bảo điều kiện sức khỏe, an toàn, vệ sinh cho giáo viên, nhân viên và học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Khối hành chính - quản trị có đầy đủ các thiết bị được sắp xếp hợp lý, khoa học và hỗ trợ hiệu quả các hoạt động nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.4: Khu vệ sinh, hệ thống cấp thoát nước',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Khu vệ sinh riêng cho nam, nữ, giáo viên, nhân viên, học sinh đảm bảo không ô nhiễm môi trường; khu vệ sinh đảm bảo sử dụng thuận lợi cho học sinh khuyết tật học hòa nhập;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Có hệ thống thoát nước đảm bảo vệ sinh môi trường; hệ thống cấp nước sạch đảm bảo nước uống và nước sinh hoạt cho giáo viên, nhân viên và học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Thu gom rác và xử lý chất thải đảm bảo vệ sinh môi trường.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Khu vệ sinh đảm bảo thuận tiện, được xây dựng phù hợp với cảnh quan và theo quy định; ',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Hệ thống cấp nước sạch, hệ thống thoát nước, thu gom và xử lý chất thải đáp ứng quy định của Bộ Giáo dục và Đào tạo và Bộ Y tế.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.5: Thiết bị',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có đủ thiết bị văn phòng và các thiết bị khác phục vụ các hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ thiết bị dạy học đáp ứng yêu cầu tối thiểu theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm các thiết bị được kiểm kê, sửa chữa.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hệ thống máy tính được kết nối Internet phục vụ công tác quản lý, hoạt động dạy học;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ thiết bị dạy học theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, được bổ sung các thiết bị dạy học và thiết bị dạy học tự làm.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phòng thí nghiệm hoặc khu vực thực hành (nếu có) đủ thiết bị đảm bảo hoạt động thường xuyên và hiệu quả; thiết bị dạy học, thiết bị dạy học tự làm được khai thác, sử dụng hiệu quả đáp ứng yêu cầu đổi mới nội dung phương pháp dạy học và nâng cao chất lượng giáo dục của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 3.6: Thư viện',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Được trang bị sách, báo, tạp chí, bản đồ, tranh ảnh giáo dục, băng đĩa giáo khoa và các xuất bản phẩm tham khảo tối thiểu phục vụ hoạt động nghiên cứu, hoạt động dạy học, các hoạt động khác của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động của thư viện đáp ứng yêu cầu tối thiểu về nghiên cứu, hoạt động dạy học, các hoạt động khác của cán bộ quản lý, giáo viên, nhân viên, học sinh; ',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm thư viện được kiểm kê, bổ sung sách, báo, tạp chí, bản đồ, tranh ảnh giáo dục, băng đĩa giáo khoa và các xuất bản phẩm tham khảo.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Thư viện của nhà trường đạt Thư viện trường học đạt chuẩn trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Thư viện của nhà trường đạt Thư viện trường học tiên tiến trở lên. Hệ thống máy tính của thư viện được kết nối Internet đáp ứng nhu cầu nghiên cứu, hoạt động dạy học, các hoạt động khác của cán bộ quản lý, giáo viên, nhân viên và học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 3',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 4: Quan hệ giữa nhà trường, gia đình và xã hội',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 4.1: Ban đại diện cha mẹ học sinh',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Được thành lập và hoạt động theo quy định tại Điều lệ Ban đại diện cha mẹ học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Có kế hoạch hoạt động theo năm học;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chức thực hiện kế hoạch hoạt động đúng tiến độ.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường trong việc tổ chức thực hiện nhiệm vụ năm học và các hoạt động giáo dục; hướng dẫn, tuyên truyền, phổ biến pháp luật, chủ trương chính sách về giáo dục đối với cha mẹ học sinh; huy động học sinh đến trường, vận động học sinh đã bỏ học trở lại lớp.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường, xã hội trong việc thực hiện các nhiệm vụ theo quy định của Điều lệ Ban đại diện cha mẹ học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 4.2: Công tác tham mưu cấp ủy đảng, chính quyền và phối hợp với các tổ chức, cá nhân của nhà trường',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tham mưu cấp ủy đảng, chính quyền để thực hiện kế hoạch giáo dục của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Tuyên truyền nâng cao nhận thức và trách nhiệm của cộng đồng về chủ trương, chính sách của Đảng, Nhà nước, ngành Giáo dục; về mục tiêu, nội dung và kế hoạch giáo dục của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Huy động và sử dụng các nguồn lực hợp pháp của các tổ chức, cá nhân đúng quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tham mưu cấp ủy đảng, chính quyền để tạo điều kiện cho nhà trường thực hiện phương hướng, chiến lược xây dựng và phát triển;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Phối hợp với các tổ chức, đoàn thể, cá nhân để giáo dục truyền thống lịch sử, văn hóa, đạo đức lối sống, pháp luật, nghệ thuật, thể dục thể thao và các nội dung giáo dục khác cho học sinh; chăm sóc di tích lịch sử, cách mạng, công trình văn hóa; chăm sóc gia đình thương binh, liệt sĩ, gia đình có công với cách mạng, Bà mẹ Việt Nam anh hùng ở địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Tham mưu cấp ủy Đảng, chính quyền và phối hợp có hiệu quả với các tổ chức, cá nhân xây dựng nhà trường trở thành trung tâm văn hóa, giáo dục của địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 4',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                        {
                                            tenchimuc: 'Tiêu chuẩn 5: Hoạt động giáo dục và kết quả giáo dục',
                                            loaichimuc: 3,
                                            children: [
                                                {
                                                    tenchimuc: 'Mở đầu',
                                                    loaichimuc: 1
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.1: Thực hiện Chương trình giáo dục phổ thông',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức dạy học đúng, đủ các môn học và các hoạt động giáo dục theo quy định, đảm bảo mục tiêu giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Vận dụng các phương pháp, kỹ thuật dạy học, tổ chức hoạt động dạy học đảm bảo mục tiêu, nội dung giáo dục, phù hợp đối tượng học sinh và điều kiện nhà trường; bồi dưỡng phương pháp tự học, năng cao khả năng làm việc theo nhóm và rèn luyện kỹ năng vận dụng kiến thức vào thực tiễn;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Các hình thức kiểm tra, đánh giá học sinh đa dạng đảm bảo khách quan và hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Thực hiện đúng chương trình, kế hoạch giáo dục; lựa chọn nội dung, thời lượng, phương pháp, hình thức dạy học phù hợp với từng đối tượng và đáp ứng yêu cầu, khả năng nhận thức của học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Phát hiện và bồi dưỡng học sinh có năng khiếu, phụ đạo học sinh gặp khó khăn trong học tập, rèn luyện.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Hằng năm, rà soát, phân tích, đánh giá hiệu quả và tác động của các biện pháp, giải pháp tổ chức các hoạt động giáo dục nhằm nâng cao chất lượng dạy học của giáo viên, học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.2: Tổ chức hoạt động giáo dục cho học sinh có hoàn cảnh khó khăn, học sinh có năng khiếu, học sinh gặp khó khăn trong học tập và rèn luyện',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có kế hoạch giáo dục cho học sinh có hoàn cảnh khó khăn, học sinh có năng khiếu, học sinh gặp khó khăn trong học tập và rèn luyện;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chức thực hiện kế hoạch hoạt động giáo dục cho học sinh có hoàn cảnh khó khăn, học sinh có năng khiếu, học sinh gặp khó khăn trong học tập và rèn luyện;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm rà soát, đánh giá các hoạt động giáo dục học sinh có hoàn cảnh khó khăn, học sinh có năng khiếu, học sinh gặp khó khăn trong học tập và rèn luyện.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Học sinh có hoàn cảnh khó khăn, học sinh có năng khiếu, học sinh gặp khó khăn trong học tập và rèn luyện đáp ứng được mục tiêu giáo dục theo kế hoạch giáo dục.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nhà trường có học sinh năng khiếu về các môn học, thể thao, nghệ thuật được cấp có thẩm quyền ghi nhận.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.3: Thực hiện nội dung giáo dục địa phương theo quy định',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Nội dung giáo dục địa phương cho học sinh được thực hiện theo kế hoạch;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Các hình thức kiểm tra, đánh giá học sinh về nội dung giáo dục địa phương đảm bảo khách quan và hiệu quả;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, rà soát, đánh giá, cập nhật tài liệu, đề xuất điều chỉnh nội dung giáo dục địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nội dung giáo dục địa phương phù hợp với mục tiêu môn học và gắn lý luận với thực tiễn.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.4: Các hoạt động trải nghiệm và hướng nghiệp',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có kế hoạch tổ chức các hoạt động trải nghiệm, hướng nghiệp theo quy định và phù hợp với điều kiện của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chức được các hoạt động trải nghiệm, hướng nghiệp theo kế hoạch; ',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Phân công, huy động giáo viên, nhân viên trong nhà trường tham gia các hoạt động trải nghiệm, hướng nghiệp.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức được các hoạt động trải nghiệm, hướng nghiệp với các hình thức phong phú phù hợp học sinh và đạt kết quả thiết thực;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Định kỳ rà soát, đánh giá kế hoạch tổ chức các hoạt động trải nghiệm, hướng nghiệp.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.5: Hình thành, phát triển các kỹ năng sống cho học sinh',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có kế hoạch định hướng giáo dục học sinh hình thành, phát triển các kỹ năng sống phù hợp với khả năng học tập của học sinh, điều kiện nhà trường và địa phương;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Quá trình rèn luyện, tích lũy kỹ năng sống, hiểu biết xã hội, thực hành pháp luật cho học sinh có chuyển biến tích cực thông qua các hoạt động giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Đạo đức, lối sống của học sinh từng bước được hình thành, phát triển phù hợp với pháp luật, phong tục tập quán địa phương và tuyền thống văn hóa dân tộc Việt Nam. ',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hướng dẫn học sinh biết tự đánh giá kết quả học tập và rèn luyện;   ',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Khả năng vận dụng kiến thức vào thực tiễn của học sinh từng bước hình thành và phát triển.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Bước đầu, học sinh có khả năng nghiên cứu khoa học, công nghệ theo người hướng dẫn, chuyên gia khoa học và người giám sát chỉ dẫn.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Tiêu chí 5.5: Kết quả giáo dục',
                                                    loaichimuc: 4,
                                                    chibaos: [
                                                        {
                                                            tieude: '1. Mô tả hiện trạng',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Mức 1:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Kết quả học lực, hạnh kiểm học sinh đạt yêu cầu theo kế hoạch của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ học sinh lên lớp và tốt nghiệp đạt yêu cầu theo kế hoạch của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'c) Định hướng phân luồng cho học sinh đạt yêu cầu theo kế hoạch của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 1,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Kết quả học lực, hạnh kiểm của học sinh có chuyển biến tích cực trong 05 năm liên tiếp tính đến thời điểm đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ học sinh lên lớp và tốt nghiệp có chuyển biến tích cực trong 05 năm liên tiếp tính đến thời điểm đánh giá.',
                                                            loai: 2,
                                                            thuocmuc: 2,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Kết quả học lực, hạnh kiểm của học sinh: - Tỷ lệ học sinh xếp loại giỏi của trường thuộc vùng khó khăn: Đạt ít nhất 05% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở), trường trung học phổ thông (hoặc cấp trung học phổ thông) và 20% đối với trường chuyên; - Tỷ lệ học sinh xếp loại giỏi của trường thuộc các vùng còn lại: Đạt ít nhất 10% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở), trường trung học phổ thông (hoặc cấp trung học phổ thông) và 25% đối với trường chuyên; - Tỷ lệ học sinh xếp loại khá của trường thuộc vùng khó khăn: Đạt ít nhất 30% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở), 20% đối với trường trung học phổ thông (hoặc cấp trung học phổ thông) và 55% đối với trường chuyên; - Tỷ lệ học sinh xếp loại khá của trường thuộc các vùng còn lại: Đạt ít nhất 35% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở), 25% đối với trường trung học phổ thông (hoặc cấp trung học phổ thông) và 60% đối với trường chuyên; - Tỷ lệ học sinh xếp loại yếu, kém của trường thuộc vùng khó khăn: không quá 10% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở) và trường trung học phổ thông (hoặc cấp trung học phổ thông), trường chuyên không có học sinh yếu, kém; - Tỷ lệ học sinh xếp loại yếu, kém của trường thuộc các vùng còn lại: không quá 05% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở) và trường trung học phổ thông (hoặc cấp trung học phổ thông), trường chuyên không có học sinh yếu, kém; - Đối với nhà trường có lớp tiểu học: Tỷ lệ học sinh hoàn thành chương trình lớp học đạt 95%; tỷ lệ trẻ em 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 90%, đối với trường thuộc xã có điều kiện kinh tế - xã hội đặc biệt khó khăn đạt ít nhất 80%; các trẻ em 11 tuổi còn lại đều đang học các lớp tiểu học; - Tỷ lệ học sinh xếp loại hạnh kiểm khá, tốt đạt ít nhất 90% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở), trường trung học phổ thông (hoặc cấp trung học phổ thông) và 98% đối với trường chuyên.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ học sinh bỏ học và lưu ban: Vùng khó khăn: Không quá 03% học sinh bỏ học, không quá 05% học sinh lưu ban; trường chuyên không có học sinh lưu ban và học sinh bỏ học; Các vùng còn lại: Không quá 01% học sinh bỏ học, không quá 02% học sinh lưu ban; trường chuyên không có học sinh lưu ban và học sinh bỏ học.',
                                                            loai: 2,
                                                            thuocmuc: 3,
                                                            noiham: null,
                                                            cauhoi: null,
                                                            canthuthap: null,
                                                            noithuthap: null
                                                        },
                                                        {
                                                            tieude: '2. Điểm mạnh:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '3. Điểm yếu:',
                                                            loai: 1
                                                        },
                                                        {
                                                            tieude: '4. Kế hoạch cải tiến chất lượng:',
                                                            loai: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    tenchimuc: 'Kết luận về Tiêu chuẩn 5',
                                                    loaichimuc: 5,
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    tenchimuc: 'III. KẾT LUẬN CHUNG',
                    loaichimuc: 1
                }
            ]
    }
}

export const handleMinhchungRawData = (rawDatas) => {
    let handledData1 = rawDatas.map(i => ({
        matieuchi: i[0] == undefined ? null : getMaTieuChi(i[0]),
        maminhchung: i[2],
        tenminhchung: i[3],
        songaybanhanh: i[4] == undefined ? null : i[4],
        noibanhanh: i[5] == undefined ? null : i[5],
        ghichu: i[6] == undefined ? null : i[6],
        sotieuchi: getSotieuchi(i[2]),
        thutu: getSothutu(i[2]).slice(0, -1),
    }))
    let matieuchiArr = handledData1.map(i => i.matieuchi);
    let handleData2 = handledData1.map((i, index) => ({
        ...i,
        matieuchi: i.matieuchi == null ? findNearestTieuchi(matieuchiArr, index) : i.matieuchi
    }))
    return handleData2;
};

export const handleMinhchungRawDataToExportData = (rawDatas, tieuchis) => {
    let handledData1 = rawDatas.map(i => ({
        thutu: i[1] == undefined ? null : i[1],
        maminhchung: i[2] == undefined ? null : i[2],
        tenminhchung: i[3] == undefined ? null : i[3],
        songaybanhanh: i[4] == undefined ? null : i[4],
        noibanhanh: i[5] == undefined ? null : i[5],
        ghichu: i[6] == undefined ? null : i[6],
        matieuchi: i[0] == undefined ? null : getMaTieuChi(i[0]),
    }))
    let matieuchiArr = handledData1.map(i => i.matieuchi);
    let handleData2 = handledData1.map((i, index) => ({
        ...i,
        matieuchi: i.matieuchi == null ? findNearestTieuchi(matieuchiArr, index) : i.matieuchi
    }))

    handleData2 = handleData2.map(i => {
        let tieuchi = tieuchis.find(j => j.matieuchi == i.matieuchi);
        let tieuchiid;
        if(tieuchi) {
            tieuchiid = tieuchi.id
        }
        return {
            ...i,
            tieuchiid
        }
    })
    return handleData2;
};

const getMaTieuChi = (tentieuchi) => {
    if (tentieuchi.length > 0) {
        let tentieuchiArr = tentieuchi.split(' ');
        return tentieuchiArr[tentieuchiArr.length - 1];
    }
    return null;
}

const findNearestTieuchi = (array, index) => {
    while (index > 0) {
        index -= 1;
        if (array[index] != null) {
            return array[index];
        }
    }
}

const getSotieuchi = (maminhchung) => {
    if (!maminhchung || maminhchung.length == 0) return null;
    let machinhchungItemArr = maminhchung.split('-');
    return machinhchungItemArr[1];
}

const getSothutu = (maminhchung) => {
    if (!maminhchung || maminhchung.length == 0 || maminhchung == undefined) return null;
    let machinhchungItemArr = maminhchung.split('-');
    return machinhchungItemArr[2];
}

export const assignMinhchungToTieuchiAndUser = (tieuchis, minhchungs) => {
    if (!tieuchis || !minhchungs || tieuchis.length == 0 || minhchungs.length == 0) return null;
    let referenceMinhchungs = minhchungs.filter(i => i.matieuchi !== i.sotieuchi).map(i => {
        let { matieuchi } = i;
        let tieuchi = tieuchis.find(i => i.matieuchi == matieuchi);
        if (tieuchi) {
            matieuchi = tieuchi.id
        }
        return {
            ...i,
            matieuchi
        }
    });
    minhchungs = minhchungs.filter(i => i.matieuchi == i.sotieuchi);
    minhchungs = minhchungs.map(i => {
        let { sotieuchi } = i;
        let tieuchi = tieuchis.find(i => i.matieuchi == sotieuchi);
        if (tieuchi) {
            let { users } = tieuchi;
            users = users.filter(i => i.isTimkiemminhchung);
            i.tieuchiid = tieuchi.id;
            i.users = users.map(i => i.id);
        }
        return {
            ...i,
            referenceTieuchis: []
        }
    });
    let uniqueMinhChungs = Array.from(new Set(minhchungs.map(i => i.maminhchung))).map(maminhchung => {
        return minhchungs.find(i => i.maminhchung == maminhchung);
    });
    referenceMinhchungs.forEach(i => {
        let { matieuchi, maminhchung } = i;
        let minhchung = uniqueMinhChungs.find(j => j.maminhchung == maminhchung);
        if (minhchung && !minhchung.referenceTieuchis.includes(matieuchi)) {
            minhchung.referenceTieuchis.push(matieuchi);
        }
    });
    return uniqueMinhChungs;
}

export const generateMinhChungsTreeData = (tieuchis) => {
    if (!tieuchis || tieuchis.length == 0) return null;
    return tieuchis.map(i => {
        let { tenchimuc, id: tieuchiId, minhchungs, minhchungthamkhaos } = i
        let totalMinhChungs = [...minhchungs, ...minhchungthamkhaos];
        return {
            title: tenchimuc.split(':')[0],
            key: '0-' + tieuchiId,
            selectable: false,
            children: minhchungs.length > 0 && totalMinhChungs.map(m => {
                let { id, maminhchung } = m;
                return {
                    id,
                    title: maminhchung,
                    key: '0-' + tieuchiId + '-' + id
                }
            })
        }
    });
}

export const generateTieuChuansTreeData = (tieuchuans) => {
    if(!tieuchuans || tieuchuans.length == 0) return null;
    return tieuchuans.map(i => {
        let { tenchimuc, id : tieuchuanId, tieuchis } = i;
        return {
            title: tenchimuc,
            key: '0-' + tieuchuanId,
            selectable: false,
            children: tieuchis.length > 0 && tieuchis.map(t => {
                let { id : tieuchiId , tenchimuc : tenTieuchi } = t;
                return {
                    id : tieuchiId,
                    title: tenTieuchi.split(':')[0],
                    key: '0-' + tieuchuanId + '-' + tieuchiId
                }
            })
        }
    })
}
