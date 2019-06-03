import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from '@/pages/Search.vue'
import Dog from '@/pages/Dog.vue'


Vue.use(VueRouter);


export default new VueRouter({
    mode: 'history',
    routes: [{
            name: 'search',
            component: Search,
            path: '/'
        },
        {
            name: 'dog',
            component: Dog,
            path: '/dog'
        },
    ]
});