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
    if(!!data.length) {
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

export const reformatChiMucKeysData = (chimucsSource , chimucSelectedKeys, chimucHalfKeys = []) => {
    let chimucArr = [];
    const loopThroughChiMucs = (source) => {
        source.forEach(i => {
            if(chimucSelectedKeys.includes(i.key) || chimucHalfKeys.includes(i.key)){
                let newObj = {
                    id : i.id,
                    isHalf : chimucHalfKeys.includes(i.key)
                }
                chimucArr.push(newObj);
            }
            if(i.children) {
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
    return arr.map(i => ({...i, key: i.id}));
}