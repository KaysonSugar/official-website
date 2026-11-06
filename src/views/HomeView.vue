<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import HomeHero from '@/components/sections/home/HomeHero.vue'
import HomeIndustry from '@/components/sections/home/HomeIndustry.vue'
import HomeLightweight from '@/components/sections/home/HomeLightweight.vue'
import HomePlatformArchitecture from '@/components/sections/home/HomePlatformArchitecture.vue'
import HomeProductMatrix from '@/components/sections/home/HomeProductMatrix.vue'
import HomeCoreCapabilities from '@/components/sections/home/HomeCoreCapabilities.vue'
import HomeProductionFlow from '@/components/sections/home/HomeProductionFlow.vue'
import HomeTransportCollab from '@/components/sections/home/HomeTransportCollab.vue'
import HomeAdvantage from '@/components/sections/home/HomeAdvantage.vue'
import HomeCostEfficiency from '@/components/sections/home/HomeCostEfficiency.vue'
import HomeService from '@/components/sections/home/HomeService.vue'
</script>

<template>
  <HomeHero />
  <HomeIndustry />
  <HomeLightweight />
  <HomePlatformArchitecture />
  <HomeProductMatrix />
  <HomeCoreCapabilities />
  <HomeProductionFlow />
  <HomeTransportCollab />
  <HomeAdvantage />
  <HomeCostEfficiency />
  <HomeService />
  <CtaBanner />
</template>
