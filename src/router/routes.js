
import Home from '../views/Home.vue'
import BeerView from '../views/BeerView.vue'

export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/beer/:id',
        name: 'beer',
        component: BeerView,
        props: true
    },
]