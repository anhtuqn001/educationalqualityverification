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
                                    col5: '0'
                                },
                                {
                                    name: 'Nhóm trẻ từ 13 đến 24 tháng tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Nhóm trẻ từ 25 đến 36 tháng tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Số lớp mẫu giáo 3-4 tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Số lớp mẫu giáo 4-5 tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Số lớp mẫu giáo 5-6 tuổi',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Cộng',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                }
                            ]
                        },
                        {
                            tenchimuc: '2. Cơ cấu khối công trình của nhà trường',
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
                                    name: 'Khối phòng nhóm trẻ, lớp mẫu giáo',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Khối phòng phục vụ học tập',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Khối phòng hành chính quản trị',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Khối phòng tổ chức ăn',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Cộng',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
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
                                            col7: ' '
                                        },
                                        {
                                            name: 'Phó Hiệu trưởng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                        {
                                            name: 'Giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                        {
                                            name: 'Nhân viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                        {
                                            name: 'Cộng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                    ]
                                },
                                {
                                    tenchimuc: 'b) Số liệu của 5 năm gần đây',
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
                                        }
                                    ],
                                    rows: [
                                        {
                                            name: 'Tổng số giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            name: 'Tỷ lệ trẻ em/ giáo viên (đối với nhóm trẻ)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            name: 'Tỷ lệ trẻ em/ giáo viên (đối với lớp mẫu giáo không có trẻ bán trú)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            name: 'Tỷ lệ trẻ em/ giáo viên (đối với lớp mẫu giáo có trẻ bán trú)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            name: 'Tổng số giáo viên dạy giỏi cấp huyện hoặc tương đương trở lên (nếu có)',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Được xác định bằng văn bản và cấp có thẩm quyền phê duyệt;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Được công bố công khai bằng hình thức niêm yết tại nhà trường hoặc đăng tải trên trang thông tin điện tử của nhà trường (nếu có) hoặc đăng tải trên các phương tiện thông tin đại chúng của địa phương, trang thông tin điện tử của phòng giáo dục và đào tạo.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nhà trường có các giải pháp giám sát việc thực hiện phương hướng, chiến lược xây dựng và phát triển.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0
                                                        },
                                                        {
                                                            tieude: 'Định kỳ rà soát, bổ sung, điều chỉnh phương hướng, chiến lược xây dựng và phát triển. Tổ chức xây dựng phương hướng, chiến lược xây dựng và phát triển có sự tham gia của các thành viên trong Hội đồng trường (Hội đồng quản trị đối với trường tư thục), cán bộ quản lý, giáo viên, nhân viên, cha mẹ trẻ và cộng đồng.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Thực hiện chức năng, nhiệm vụ và quyền hạn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Các hoạt động được định kỳ rà soát, đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Hoạt động có hiệu quả, góp phần nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ của nhà trường. ',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, các hoạt động được rà soát, đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức Đảng Cộng sản Việt Nam có cơ cấu tổ chức và hoạt động theo quy định; trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 01 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác có đóng góp tích cực cho các hoạt động của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, tổ chức Đảng Cộng sản Việt Nam có ít nhất 02 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác đóng góp hiệu quả cho các hoạt động của nhà trường và cộng đồng.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn và tổ văn phòng có cơ cấu tổ chức theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chuyên môn, tổ văn phòng có kế hoạch hoạt động và thực hiện các nhiệm vụ theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hằng năm, tổ chuyên môn đề xuất và thực hiện được ít nhất 01 (một) chuyên đề chuyên môn có tác dụng nâng cao chất lượng hiệu quả giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động của tổ chuyên môn và tổ văn phòng được định kỳ rà soát, đánh giá, điều chỉnh.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hoạt động của tổ chuyên môn và tổ văn phòng có đóng góp hiệu quả trong việc nâng cao chất lượng các hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn thực hiện hiệu quả các chuyên đề chuyên môn góp phần nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Các nhóm trẻ, lớp mẫu giáo được tổ chức học 02 buổi trên ngày;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Mỗi nhóm trẻ, lớp mẫu giáo có không quá 02 (hai) trẻ cùng một dạng khuyết tật.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Số trẻ trong các nhóm trẻ và lớp mẫu giáo không vượt quá quy định và được phân chia theo độ tuổi.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nhà trường có không quá 20 (hai mươi) nhóm trẻ, lớp mẫu giáo.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Lập dự toán, thực hiện thu chi, quyết toán, thống kê, báo cáo tài chính và tài sản; công khai và định kỳ tự kiểm tra tài chính, tài sản theo quy định; quy chế chi tiêu nội bộ được bổ sung, cập nhật phù hợp với điều kiện thực tế và các quy định hiện hành;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Quản lý, sử dụng tài chính, tài sản đúng mục đích và có hiệu quả để phục vụ các hoạt động giáo dục.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Ứng dụng công nghệ thông tin hiệu quả trong công tác quản lý hành chính, tài chính và tài sản của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có vi phạm liên quan đến việc quản lý hành chính, tài chính và tài sản theo kết luận của thanh tra, kiểm toán.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có kế hoạch ngắn hạn, trung hạn, dài hạn để tạo ra các nguồn tài chính hợp pháp phù hợp với điều kiện nhà trường, thực tế địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Phân công, sử dụng cán bộ quản lý, giáo viên, nhân viên rõ ràng, hợp lý, đảm bảo hiệu quả hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Cán bộ quản lý, giáo viên, nhân viên được đảm bảo các quyền theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có biện pháp để phát huy được năng lực của cán bộ quản lý, giáo viên, nhân viên trong việc xây dựng, phát triển và nâng cao chất lượng giáo dục nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Kế hoạch giáo dục được thực hiện đầy đủ;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Kế hoạch giáo dục được rà soát, đánh giá, điều chỉnh kịp thời.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp chỉ đạo, kiểm tra, đánh giá của nhà trường đối với các hoạt động nuôi dưỡng, chăm sóc và giáo dục trẻ, được cơ quan quản lý đánh giá đạt hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Các khiếu nại, tố cáo, kiến nghị, phản ánh (nếu có) thuộc thẩm quyền xử lý của nhà trường được giải quyết đúng pháp luật;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, có báo cáo thực hiện quy chế dân chủ cơ sở.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp và cơ chế giám sát việc thực hiện quy chế dân chủ trong nhà trường đảm bảo công khai, minh bạch, hiệu quả. ',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có hộp thư góp ý, đường dây nóng và các hình thức khác để tiếp nhận, xử lý các thông tin phản ánh của người dân; đảm bảo an toàn cho cán bộ quản lý, giáo viên, nhân viên và trẻ trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Không có hiện tượng kỳ thị, hành vi bạo lực, vi phạm pháp luật về bình đẳng giới trong nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Cán bộ quản lý, giáo viên, nhân viên và trẻ được phổ biến, hướng dẫn, thực hiện phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng chống tai nạn, thương tích; an toàn phòng, chống cháy nổ; an toàn phòng, chống thảm họa thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Nhà trường thường xuyên kiểm tra, thu thập, đánh giá, xử lý các thông tin, biểu hiện liên quan đến bạo lực học đường, an ninh trật tự và có biện pháp ngăn chặn kịp thời, hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Được đánh giá đạt chuẩn hiệu trưởng trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Được bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lý giáo dục theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 02 năm được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Được bồi dưỡng, tập huấn về lý luận chính trị theo quy định; được giáo viên, nhân viên trong trường tín nhiệm.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trong 05 năm liên tiếp tính đến thời điểm đánh giá, đạt chuẩn hiệu trưởng ở mức khá trở lên, trong đó có ít nhất 01 năm đạt chuẩn hiệu trưởng ở mức tốt.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) 100% giáo viên đạt chuẩn trình độ đào tạo theo quy định; ',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Có ít nhất 95% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 55%; đối với các trường thuộc vùng khó khăn đạt ít nhất 40%; trong 05 năm liên tiếp tính đến thời điểm đánh giá, tỷ lệ giáo viên trên chuẩn trình độ đào tạo được duy trì ổn định và tăng dần theo lộ trình phù hợp;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có 100% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên, trong đó có ít nhất 60% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên và ít nhất 50% ở mức khá trở lên đối với trường thuộc vùng khó khăn;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có giáo viên bị kỷ luật từ hình thức cảnh cáo trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 65%, đối với các trường thuộc vùng khó khăn đạt ít nhất 50%;',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 80% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 30% đạt chuẩn nghề nghiệp giáo viên ở mức tốt; đối với trường thuộc vùng khó khăn có ít nhất 70% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 20% đạt chuẩn nghề nghiệp giáo viên ở mức tốt.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Được phân công công việc phù hợp, hợp lý theo năng lực;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hoàn thành các nhiệm vụ được giao.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Số lượng và cơ cấu nhân viên đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có nhân viên bị kỷ luật từ hình thức cảnh cáo trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có trình độ đào tạo đáp ứng được vị trí việc làm;',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Hằng năm, được tham gia đầy đủ các lớp tập huấn, bồi dưỡng chuyên môn, nghiệp vụ theo vị trí việc làm.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có cổng, biển tên trường, tường hoặc hàng rào bao quanh; khuôn viên đảm bảo vệ sinh, phù hợp cảnh quan, môi trường thân thiện và an toàn cho trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Có sân chơi, hiên chơi, hành lang của nhóm, lớp; sân chơi chung; sân chơi - cây xanh bố trí phù hợp với điều kiện của nhà trường, an toàn, đảm bảo cho tất cả trẻ được sử dụng.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Diện tích xây dựng công trình và diện tích sân vườn đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Khuôn viên có tường bao ngăn cách với bên ngoài; có sân chơi của nhóm, lớp; có nhiều cây xanh tạo bóng mát sân trường, thường xuyên được chăm sóc, cắt tỉa đẹp; có vườn cây dành riêng cho trẻ chăm sóc, bảo vệ và tạo cơ hội cho trẻ khám phá, học tập;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) Khu vực trẻ chơi có đủ thiết bị và đồ chơi ngoài trời theo quy định; có rào chắn an toàn ngăn cách với ao, hồ (nếu có).',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Sân vườn có khu vực riêng để thực hiện các hoạt động giáo dục phát triển vận động, có đủ các loại thiết bị và đồ chơi ngoài trời theo Danh mục thiết bị và đồ chơi ngoài trời cho giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành và có bổ sung thiết bị đồ chơi ngoài Danh mục phù hợp với thực tế, đảm bảo an toàn cho trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có phòng sinh hoạt chung, phòng ngủ (có thể dùng phòng sinh hoạt chung làm phòng ngủ đối với lớp mẫu giáo); có phòng để tổ chức hoạt động giáo dục thể chất, giáo dục nghệ thuật hoặc phòng đa chức năng, đảm bảo đáp ứng được nhu cầu tối thiểu hoạt động nuôi dưỡng, chăm sóc và giáo dục trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Có hệ thống đèn, hệ thống quạt (ở nơi có điện); có tủ đựng hồ sơ, thiết bị dạy học.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phòng sinh hoạt chung, phòng ngủ, phòng giáo dục thể chất, phòng giáo dục nghệ thuật hoặc phòng đa chức năng đảm bảo đạt chuẩn theo quy định; ',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Hệ thống tủ, kệ, giá đựng đồ chơi, đồ dùng, tài liệu đảm bảo đủ theo quy định, được sắp xếp hợp lý, an toàn, thuận tiện khi sử dụng.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có phòng riêng để tổ chức cho trẻ làm quen với ngoại ngữ, tin học và âm nhạc.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có trang thiết bị tối thiểu tại các phòng;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Khu để xe cho cán bộ quản lý, giáo viên, nhân viên được bố trí hợp lý, đảm bảo an toàn, trật tự.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đảm bảo diện tích theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Khu để xe cho cán bộ quản lý, giáo viên, nhân viên có mái che đảm bảo an toàn, tiện lợi.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có đủ các phòng, đảm bảo theo Tiêu chuẩn quốc gia về yêu cầu thiết kế trường mầm non.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Kho thực phẩm được phân chia thành khu vực để các loại thực phẩm riêng biệt, đảm bảo các quy định về vệ sinh an toàn thực phẩm;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Có tủ lạnh lưu mẫu thức ăn.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Bếp ăn đảm bảo theo quy định tại Điều lệ trường mầm non.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Bếp ăn đảm bảo theo Tiêu chuẩn quốc gia về yêu cầu thiết kế trường mầm non.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Các thiết bị, đồ dùng, đồ chơi tự làm hoặc ngoài danh mục quy định phải đảm bảo tính giáo dục, an toàn, phù hợp với trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm các thiết bị được kiểm kê, sửa chữa.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hệ thống máy tính được kết nối Internet phục vụ công tác quản lý, hoạt động dạy học;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ thiết bị dạy học theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, được bổ sung các thiết bị dạy học, thiết bị dạy học tự làm.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các thiết bị, đồ dùng, đồ chơi tự làm hoặc ngoài danh mục quy định được khai thác và sử dụng hiệu quả, đáp ứng yêu cầu đổi mới nội dung, phương pháp giáo dục, nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có hệ thống thoát nước đảm bảo vệ sinh môi trường; hệ thống nước sạch đảm bảo nước uống và nước sinh hoạt cho giáo viên, nhân viên và trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Thu gom rác và xử lý chất thải đảm bảo vệ sinh môi trường.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phòng vệ sinh cho trẻ, khu vệ sinh cho cán bộ quản lý, giáo viên, nhân viên thuận tiện, được xây dựng phù hợp với cảnh quan và theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Hệ thống cung cấp nước sạch, hệ thống thoát nước, thu gom và xử lý chất thải đáp ứng quy định của Bộ Giáo dục và Đào tạo và Bộ Y tế.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có kế hoạch hoạt động theo năm học; ',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chức thực hiện kế hoạch hoạt động đúng tiến độ.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường trong việc tổ chức thực hiện nhiệm vụ năm học và các hoạt động giáo dục; hướng dẫn, tuyên truyền, phổ biến pháp luật, chủ trương chính sách về giáo dục đối với cha mẹ trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường, xã hội trong việc thực hiện các nhiệm vụ theo quy định của Điều lệ Ban đại diện cha mẹ học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tuyên truyền nâng cao nhận thức và trách nhiệm của cộng đồng về chủ trương, chính sách của Đảng, Nhà nước, ngành giáo dục, về mục tiêu, nội dung và kế hoạch giáo dục của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Huy động và sử dụng các nguồn lực hợp pháp của các tổ chức, cá nhân đúng quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tham mưu cấp ủy đảng, chính quyền để tạo điều kiện cho nhà trường thực hiện phương hướng, chiến lược xây dựng và phát triển;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Phối hợp với các tổ chức, đoàn thể, cá nhân để tổ chức các hoạt động lễ hội, sự kiện theo kế hoạch, phù hợp với truyền thống của địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Tham mưu cấp ủy Đảng, chính quyền và phối hợp có hiệu quả với các tổ chức, cá nhân xây dựng nhà trường trở thành trung tâm văn hóa, giáo dục của địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Nhà trường phát triển Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành phù hợp quy định về chuyên môn của cơ quan quản lý giáo dục, với điều kiện nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Định kỳ rà soát, đánh giá việc thực hiện Chương trình giáo dục mầm non và có điều chỉnh kịp thời, phù hợp.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức thực hiện Chương trình giáo dục mầm non đảm bảo chất lượng;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Nhà trường phát triển Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành, phù hợp với văn hóa địa phương, đáp ứng khả năng và nhu cầu của trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Nhà trường phát triển Chương trình giáo dục mầm non do Bộ Giáo dục và Đào tạo ban hành trên cơ sở tham khảo chương trình giáo dục của các nước trong khu vực và thế giới đúng quy định, hiệu quả, phù hợp với thực tiễn của trường, địa phương;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Hằng năm, tổng kết, đánh giá việc thực hiện chương trình giáo dục của nhà trường, từ đó điều chỉnh, cải tiến nội dung, phương pháp giáo dục để nâng cao chất lượng nuôi dưỡng, chăm sóc và giáo dục trẻ.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chức môi trường giáo dục theo hướng tạo điều kiện cho trẻ được vui chơi, trải nghiệm;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chức các hoạt động giáo dục bằng nhiều hình thức đa dạng phù hợp với độ tuổi của trẻ và điều kiện thực tế.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Tổ chức các hoạt động thực hành, trải nghiệm, khám phá môi trường xung quanh phù hợp với nhu cầu, hứng thú của trẻ và điều kiện thực tế.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Tổ chức môi trường giáo dục trong và ngoài lớp học phù hợp với nhu cầu, khả năng của trẻ, kích thích hứng thú, tạo cơ hội cho trẻ tham gia hoạt động vui chơi, trải nghiệm theo phương châm “chơi mà học, học bằng chơi”.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) 100% trẻ được kiểm tra sức khỏe, đo chiều cao, cân nặng, đánh giá tình trạng dinh dưỡng bằng biểu đồ tăng trưởng theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Ít nhất 80% trẻ suy dinh dưỡng, thừa cân, béo phì được can thiệp bằng những biện pháp phù hợp, tình trạng dinh dưỡng của trẻ cải thiện so với đầu năm học.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Nhà trường tổ chức tư vấn cho cha mẹ trẻ hoặc người giám hộ về các vấn đề liên quan đến sức khỏe, phát triển thể chất và tinh thần của trẻ;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Chế độ dinh dưỡng của trẻ tại trường được đảm bảo cân đối, đáp ứng nhu cầu dinh dưỡng, đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) 100% trẻ suy dinh dưỡng, thừa cân, béo phì được can thiệp bằng những biện pháp phù hợp, tình trạng dinh dưỡng của trẻ cải thiện so với đầu năm học.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có ít nhất 95% trẻ khỏe mạnh, chiều cao, cân nặng phát triển bình thường.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ trẻ 5 tuổi hoàn thành Chương trình giáo dục mầm non đạt ít nhất 85%; trường thuộc vùng khó khăn đạt ít nhất 80%;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Trẻ khuyết tật học hòa nhập, trẻ có hoàn cảnh khó khăn được nhà trường quan tâm giáo dục theo kế hoạch giáo dục cá nhân.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ chuyên cần đạt ít nhất 95% đối với trẻ 5 tuổi, 90% đối với trẻ dưới 5 tuổi; trường thuộc vùng khó khăn đạt ít nhất 90% đối với trẻ 5 tuổi, 85% đối với trẻ dưới 5 tuổi;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ trẻ 5 tuổi hoàn thành Chương trình giáo dục mầm non đạt ít nhất 95%; trường thuộc vùng khó khăn đạt ít nhất 90%;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) Trẻ khuyết tật học hòa nhập (nếu có) được đánh giá có tiến bộ đạt ít nhất 80%.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ trẻ 5 tuổi hoàn thành Chương trình giáo dục mầm non đạt ít nhất 97%; trường thuộc vùng khó khăn đạt ít nhất 95%;',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Trẻ khuyết tật học hòa nhập (nếu có) được đánh giá có tiến bộ đạt ít nhất 85%.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                    col5: '0'
                                },
                                {
                                    name: 'Khối lớp 2',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Khối lớp 3',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Khối lớp 4',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Khối lớp 5',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Cộng',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                }
                            ]
                        },
                        {
                            tenchimuc: '2. Cơ cấu khối công trình của nhà trường',
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
                                    name: 'Phòng học, phòng học bộ môn và khối phục vụ học tập',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng học',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng học bộ môn',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Khối phòng phục vụ học tập',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Khối phòng hành chính - quản trị',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Thư viện',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Các công trình, khối phòng chức năng khác (nếu có)',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Cộng',
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
                                            col7: ' '
                                        },
                                        {
                                            name: 'Phó Hiệu trưởng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                        {
                                            name: 'Tổng phụ trách Đội',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                        {
                                            name: 'Giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                        {
                                            name: 'Nhân viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                        {
                                            name: 'Cộng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                    ]
                                },
                                {
                                    tenchimuc: 'b) Số liệu của 5 năm gần đây',
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
                                        }
                                    ],
                                    rows: [
                                        {
                                            name: 'Tổng số giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            name: 'Tỷ lệ giáo viên/lớp',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            name: 'Tỷ lệ giáo viên/học sinh',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            name: 'Tổng số giáo viên dạy giỏi cấp huyện hoặc tương đương trở lên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Được xác định bằng văn bản và cấp có thẩm quyền phê duyệt;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Được công bố công khai bằng hình thức niêm yết tại nhà trường hoặc đăng tải trên trang thông tin điện tử của nhà trường (nếu có) hoặc đăng tải trên các phương tiện thông tin đại chúng của địa phương, trang thông tin điện tử của phòng giáo dục và đào tạo.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nhà trường có các giải pháp giám sát việc thực hiện phương hướng, chiến lược xây dựng và phát triển.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0
                                                        },
                                                        {
                                                            tieude: 'Định kỳ rà soát, bổ sung, điều chỉnh phương hướng, chiến lược xây dựng và phát triển. Tổ chức xây dựng phương hướng, chiến lược xây dựng và phát triển có sự tham gia của các thành viên trong Hội đồng trường (Hội đồng quản trị đối với trường tư thục), cán bộ quản lý, giáo viên, nhân viên, cha mẹ học sinh và cộng đồng.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Thực hiện chức năng, nhiệm vụ và quyền hạn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Các hoạt động được định kỳ rà soát, đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Hoạt động có hiệu quả, góp phần nâng cao chất lượng giáo dục của nhà trường',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, các hoạt động được rà soát, đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức Đảng Cộng sản Việt Nam có cơ cấu tổ chức và hoạt động theo quy định; trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 01 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác có đóng góp tích cực cho các hoạt động của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, tổ chức Đảng Cộng sản Việt Nam có ít nhất 02 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác đóng góp hiệu quả cho các hoạt động của nhà trường và cộng đồng',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn và tổ văn phòng có cơ cấu tổ chức theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chuyên môn, tổ văn phòng có kế hoạch hoạt động và thực hiện các nhiệm vụ theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hằng năm, tổ chuyên môn đề xuất và thực hiện được ít nhất 01 (một) chuyên đề chuyên môn có tác dụng nâng cao chất lượng hiệu quả giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động của tổ chuyên môn, tổ văn phòng được định kỳ rà soát, đánh giá, điều chỉnh.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hoạt động của tổ chuyên môn, tổ văn phòng, có đóng góp hiệu quả trong việc nâng cao chất lượng các hoạt động của nhà trường',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn thực hiện hiệu quả các chuyên đề chuyên môn góp phần nâng cao chất lượng giáo dục',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Học sinh được tổ chức theo lớp học; lớp học được tổ chức theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Lớp học hoạt động theo nguyên tắc tự quản, dân chủ',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trường có không quá 30 (ba mươi) lớp;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Sĩ số học sinh trong lớp theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chức lớp học linh hoạt và phù hợp với các hình thức hoạt động giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Lập dự toán, thực hiện thu chi, quyết toán, thống kê, báo cáo tài chính và cơ sở vật chất; công khai và định kỳ tự kiểm tra tài chính, tài sản theo quy định; quy chế chỉ tiêu nội bộ được bổ sung, cập nhật phù hợp với điều kiện thực tế và các quy định hiện hành;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Quản lý, sử dụng tài chính, tài sản đúng mục đích và có hiệu quả để khắc phục các hoạt động giáo dục',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Ứng dụng công nghệ thông tin trong công tác quản lý hành chính, tài chính và tài sản của nhà trường',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có vi phạm liên quan đến việc quản lý hành chính, tài chính và tài sản theo kết luận của thanh tra, kiểm toán',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có kế hoạch dài hạn, trung hạn và ngắn hạn để tạo các nguồn tài chính hợp pháp phù hợp với điều kiện nhà trường, thực tế địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Phân công, sử dụng cán bộ quản lý, giáo viên, nhân viên rõ ràng, hợp lý đảm bảo hiệu quả các hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Cán bộ quản lý, giáo viên và nhân viên được đảm bảo các quyền theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có các biện pháp để phát huy năng lực của cán bộ quản lý, giáo viên, nhân viên trong việc xây dựng, phát triển và nâng cao chất lượng giáo dục nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Kế hoạch giáo dục được thực hiện đầy đủ;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Kế hoạch giáo dục được rà soát, đánh giá, điều chỉnh kịp thời',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp chỉ đạo, kiểm tra, đánh giá của nhà trường đối với các hoạt động giáo dục, được cơ quan quản lý đánh giá hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Các khiếu nại, tố cáo, kiến nghị, phản ánh (nếu có) thuộc thẩm quyền xử lý của nhà trường được giải quyết đúng pháp luật;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, có báo cáo thực hiện quy chế dân chủ cơ sở',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp và cơ chế giám sát việc thực hiện quy chế dân chủ cơ sở đảm bảo công khai, minh bạch, hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có hộp thư góp ý, đường dây nóng và các hình thức khác để tiếp nhận, xử lý các thông tin phản ánh của người dân; đảm bảo an toàn cho cán bộ quản lý, giáo viên, nhân viên và học sinh trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Không có hiện tượng kỳ thị, hành vi bạo lực, vi phạm pháp luật về bình đẳng giới trong nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Cán bộ quản lý, giáo viên, nhân viên và học sinh được phổ biến, hướng dẫn, thực hiện phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng, chống tai nạn, thương tích; an toàn phòng, chống cháy, nổ; an toàn phòng, chống thảm họa, thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Nhà trường thường xuyên kiểm tra, thu thập, đánh giá, xử lý các thông tin, biểu hiện liên quan đến bạo lực học đường, an ninh trật tự và có biện pháp ngăn chặn kịp thời, hiệu quả;',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Được đánh giá đạt chuẩn hiệu trưởng trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Được bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lý giáo dục theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 02 năm được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Được bồi dưỡng, tập huấn về lý luận chính trị theo quy định; được giáo viên, nhân viên trong trường tín nhiệm.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trong 05 năm liên tiếp tính đến thời điểm đánh giá, đạt chuẩn hiệu trưởng ở mức khá trở lên, trong đó có ít nhất 01 năm đạt chuẩn hiệu trưởng ở mức tốt;',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) 100% giáo viên đạt chuẩn trình độ đào tạo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Có ít nhất 95% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên. ',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 55%; đối với các trường thuộc vùng khó khăn đạt ít nhất 40% ;trong 05 năm liên tiếp tính đến thời điểm đánh giá, tỷ lệ giáo viên trên chuẩn trình độ đào tạo được duy trì ổn định và tăng dần theo lộ trình phù hợp;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có 100% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên, trong đó có ít nhất 60% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên và có ít nhất 50% ở mức khá trở lên đối với trường thuộc vùng khó khăn;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có giáo viên bị kỷ luật từ hình thức cảnh cáo trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ giáo viên đạt trên chuẩn trình độ đào tạo đạt ít nhất 65%, đối với các trường thuộc vùng khó khăn đạt ít nhất 50%',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 80% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 30% đạt chuẩn nghề nghiệp giáo viên ở mức tốt; đối với trường thuộc vùng khó khăn có ít nhất 70% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 20% đạt chuẩn nghề nghiệp giáo viên ở mức tốt;',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Được phân công công việc phù hợp, hợp lý theo năng lực;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hoàn thành các nhiệm vụ được giao.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Số lượng và cơ cấu nhân viên đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có nhân viên bị kỷ luật từ hình thức cảnh cáo trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có trình độ đào tạo đáp ứng được vị trí việc làm;',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Hằng năm, được tham gia đầy đủ các khóa, lớp tập huấn, bồi dưỡng chuyên môn, nghiệp vụ theo vị trí việc làm',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Thực hiện các nhiệm vụ theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Được đảm bảo các quyền theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Học sinh vi phạm các hành vi không được làm được phát hiện kịp thời, được áp dụng các biện pháp giáo dục phù hợp và có chuyển biến tích cực.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Học sinh có thành tích trong học tập, rèn luyện có ảnh hưởng tích cực đến các hoạt động của lớp và nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có cổng trường, biển tên trường và tường hoặc hàng rào bao quanh;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Có sân chơi, sân tập thể dục thể thao.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Diện tích khuôn viên, sân chơi, sân tập theo quy định',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Sân chơi, sân tập đảm bảo cho học sinh luyện tập thường xuyên và hiệu quả;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Sân chơi, sân tập bằng phẳng, có cây bóng mát, có đồ chơi, thiết bị vận động.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Bàn, ghế học sinh đúng tiêu chuẩn và đủ chỗ ngồi cho học sinh; có bàn ghế phù hợp cho học sinh khuyết tật học hòa nhập (nếu có); bàn, ghế giáo viên, bảng lớp theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Có hệ thống đèn, hệ thống quạt (ở nơi có điện); có hệ thống tủ đựng hồ sơ, thiết bị dạy học.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Diện tích phòng học đạt tiêu chuẩn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Tủ đựng thiết bị dạy học có đủ các thiết bị dạy học;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) Kích thước, vật liệu, kết cấu, kiểu dáng, màu sắc bàn, ghế học sinh theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có các phòng riêng biệt để dạy các môn âm nhạc, mỹ thuật, khoa học và ngoại ngữ; có phòng để hỗ trợ cho học sinh có hoàn cảnh khó khăn, học sinh có năng khiếu (nếu có).',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Khối phòng hành chính - quản trị đáp ứng các yêu cầu tối thiểu các hoạt động hành chính - quản trị của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Khu để xe được bố trí hợp lý, đảm bảo an toàn, trật tự.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Khối phòng phục vụ học tập và khối phòng hành chính - quản trị theo quy định; khu bếp, nhà ăn, nhà nghỉ (nếu có) phải đảm bảo điều kiện sức khỏe, an toàn, vệ sinh cho giáo viên, nhân viên và học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Có nơi lưu trữ hồ sơ, tài liệu chung.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Khối phòng phục vụ học tập, phòng hành chính - quản trị có đầy đủ các thiết bị, được sắp xếp hợp lý, khoa học và hỗ trợ hiệu quả các hoạt động nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Hệ thống thoát nước đảm bảo vệ sinh môi trường; hệ thống cấp nước sạch đảm bảo nước uống và nước sinh hoạt cho giáo viên, nhân viên và học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Thu gom rác và xử lý chất thải đảm bảo vệ sinh môi trường.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Khu vệ sinh đảm bảo thuận tiện, được xây dựng phù hợp với cảnh quan và theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Hệ thống cấp nước sạch, hệ thống thoát nước, thu gom và xử lý chất thải đáp ứng quy định của Bộ Giáo dục và Đào tạo và Bộ Y tế.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ thiết bị dạy học đáp ứng yêu cầu tối thiểu theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm các thiết bị được kiểm kê, sửa chữa.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hệ thống máy tính được kết nối Internet phục vụ công tác quản lý, hoạt động dạy học;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ thiết bị dạy học theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, được bổ sung các thiết bị dạy học và thiết bị dạy học tự làm.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Thiết bị dạy học, thiết bị dạy học tự làm được khai thác, sử dụng hiệu quả đáp ứng yêu cầu đổi mới nội dung phương pháp dạy học và nâng cao chất lượng giáo dục của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động của thư viện đáp ứng yêu cầu tối thiểu hoạt động dạy học của cán bộ quản lý, giáo viên, nhân viên, học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm thư viện được kiểm kê, bổ sung sách, báo, tạp chí, bản đồ, tranh ảnh giáo dục, băng đĩa giáo khoa và các xuất bản phẩm tham khảo.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Thư viện của nhà trường đạt Thư viện trường học đạt chuẩn trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Thư viện của nhà trường đạt Thư viện trường học tiên tiến trở lên; hệ thống máy tính của thư viện được kết nối Internet đáp ứng nhu cầu nghiên cứu, hoạt động dạy học, các hoạt động khác của cán bộ quản lý, giáo viên, nhân viên và học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có kế hoạch hoạt động theo năm học;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chức thực hiện kế hoạch hoạt động đúng tiến độ.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường trong việc tổ chức thực hiện nhiệm vụ năm học và các hoạt động giáo dục; hướng dẫn, tuyên truyền, phổ biến pháp luật, chủ trương chính sách về giáo dục đối với cha mẹ học sinh; huy động học sinh đến trường, vận động học sinh đã bỏ học trở lại lớp.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường, xã hội trong việc thực hiện các nhiệm vụ theo quy định của Điều lệ Ban đại diện cha mẹ học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tuyên truyền nâng cao nhận thức và trách nhiệm của cộng đồng về chủ trương, chính sách của Đảng, Nhà nước, ngành Giáo dục; về mục tiêu, nội dung và kế hoạch giáo dục của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Huy động và sử dụng các nguồn lực hợp pháp của các tổ chức, cá nhân đúng quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tham mưu cấp ủy Đảng, chính quyền để tạo điều kiện cho nhà trường thực hiện phương hướng, chiến lược xây dựng và phát triển;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Phối hợp với các tổ chức, đoàn thể, cá nhân để giáo dục truyền thống lịch sử, văn hóa, đạo đức lối sống, pháp luật, nghệ thuật, thể dục thể thao và các nội dung giáo dục khác cho học sinh; chăm sóc di tích lịch sử, cách mạng, công trình văn hóa; chăm sóc gia đình thương binh, liệt sĩ, gia đình có công với cách mạng, Bà mẹ Việt Nam anh hùng ở địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Tham mưu cấp ủy Đảng, chính quyền và phối hợp có hiệu quả với các tô chức, cá nhân xây dựng nhà trường trở thành trung tâm văn hóa, giáo dục của địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Đảm bảo mục tiêu giáo dục toàn diện thông qua các hoạt động giáo dục được xây dựng trong kế hoạch;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Được giải trình và được cơ quan có thẩm quyền xác nhận.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Đảm bảo tính cập nhật các quy định về chuyên môn của cơ quan quản lý giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Được phổ biến, công khai để giáo viên, học sinh, cha mẹ học sinh, cộng đồng biết và phối hợp, giám sát nhà trường thực hiện kế hoạch.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Vận dụng các phương pháp, kỹ thuật dạy học, tổ chức hoạt động dạy học đảm bảo mục tiêu, nội dung giáo dục, phù hợp đối tượng học sinh và điều kiện nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Thực hiện đúng quy định về đánh giá học sinh tiểu học.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Thực hiện đúng chương trình, kế hoạch giáo dục; lựa chọn nội dung, thời lượng, phương pháp, hình thức dạy học phù hợp với từng đối tượng và đáp ứng yêu cầu, khả năng nhận thức của học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Phát hiện và bồi dưỡng học sinh có năng khiếu, phụ đạo học sinh gặp khó khăn trong học tập, rèn luyện.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Hằng năm, rà soát, phân tích, đánh giá hiệu quả và tác động của các biện pháp, giải pháp tổ chức các hoạt động giáo dục nhằm nâng cao chất lượng dạy học của giáo viên, học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Nội dung và hình thức tổ chức các hoạt động phong phú, phù hợp điều kiện của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Đảm bảo cho tất cả học sinh được tham gia.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Được tổ chức có hiệu quả, tạo cơ hội cho học sinh tham gia tích cực, chủ động, sáng tạo.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nội dung và hình thức tổ chức các hoạt động phân hóa theo nhu cầu, năng lực sở trường của học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Trong địa bàn tuyển sinh của trường tỷ lệ trẻ em 6 tuổi vào lớp 1 đạt ít nhất 90%;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Quản lý hồ sơ, số liệu phổ cập giáo dục tiểu học đúng quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trong địa bàn tuyển sinh của trường tỷ lệ trẻ 6 tuổi vào lớp 1 đạt ít nhất 95%.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trong địa bàn tuyển sinh của trường tỷ lệ trẻ 6 tuổi vào lớp 1 đạt ít nhất 98%.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ học sinh 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 65%;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Tỷ lệ trẻ em đến 14 tuổi hoàn thành chương trình tiểu học đạt ít nhất 80%, đối với trường thuộc xã có điều kiện kinh tế - xã hội đặc biệt khó khăn đạt ít nhất 70%.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 85%;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ trẻ em 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 80%, đối với trường thuộc xã có điều kiện kinh tế - xã hội đặc biệt khó khăn đạt ít nhất 70%; các trẻ em 11 tuổi còn lại đều đang học các lớp tiểu học.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tỷ lệ học sinh hoàn thành chương trình lớp học đạt ít nhất 95%;',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ trẻ em 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 90%, đối với trường thuộc xã có điều kiện kinh tế - xã hội đặc biệt khó khăn đạt ít nhất 80%; các trẻ em 11 tuổi còn lại đều đang học các lớp tiểu học.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                    col5: '0'
                                },
                                {
                                    name: 'Khối lớp 7',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Khối lớp 8',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Khối lớp 9',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                },
                                {
                                    name: 'Cộng',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0'
                                }
                            ]
                        },
                        {
                            tenchimuc: '2. Cơ cấu khối công trình của nhà trường',
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
                                    name: 'Phòng học, phòng học bộ môn và khối phục vụ học tập',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng học',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng học bộ môn',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Khối phòng phục vụ học tập',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Khối phòng hành chính - quản trị',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng bán kiên cố',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Phòng tạm',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Thư viện',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Các công trình, khối phòng chức năng khác (nếu có)',
                                    col1: '0',
                                    col2: '0',
                                    col3: '0',
                                    col4: '0',
                                    col5: '0',
                                    col6: ' ',
                                },
                                {
                                    name: 'Cộng',
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
                                            col7: ' '
                                        },
                                        {
                                            name: 'Phó Hiệu trưởng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                        {
                                            name: 'Giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                        {
                                            name: 'Nhân viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                        {
                                            name: 'Cộng',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                            col6: '0',
                                            col7: ' '
                                        },
                                    ]
                                },
                                {
                                    tenchimuc: 'b) Số liệu của 5 năm gần đây',
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
                                        }
                                    ],
                                    rows: [
                                        {
                                            name: 'Tổng số giáo viên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            name: 'Tỷ lệ giáo viên/lớp',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            name: 'Tỷ lệ giáo viên/học sinh',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
                                            name: 'Tổng số giáo viên dạy giỏi cấp huyện hoặc tương đương trở lên',
                                            col1: '0',
                                            col2: '0',
                                            col3: '0',
                                            col4: '0',
                                            col5: '0',
                                        },
                                        {
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Được xác định bằng văn bản và cấp có thẩm quyền phê duyệt; ',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Được công bố công khai bằng hình thức niêm yết tại nhà trường hoặc đăng tải trên trang thông tin điện tử của nhà trường (nếu có) hoặc đăng tải trên các phương tiện thông tin đại chúng của địa phương, trang thông tin điện tử của phòng giáo dục và đào tạo, sở giáo dục và đào tạo.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nhà trường có các giải pháp giám sát việc thực hiện phương hướng chiến lược xây dựng và phát triển.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0
                                                        },
                                                        {
                                                            tieude: 'Định kỳ rà soát, bổ sung, điều chỉnh phương hướng, chiến lược xây dựng và phát triển. Tổ chức xây dựng phương hướng, chiến lược xây dựng và phát triển có sự tham gia của các thành viên trong Hội đồng trường (Hội đồng quản trị đối với trường tư thục), cán bộ quản lý, giáo viên, nhân viên, học sinh, cha mẹ học sinh và cộng đồng.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Thực hiện chức năng, nhiệm vụ và quyền hạn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Các hoạt động được định kỳ rà soát, đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Hoạt động có hiệu quả, góp phần nâng cao chất lượng giáo dục của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, các hoạt động được rà soát, đánh giá.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức Đảng Cộng sản Việt Nam có cơ cấu tổ chức và hoạt động theo quy định; trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 01 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác có đóng góp tích cực trong các hoạt động của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, tổ chức Đảng Cộng sản Việt Nam có ít nhất 02 năm hoàn thành tốt nhiệm vụ, các năm còn lại hoàn thành nhiệm vụ trở lên; ',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Các đoàn thể, tổ chức khác có đóng góp hiệu quả trong các hoạt động nhà trường và cộng đồng.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn và tổ văn phòng có cơ cấu tổ chức theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chuyên môn, tổ văn phòng có kế hoạch hoạt động và thực hiện các nhiệm vụ theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hằng năm, tổ chuyên môn đề xuất và thực hiện được ít nhất 01 (một) chuyên đề có tác dụng nâng cao chất lượng và hiệu quả giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động của tổ chuyên môn, tổ văn phòng được định kỳ rà soát, đánh giá, điều chỉnh.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hoạt động của tổ chuyên môn, tổ văn phòng có đóng góp hiệu quả trong việc nâng cao chất lượng các hoạt động trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chuyên môn thực hiện hiệu quả các chuyên đề chuyên môn góp phần nâng cao chất lượng giáo dục.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Học sinh được tổ chức theo lớp; lớp học được tổ chức theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Lớp học hoạt động theo nguyên tắc tự quản, dân chủ. ',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trường có không quá 45 (bốn mươi lăm) lớp. Sỹ số học sinh trong lớp theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trường có không quá 45 (bốn mươi lăm) lớp. Mỗi lớp ở cấp trung học cơ sở và trung học phổ thông có không quá 40 (bốn mươi) học sinh, lớp tiểu học không quá 35 (ba mươi lăm) học sinh (nếu có). Số học sinh trong lớp của trường chuyên biệt theo quy định tại quy chế tổ chức và hoạt động của trường chuyên biệt.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Lập dự toán, thực hiện thu chi, quyết toán, thống kê, báo cáo tài chính và tài sản; công khai và định kỳ tự kiểm tra tài chính, tài sản theo quy định; quy chế chi tiêu nội bộ được bổ sung, cập nhật phù hợp với điều kiện thực tế và các quy định hiện hành;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Quản lý, sử dụng tài chính, tài sản đúng mục đích và có hiệu quả để phục vụ các hoạt động giáo dục.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Ứng dụng công nghệ thông tin hiệu quả trong công tác quản lý hành chính, tài chính và tài sản của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có vi phạm liên quan đến việc quản lý hành chính, tài chính và tài sản theo kết luận của thanh tra, kiểm toán. ',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có kế hoạch ngắn hạn, trung hạn và dài hạn để tạo các nguồn tài chính hợp pháp phù hợp với điều kiện nhà trường, thực tế địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Phân công, sử dụng cán bộ quản lý, giáo viên, nhân viên rõ ràng, hợp lý đảm bảo hiệu quả hoạt động của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Cán bộ quản lý, giáo viên và nhân viên được đảm bảo các quyền theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Có các biện pháp để phát huy năng lực của cán bộ quản lý, giáo viên, nhân viên trong việc xây dựng, phát triển và nâng cao chất lượng giáo dục nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Kế hoạch giáo dục được thực hiện đầy đủ;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Kế hoạch giáo dục được rà soát, đánh giá, điều chỉnh kịp thời.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp chỉ đạo, kiểm tra, đánh giá của nhà trường đối với các hoạt động giáo dục, được cơ quan quản lý đánh giá đạt hiệu quả. Quản lý hoạt động dạy thêm, học thêm trong nhà trường theo quy định (nếu có).',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Các khiếu nại, tố cáo, kiến nghị, phản ánh (nếu có) thuộc thẩm quyền xử lý của nhà trường được giải quyết đúng pháp luật;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, có báo cáo thực hiện quy chế dân chủ cơ sở.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các biện pháp và cơ chế giám sát việc thực hiện quy chế dân chủ cơ sở đảm bảo công khai, minh bạch, hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có hộp thư góp ý, đường dây nóng và các hình thức khác để tiếp nhận, xử lý các thông tin phản ánh của người dân; đảm bảo an toàn cho cán bộ quản lý, giáo viên, nhân viên và học sinh trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Không có hiện tượng kỳ thị, hành vi bạo lực, vi phạm pháp luật về bình đẳng giới trong nhà trường',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Cán bộ quản lý, giáo viên, nhân viên và học sinh được phổ biến, hướng dẫn và thực hiện phương án đảm bảo an ninh trật tự; vệ sinh an toàn thực phẩm; an toàn phòng, chống tai nạn, thương tích; an toàn phòng, chống cháy, nổ; an toàn phòng, chống thảm họa, thiên tai; phòng, chống dịch bệnh; phòng, chống các tệ nạn xã hội và phòng, chống bạo lực trong nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Nhà trường thường xuyên kiểm tra, thu thập, đánh giá, xử lý các thông tin, biểu hiện liên quan đến bạo lực học đường, an ninh trật tự và có biện pháp ngăn chặn kịp thời, hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Được đánh giá đạt chuẩn hiệu trưởng trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Được bồi dưỡng, tập huấn về chuyên môn, nghiệp vụ quản lý giáo dục theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 02 năm được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Được bồi dưỡng, tập huấn về lý luận chính trị theo quy định; được giáo viên, nhân viên trong trường tín nhiệm.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Trong 05 năm liên tiếp tính đến thời điểm đánh giá, được đánh giá đạt chuẩn hiệu trưởng ở mức khá trở lên, trong đó có ít nhất 01 năm được đánh giá đạt chuẩn hiệu trưởng ở mức tốt.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) 100% giáo viên đạt chuẩn trình độ đào tạo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Có ít nhất 95% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, tỷ lệ giáo viên trên chuẩn trình độ đào tạo được duy trì ổn định và tăng dần theo lộ trình phù hợp;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có 100% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức đạt trở lên, trong đó có ít nhất 60% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên và có ít nhất 50% ở mức khá trở lên đối với trường thuộc vùng khó khăn;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) Có khả năng tổ chức các hoạt động trải nghiệm, hướng nghiệp, định hướng phân luồng cho học sinh; có khả năng hướng dẫn nghiên cứu khoa học; trong 05 năm liên tiếp tính đến thời điểm đánh giá không có giáo viên bị kỷ luật từ hình thức cảnh cáo trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, có ít nhất 80% giáo viên đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 30% đạt chuẩn nghề nghiệp giáo viên ở mức tốt; đối với trường thuộc vùng khó khăn có ít nhất 70% đạt chuẩn nghề nghiệp giáo viên ở mức khá trở lên, trong đó có ít nhất 20% đạt chuẩn nghề nghiệp giáo viên ở mức tốt;',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, giáo viên có báo cáo kết quả nghiên cứu khoa học.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Được phân công công việc phù hợp, hợp lý theo năng lực;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hoàn thành các nhiệm vụ được giao.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Số lượng và cơ cấu nhân viên đảm bảo theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Trong 05 năm liên tiếp tính đến thời điểm đánh giá, không có nhân viên bị kỷ luật từ hình thức cảnh cáo trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Có trình độ đào tạo đáp ứng được vị trí việc làm;',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Hằng năm, được tham gia đầy đủ các khóa, lớp tập huấn, bồi dưỡng chuyên môn, nghiệp vụ theo vị trí việc làm.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Thực hiện các nhiệm vụ theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Được đảm bảo các quyền theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Học sinh vi phạm các hành vi không được làm được phát hiện kịp thời, được áp dụng các biện pháp giáo dục phù hợp và có chuyển biến tích cực.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Học sinh có thành tích trong học tập, rèn luyện có ảnh hưởng tích cực đến các hoạt động của lớp và nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có cổng trường, biển tên trường và tường hoặc rào bao quanh;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Khu sân chơi, bãi tập có đủ thiết bị tối thiểu, đảm bảo an toàn để luyện tập thể dục, thể thao và các hoạt động giáo dục của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Khu sân chơi, bãi tập đáp ứng yêu cầu tổ chức các hoạt động giáo dục.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các trường nội thành, nội thị có diện tích ít nhất 6m2/học sinh; các trường khu vực nông thôn có diện tích ít nhất 10m2/học sinh; đối với trường trung học được thành lập sau năm 2001 đảm bảo có diện tích mặt bằng theo quy định. Khu sân chơi, bãi tập có diện tích ít nhất bằng 25% tổng diện tích sử dụng của trường.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ phòng học bộ môn theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Có phòng hoạt động Đoàn - Đội, thư viện và phòng truyền thống.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Phòng học, phòng học bộ môn được xây dựng đạt tiêu chuẩn theo quy định, đảm bảo điều kiện thuận lợi cho học sinh khuyết tật học hòa nhập;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Khối phục vụ học tập, đáp ứng yêu cầu các hoạt động của nhà trường và theo quy định.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Các phòng học, phòng học bộ môn có đủ các thiết bị dạy học theo quy định. Có phòng để tổ chức các hoạt động giáo dục cho học sinh hoàn cảnh đặc biệt (nếu có).',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Khu để xe được bố trí hợp lý, đảm bảo an toàn, trật tự;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Định kỳ sửa chữa, bổ sung các thiết bị khối hành chính - quản trị.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Khối hành chính - quản trị theo quy định; khu bếp, nhà ăn, nhà nghỉ (nếu có) phải đảm bảo điều kiện sức khỏe, an toàn, vệ sinh cho giáo viên, nhân viên và học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Khối hành chính - quản trị có đầy đủ các thiết bị được sắp xếp hợp lý, khoa học và hỗ trợ hiệu quả các hoạt động nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có hệ thống thoát nước đảm bảo vệ sinh môi trường; hệ thống cấp nước sạch đảm bảo nước uống và nước sinh hoạt cho giáo viên, nhân viên và học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Thu gom rác và xử lý chất thải đảm bảo vệ sinh môi trường.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Khu vệ sinh đảm bảo thuận tiện, được xây dựng phù hợp với cảnh quan và theo quy định; ',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Hệ thống cấp nước sạch, hệ thống thoát nước, thu gom và xử lý chất thải đáp ứng quy định của Bộ Giáo dục và Đào tạo và Bộ Y tế.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ thiết bị dạy học đáp ứng yêu cầu tối thiểu theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm các thiết bị được kiểm kê, sửa chữa.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hệ thống máy tính được kết nối Internet phục vụ công tác quản lý, hoạt động dạy học;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Có đủ thiết bị dạy học theo quy định;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, được bổ sung các thiết bị dạy học và thiết bị dạy học tự làm.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phòng thí nghiệm hoặc khu vực thực hành (nếu có) đủ thiết bị đảm bảo hoạt động thường xuyên và hiệu quả; thiết bị dạy học, thiết bị dạy học tự làm được khai thác, sử dụng hiệu quả đáp ứng yêu cầu đổi mới nội dung phương pháp dạy học và nâng cao chất lượng giáo dục của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Hoạt động của thư viện đáp ứng yêu cầu tối thiểu về nghiên cứu, hoạt động dạy học, các hoạt động khác của cán bộ quản lý, giáo viên, nhân viên, học sinh; ',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm thư viện được kiểm kê, bổ sung sách, báo, tạp chí, bản đồ, tranh ảnh giáo dục, băng đĩa giáo khoa và các xuất bản phẩm tham khảo.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Thư viện của nhà trường đạt Thư viện trường học đạt chuẩn trở lên.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Thư viện của nhà trường đạt Thư viện trường học tiên tiến trở lên. Hệ thống máy tính của thư viện được kết nối Internet đáp ứng nhu cầu nghiên cứu, hoạt động dạy học, các hoạt động khác của cán bộ quản lý, giáo viên, nhân viên và học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Có kế hoạch hoạt động theo năm học;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Tổ chức thực hiện kế hoạch hoạt động đúng tiến độ.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường trong việc tổ chức thực hiện nhiệm vụ năm học và các hoạt động giáo dục; hướng dẫn, tuyên truyền, phổ biến pháp luật, chủ trương chính sách về giáo dục đối với cha mẹ học sinh; huy động học sinh đến trường, vận động học sinh đã bỏ học trở lại lớp.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Phối hợp có hiệu quả với nhà trường, xã hội trong việc thực hiện các nhiệm vụ theo quy định của Điều lệ Ban đại diện cha mẹ học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tuyên truyền nâng cao nhận thức và trách nhiệm của cộng đồng về chủ trương, chính sách của Đảng, Nhà nước, ngành Giáo dục; về mục tiêu, nội dung và kế hoạch giáo dục của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Huy động và sử dụng các nguồn lực hợp pháp của các tổ chức, cá nhân đúng quy định.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tham mưu cấp ủy đảng, chính quyền để tạo điều kiện cho nhà trường thực hiện phương hướng, chiến lược xây dựng và phát triển;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Phối hợp với các tổ chức, đoàn thể, cá nhân để giáo dục truyền thống lịch sử, văn hóa, đạo đức lối sống, pháp luật, nghệ thuật, thể dục thể thao và các nội dung giáo dục khác cho học sinh; chăm sóc di tích lịch sử, cách mạng, công trình văn hóa; chăm sóc gia đình thương binh, liệt sĩ, gia đình có công với cách mạng, Bà mẹ Việt Nam anh hùng ở địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Tham mưu cấp ủy Đảng, chính quyền và phối hợp có hiệu quả với các tổ chức, cá nhân xây dựng nhà trường trở thành trung tâm văn hóa, giáo dục của địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Vận dụng các phương pháp, kỹ thuật dạy học, tổ chức hoạt động dạy học đảm bảo mục tiêu, nội dung giáo dục, phù hợp đối tượng học sinh và điều kiện nhà trường; bồi dưỡng phương pháp tự học, năng cao khả năng làm việc theo nhóm và rèn luyện kỹ năng vận dụng kiến thức vào thực tiễn;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Các hình thức kiểm tra, đánh giá học sinh đa dạng đảm bảo khách quan và hiệu quả.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Thực hiện đúng chương trình, kế hoạch giáo dục; lựa chọn nội dung, thời lượng, phương pháp, hình thức dạy học phù hợp với từng đối tượng và đáp ứng yêu cầu, khả năng nhận thức của học sinh;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Phát hiện và bồi dưỡng học sinh có năng khiếu, phụ đạo học sinh gặp khó khăn trong học tập, rèn luyện.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Hằng năm, rà soát, phân tích, đánh giá hiệu quả và tác động của các biện pháp, giải pháp tổ chức các hoạt động giáo dục nhằm nâng cao chất lượng dạy học của giáo viên, học sinh.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chức thực hiện kế hoạch hoạt động giáo dục cho học sinh có hoàn cảnh khó khăn, học sinh có năng khiếu, học sinh gặp khó khăn trong học tập và rèn luyện;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm rà soát, đánh giá các hoạt động giáo dục học sinh có hoàn cảnh khó khăn, học sinh có năng khiếu, học sinh gặp khó khăn trong học tập và rèn luyện.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Học sinh có hoàn cảnh khó khăn, học sinh có năng khiếu, học sinh gặp khó khăn trong học tập và rèn luyện đáp ứng được mục tiêu giáo dục theo kế hoạch giáo dục.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nhà trường có học sinh năng khiếu về các môn học, thể thao, nghệ thuật được cấp có thẩm quyền ghi nhận.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Các hình thức kiểm tra, đánh giá học sinh về nội dung giáo dục địa phương đảm bảo khách quan và hiệu quả;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Hằng năm, rà soát, đánh giá, cập nhật tài liệu, đề xuất điều chỉnh nội dung giáo dục địa phương.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Nội dung giáo dục địa phương phù hợp với mục tiêu môn học và gắn lý luận với thực tiễn.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tổ chức được các hoạt động trải nghiệm, hướng nghiệp theo kế hoạch; ',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Phân công, huy động giáo viên, nhân viên trong nhà trường tham gia các hoạt động trải nghiệm, hướng nghiệp.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Tổ chức được các hoạt động trải nghiệm, hướng nghiệp với các hình thức phong phú phù hợp học sinh và đạt kết quả thiết thực;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Định kỳ rà soát, đánh giá kế hoạch tổ chức các hoạt động trải nghiệm, hướng nghiệp.',
                                                            loai: 2,
                                                            thuocmuc: 2
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Quá trình rèn luyện, tích lũy kỹ năng sống, hiểu biết xã hội, thực hành pháp luật cho học sinh có chuyển biến tích cực thông qua các hoạt động giáo dục;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Đạo đức, lối sống của học sinh từng bước được hình thành, phát triển phù hợp với pháp luật, phong tục tập quán địa phương và tuyền thống văn hóa dân tộc Việt Nam. ',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Hướng dẫn học sinh biết tự đánh giá kết quả học tập và rèn luyện;   ',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Khả năng vận dụng kiến thức vào thực tiễn của học sinh từng bước hình thành và phát triển.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'Bước đầu, học sinh có khả năng nghiên cứu khoa học, công nghệ theo người hướng dẫn, chuyên gia khoa học và người giám sát chỉ dẫn.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ học sinh lên lớp và tốt nghiệp đạt yêu cầu theo kế hoạch của nhà trường;',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'c) Định hướng phân luồng cho học sinh đạt yêu cầu theo kế hoạch của nhà trường.',
                                                            loai: 2,
                                                            thuocmuc: 1
                                                        },
                                                        {
                                                            tieude: 'Mức 2:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Kết quả học lực, hạnh kiểm của học sinh có chuyển biến tích cực trong 05 năm liên tiếp tính đến thời điểm đánh giá;',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ học sinh lên lớp và tốt nghiệp có chuyển biến tích cực trong 05 năm liên tiếp tính đến thời điểm đánh giá.',
                                                            loai: 2,
                                                            thuocmuc: 2
                                                        },
                                                        {
                                                            tieude: 'Mức 3:',
                                                            loai: 0,
                                                        },
                                                        {
                                                            tieude: 'a) Kết quả học lực, hạnh kiểm của học sinh: - Tỷ lệ học sinh xếp loại giỏi của trường thuộc vùng khó khăn: Đạt ít nhất 05% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở), trường trung học phổ thông (hoặc cấp trung học phổ thông) và 20% đối với trường chuyên; - Tỷ lệ học sinh xếp loại giỏi của trường thuộc các vùng còn lại: Đạt ít nhất 10% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở), trường trung học phổ thông (hoặc cấp trung học phổ thông) và 25% đối với trường chuyên; - Tỷ lệ học sinh xếp loại khá của trường thuộc vùng khó khăn: Đạt ít nhất 30% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở), 20% đối với trường trung học phổ thông (hoặc cấp trung học phổ thông) và 55% đối với trường chuyên; - Tỷ lệ học sinh xếp loại khá của trường thuộc các vùng còn lại: Đạt ít nhất 35% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở), 25% đối với trường trung học phổ thông (hoặc cấp trung học phổ thông) và 60% đối với trường chuyên; - Tỷ lệ học sinh xếp loại yếu, kém của trường thuộc vùng khó khăn: không quá 10% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở) và trường trung học phổ thông (hoặc cấp trung học phổ thông), trường chuyên không có học sinh yếu, kém; - Tỷ lệ học sinh xếp loại yếu, kém của trường thuộc các vùng còn lại: không quá 05% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở) và trường trung học phổ thông (hoặc cấp trung học phổ thông), trường chuyên không có học sinh yếu, kém; - Đối với nhà trường có lớp tiểu học: Tỷ lệ học sinh hoàn thành chương trình lớp học đạt 95%; tỷ lệ trẻ em 11 tuổi hoàn thành chương trình tiểu học đạt ít nhất 90%, đối với trường thuộc xã có điều kiện kinh tế - xã hội đặc biệt khó khăn đạt ít nhất 80%; các trẻ em 11 tuổi còn lại đều đang học các lớp tiểu học; - Tỷ lệ học sinh xếp loại hạnh kiểm khá, tốt đạt ít nhất 90% đối với trường trung học cơ sở (hoặc cấp trung học cơ sở), trường trung học phổ thông (hoặc cấp trung học phổ thông) và 98% đối với trường chuyên.',
                                                            loai: 2,
                                                            thuocmuc: 3
                                                        },
                                                        {
                                                            tieude: 'b) Tỷ lệ học sinh bỏ học và lưu ban: Vùng khó khăn: Không quá 03% học sinh bỏ học, không quá 05% học sinh lưu ban; trường chuyên không có học sinh lưu ban và học sinh bỏ học; Các vùng còn lại: Không quá 01% học sinh bỏ học, không quá 02% học sinh lưu ban; trường chuyên không có học sinh lưu ban và học sinh bỏ học.',
                                                            loai: 2,
                                                            thuocmuc: 3
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
    referenceMinhchungs.forEach(i => {
        let { matieuchi, maminhchung } = i;
        let minhchung = minhchungs.find(j => j.maminhchung == maminhchung);
        if (minhchung) {
            minhchung.referenceTieuchis.push(matieuchi);
        }
    });
    return minhchungs;
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

