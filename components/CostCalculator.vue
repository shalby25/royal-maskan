<script setup lang="ts">
import type { CalculatorDefinition } from '~/data/calculators'
const props = defineProps<{ calculator: CalculatorDefinition }>()
const config = useRuntimeConfig()
const area = ref(350), quality = ref(Object.keys(props.calculator.baseRates)[1]), location = ref(props.calculator.key === 'fitout' ? 'abu-dhabi-city' : 'sharjah')
const floors = ref(2), mep = ref('standard'), basement = ref(false), pool = ref(false), externalWorks = ref(false)
const condition = ref('average'), occupied = ref(false), structuralChanges = ref(false), replaceMep = ref(false), facade = ref(false)
const propertyType = ref('office'), shellCondition = ref('warm-shell'), authoritySupport = ref(true), fixedFurniture = ref(false)
const locations: Record<string, { label: string; factor: number }> = {
  dubai:{label:'Dubai',factor:1.1},'abu-dhabi':{label:'Abu Dhabi',factor:1.07},sharjah:{label:'Sharjah',factor:1},ajman:{label:'Ajman',factor:.96},rak:{label:'Ras Al Khaimah',factor:.98},
  'abu-dhabi-city':{label:'Abu Dhabi City',factor:1},yas:{label:'Yas Island',factor:1.08},saadiyat:{label:'Saadiyat Island',factor:1.15},reem:{label:'Al Reem Island',factor:1.06},mussafah:{label:'Mussafah',factor:.95}
}
const money = new Intl.NumberFormat('en-AE',{style:'currency',currency:'AED',maximumFractionDigits:0})
const reference = computed(()=>`RM-${props.calculator.key.slice(0,3).toUpperCase()}-${area.value}-${quality.value.slice(0,2).toUpperCase()}`)
const model = computed(()=>{
  const baseRate=props.calculator.baseRates[quality.value], locationFactor=locations[location.value]?.factor||1
  const items:Array<{label:string,value:number}>=[]; let core=area.value*baseRate*locationFactor
  if(props.calculator.key==='construction'){
    core*=1+Math.max(0,floors.value-1)*.025
    items.push({label:'Structure & envelope',value:core*.38},{label:'Architectural finishes',value:core*.28},{label:'MEP systems',value:core*(mep.value==='advanced'?.25:.2)},{label:'Preliminaries & coordination',value:core*.08})
    if(mep.value==='advanced')core*=1.1
    if(basement.value){const value=Math.max(300000,area.value*650);core+=value;items.push({label:'Basement allowance',value})}
    if(pool.value){core+=180000;items.push({label:'Swimming pool allowance',value:180000})}
    if(externalWorks.value){const value=core*.07;core+=value;items.push({label:'External works allowance',value})}
  }
  if(props.calculator.key==='renovation'){
    core*=condition.value==='poor'?1.18:condition.value==='good'?.92:1
    items.push({label:'Strip-out & preparation',value:core*.12},{label:'Finishes & joinery',value:core*.44},{label:'MEP alterations',value:core*.2},{label:'Preliminaries & protection',value:core*.09})
    if(structuralChanges.value){const value=core*.12;core+=value;items.push({label:'Structural change allowance',value})}
    if(replaceMep.value){const value=core*.16;core+=value;items.push({label:'Full MEP replacement',value})}
    if(facade.value){const value=area.value*280;core+=value;items.push({label:'Façade upgrade',value})}
    if(occupied.value)core*=1.08
  }
  if(props.calculator.key==='fitout'){
    core*=propertyType.value==='hospitality'?1.25:propertyType.value==='retail'?1.12:1
    core*=shellCondition.value==='cold-shell'?1.16:shellCondition.value==='existing'?1.08:1
    if(mep.value==='advanced')core*=1.12
    items.push({label:'Partitions, ceilings & finishes',value:core*.34},{label:'MEP & life-safety',value:core*(mep.value==='advanced'?.29:.23)},{label:'Joinery & fixed features',value:core*.2},{label:'Preliminaries & coordination',value:core*.09})
    if(authoritySupport.value){const value=Math.max(18000,area.value*55);core+=value;items.push({label:'Approval coordination',value})}
    if(fixedFurniture.value){const value=core*.12;core+=value;items.push({label:'Fixed furniture',value})}
  }
  return {baseRate,locationFactor,total:core,items,months:Math.max(2,Math.ceil(area.value/(props.calculator.key==='construction'?90:140))+(basement.value?2:0))}
})
const low=computed(()=>Math.round(model.value.total*.9/1000)*1000), high=computed(()=>Math.round(model.value.total*1.18/1000)*1000)
const effectiveRate=computed(()=>model.value.total/Math.max(area.value,1)), selectedLocation=computed(()=>locations[location.value]?.label||location.value)
const whatsappUrl=computed(()=>{const message=`Hello Royal Maskan. Please review estimate ${reference.value}: ${props.calculator.title}, ${area.value} m², ${selectedLocation.value}, ${props.calculator.qualityLabels[quality.value]}, range ${money.format(low.value)}–${money.format(high.value)}.`;return `${config.public.whatsappUrl}${String(config.public.whatsappUrl).includes('?')?'&':'?'}text=${encodeURIComponent(message)}`})
</script>

