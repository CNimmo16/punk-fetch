<template>
    <b-navbar id="main-nav" :mobile-burger="false">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <span class="title pt-1">Brewdog</span>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<style lang="scss">

#main-nav {
  background-color: #b0d0dc;
}

</style>