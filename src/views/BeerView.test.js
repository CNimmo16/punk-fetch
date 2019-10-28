import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import BeerView from './BeerView.vue';
import { JestEnvironment } from '@jest/environment';

import spinner from '../components/Spinner.vue'

import testBeer from '@/schema/beer.test.json';

let store;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);

import Buefy from 'buefy'
localVue.use(Buefy)

function buildConfig (data) {
    const id = 1;
    var mocks = {
        $store: {
            state: { 
                win: {
                    width: 1000
                },
                fetching: false
            },
            dispatch: (action) => {
                return new Promise((resolve, reject) => {
                    switch (action) {
                        case "fetchBeerById":
                            resolve(testBeer)
                    }
                });
            },
            commit: () => {}
        }
    };
    const propsData = {}
    return Object.assign({ mocks, propsData, localVue }, data);
}

describe('BeerView', () => {
    let state;
    let store;
    
    describe('is loading', () => {
        it('shows loading symbol', () => {
            const config = buildConfig();
            const wrapper = shallowMount(BeerView, config);

            const el = wrapper.find(spinner)
            expect(el.exists()).toBe(true)
        })
    })
    describe('is finished loading', () => {
        it('displays a title with beer name', () => {
            const config = buildConfig();
            const wrapper = shallowMount(BeerView, config);

            wrapper.setData({beer: testBeer})
            wrapper.setData({loading: false})
            
            const title = wrapper.find("h1.title")
            expect(title.text()).toBe("Punk IPA 2007 - 2010")
        })

        it('displays a description of the beer', () => {
            const config = buildConfig();
            const wrapper = shallowMount(BeerView, config);

            wrapper.setData({beer: testBeer})
            wrapper.setData({loading: false})
            
            const desc = wrapper.find(".description")
            expect(desc.exists()).toBe(true)
        })
    });
}) 