<template>
<section class="estimator" aria-labelledby="calculator-heading">
  <div class="estimator-head"><div><p class="eyebrow">Engineer-led budget model</p><h2 id="calculator-heading">Tell us about your project</h2></div><div class="estimate-ref"><span>Estimate reference</span><strong>{{ reference }}</strong></div></div>
  <div class="estimator-grid">
    <form class="questionnaire" @submit.prevent>
      <fieldset><legend><span>01</span> Project basics</legend><div class="field-grid">
        <label>Project area <small>Total area included in the works</small><div class="input-suffix"><input v-model.number="area" type="number" min="20" max="10000" step="10"><span>m²</span></div></label>
        <label>Location <small>Accounts for access and market conditions</small><select v-model="location"><template v-if="calculator.key==='fitout'"><option value="abu-dhabi-city">Abu Dhabi City</option><option value="yas">Yas Island</option><option value="saadiyat">Saadiyat Island</option><option value="reem">Al Reem Island</option><option value="mussafah">Mussafah</option></template><template v-else><option value="sharjah">Sharjah</option><option value="dubai">Dubai</option><option value="abu-dhabi">Abu Dhabi</option><option value="ajman">Ajman</option><option value="rak">Ras Al Khaimah</option></template></select></label>
      </div></fieldset>
      <fieldset><legend><span>02</span> Specification</legend><div class="choice-grid"><label v-for="(label,value) in calculator.qualityLabels" :key="value" class="choice" :class="{selected:quality===value}"><input v-model="quality" type="radio" :value="value"><strong>{{ label }}</strong><small>{{ value==='luxury'||value==='full'?'Bespoke materials and detailing':value==='premium'||value==='medium'?'Durable, upgraded specification':'Practical, cost-conscious specification' }}</small></label></div></fieldset>
      <fieldset v-if="calculator.key==='construction'"><legend><span>03</span> Building complexity</legend><div class="field-grid"><label>Number of floors<input v-model.number="floors" type="number" min="1" max="6"></label><label>MEP complexity<select v-model="mep"><option value="standard">Standard systems</option><option value="advanced">Advanced HVAC / smart systems</option></select></label></div><div class="toggle-grid"><label class="toggle"><input v-model="basement" type="checkbox"><span><strong>Basement</strong><small>Excavation and waterproofing</small></span></label><label class="toggle"><input v-model="pool" type="checkbox"><span><strong>Swimming pool</strong><small>Construction allowance</small></span></label><label class="toggle"><input v-model="externalWorks" type="checkbox"><span><strong>External works</strong><small>Boundary, paving and landscape</small></span></label></div></fieldset>
      <fieldset v-if="calculator.key==='renovation'"><legend><span>03</span> Existing villa & scope</legend><div class="field-grid"><label>Existing condition<select v-model="condition"><option value="good">Good / maintained</option><option value="average">Average condition</option><option value="poor">Poor / major defects</option></select></label><label>Working condition<select v-model="occupied"><option :value="false">Vacant during works</option><option :value="true">Occupied / phased works</option></select></label></div><div class="toggle-grid"><label class="toggle"><input v-model="structuralChanges" type="checkbox"><span><strong>Structural changes</strong><small>Openings or layout changes</small></span></label><label class="toggle"><input v-model="replaceMep" type="checkbox"><span><strong>Full MEP replacement</strong><small>Electrical, plumbing and HVAC</small></span></label><label class="toggle"><input v-model="facade" type="checkbox"><span><strong>Façade upgrade</strong><small>External finish allowance</small></span></label></div></fieldset>
      <fieldset v-if="calculator.key==='fitout'"><legend><span>03</span> Fit-out scope</legend><div class="field-grid"><label>Property use<select v-model="propertyType"><option value="office">Office</option><option value="retail">Retail</option><option value="hospitality">Restaurant / hospitality</option></select></label><label>Handover condition<select v-model="shellCondition"><option value="warm-shell">Warm shell</option><option value="cold-shell">Cold shell</option><option value="existing">Existing fit-out / strip-out</option></select></label><label>MEP complexity<select v-model="mep"><option value="standard">Standard</option><option value="advanced">Advanced / specialist</option></select></label></div><div class="toggle-grid"><label class="toggle"><input v-model="authoritySupport" type="checkbox"><span><strong>Approval coordination</strong><small>Provisional allowance</small></span></label><label class="toggle"><input v-model="fixedFurniture" type="checkbox"><span><strong>Fixed furniture</strong><small>Reception, storage or display</small></span></label></div></fieldset>
    </form>
    <aside class="result-panel" aria-live="polite"><p class="result-label">Indicative project range</p><strong class="result-total">{{ money.format(low) }}<i>to</i>{{ money.format(high) }}</strong><p>{{ area.toLocaleString() }} m² · {{ selectedLocation }} · {{ calculator.qualityLabels[quality] }}</p><div class="metrics"><div><span>Effective allowance</span><strong>{{ money.format(effectiveRate) }}/m²</strong></div><div><span>Indicative programme</span><strong>{{ model.months }}–{{ model.months+2 }} months</strong></div></div><h3>Key cost allowances</h3><ul class="breakdown"><li v-for="item in model.items" :key="item.label"><span>{{ item.label }}</span><strong>{{ money.format(item.value) }}</strong></li></ul><div class="calculation-basis"><span>Calculation basis</span><p>{{ money.format(model.baseRate) }}/m² base × {{ model.locationFactor.toFixed(2) }} location factor, adjusted for scope.</p></div><a class="button" :href="whatsappUrl" rel="noopener">Review this estimate with an engineer</a><small class="disclaimer">Concept-stage estimate only, model review: August 2026. Excludes land, VAT, finance, consultant design fees, statutory charges and unknown site conditions. A site visit, drawings and specification are required for a formal quotation.</small></aside>
  </div>
</section>
</template>
