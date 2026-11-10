/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 物流调度页字段形状
 */

export interface LogisticsConfig {
  ctaLabel: string
  heroDash: {
    brand: string
    brandSub: string
    menus: { label: string; vip?: boolean }[]
    topbarLeft: string
    topbarRight: string
    vipLabel: string
    period: { active: string; idle: string }
    welcome: { avatar: string; name: string; hello: string }
    coop: { title: string; stats: { label: string; value: string }[] }
    nonCoop: { title: string; stats: { label: string; value: string }[] }
    todo: {
      title: string
      badges: { label: string; count: string; tone: 'green' | 'orange' | 'gray' }[]
      rows: { no: string; route: string; badge: string; tone: 'orange' | 'green' }[]
    }
    brief: { title: string; more: string; rows: { route: string; meta: string }[] }
  }
  cargo: {
    eyebrow: string
    title: string
    titleAccent: string
    titleTail: string
    desc: string
    stats: { value: string; label: string; tone: 'green' | 'orange' }[]
    notes: string[]
    card: {
      title: string
      badges: { label: string; tone: 'green' | 'orange' }[]
      updated: string
      count: string
      filters: { label: string; placeholder: string }[]
      actions: { reset: string; search: string }
      columns: string[]
      rows: {
        route: string
        cls: string
        truck: string
        weight: string
        time: string
        contact: string
        phone: string
      }[]
      foot: string
      more: string
    }
  }
  capability: {
    eyebrow: string
    title: string
    desc: string
    cards: { title: string; body: string; noteTag: string; note: string }[]
    console: {
      title: string
      time: string
      caption: string
      labels: {
        orderNo: string
        category: string
        weight: string
        vehicleType: string
        mileage: string
        loadTime: string
        from: string
        to: string
        scope: string
        truckType: string
        plate: string
        province: string
        city: string
        pickPlease: string
        inputPlease: string
        search: string
        reset: string
        vehicleInfo: string
        load: string
        assign: string
        combine: string
        prevWeek: string
        nextWeek: string
        frontPlate: string
        loadRange: string
        loadFirst: string
        phone: string
      }
      orders: {
        title: string
        cards: {
          from: string
          to: string
          active?: boolean
          orderNo: string
          category: string
          weight: string
          vehicleType: string
          mileage: string
          loadTime: string
        }[]
      }
      board: {
        title: string
        days: string[]
        pinCount: string
        routeFrom: string
        routeTo: string
        vehicles: {
          plate: string
          weight: string
          scope: string
          active?: boolean
          cells: ({
            orderNo: string
            from: string
            to: string
            cls: string
            weight: string
            frac: string
          } | null)[]
        }[]
      }
      idle: {
        title: string
        cards: { plate: string; city: string; weight: string; phone: string; scope: string }[]
      }
    }
  }
  carpool: {
    eyebrow: string
    title: string
    desc: string
    tag: string
    detail: string
    card: {
      plan: string
      from: string
      to: string
      badge: string
      summary: string
      stops: { city: string; event: string; cargo: string }[]
      stripLead: string
      stripRoute: string
    }
  }
  ledger: {
    eyebrow: string
    title: string
    desc: string
    cards: { icon: '01' | '02' | '03'; title: string; body: string }[]
  }
}
