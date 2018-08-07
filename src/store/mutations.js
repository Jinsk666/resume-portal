import * as types from './mutations-types';

export default {
    // 树苗点击更多
	[types.TREE_MORE](state, res) {
		state.treeMore = res;
    },
	[types.SCROLL_TOP](state, res) {
		state.scrollTop = res;
    }
}