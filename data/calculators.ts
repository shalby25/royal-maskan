export type CalculatorKey = 'construction' | 'renovation' | 'fitout'

export type CalculatorDefinition = {
  key: CalculatorKey
  path: string
  eyebrow: string
  title: string
  description: string
  intro: string
  image: string
  imageAlt: string
  baseRates: Record<string, number>
  qualityLabels: Record<string, string>
  faqs: Array<{ question: string; answer: string }>
}

export const calculators: Record<CalculatorKey, CalculatorDefinition> = {
  construction: {
    key: 'construction',
    path: '/tools/uae-villa-construction-cost-calculator/',
    eyebrow: 'Free UAE construction estimator',
    title: 'UAE Villa Construction Cost Calculator',
    description: 'Estimate villa construction cost in the UAE by built-up area and finish level. Get an indicative AED budget and speak with a UAE construction engineer.',
    intro: 'Plan an early-stage budget for a new villa anywhere in the UAE. Adjust the built-up area and specification level to see an indicative construction range.',
    image: '/tools/images/royal-maskan/uae-villa-construction.jpg',
    imageAlt: 'Luxury villa construction by Royal Maskan in the UAE',
    baseRates: { standard: 3500, premium: 4800, luxury: 6500 },
    qualityLabels: { standard: 'Standard', premium: 'Premium', luxury: 'Luxury' },
    faqs: [
      { question: 'How is villa construction cost estimated in the UAE?', answer: 'Early estimates commonly use built-up area multiplied by a rate reflecting the design, structure, MEP systems, finishes and site conditions.' },
      { question: 'Does the estimate include land?', answer: 'No. The estimate is for construction work and excludes land purchase, finance, authority fees and unusual site conditions unless a formal quotation states otherwise.' },
      { question: 'Is this a final construction quote?', answer: 'No. It is a planning estimate. Drawings, specifications, authority requirements and a site review are needed for a formal quotation.' }
    ]
  },
  renovation: {
    key: 'renovation',
    path: '/tools/villa-renovation-cost-calculator/',
    eyebrow: 'Free UAE renovation estimator',
    title: 'UAE Villa Renovation Cost Calculator',
    description: 'Estimate villa renovation costs in the UAE based on area, renovation depth and finish level. Get an indicative AED budget for your project.',
    intro: 'Build a realistic starting budget for refreshing, upgrading or fully renovating a UAE villa before arranging a detailed survey.',
    image: '/tools/images/royal-maskan/uae-villa-renovation.jpg',
    imageAlt: 'Luxury villa exterior and interior renovation by Royal Maskan',
    baseRates: { light: 900, medium: 1800, full: 3200 },
    qualityLabels: { light: 'Light refresh', medium: 'Major upgrade', full: 'Full renovation' },
    faqs: [
      { question: 'What affects villa renovation cost in the UAE?', answer: 'The largest factors are the existing condition, demolition, structural changes, MEP replacement, finish quality, access and the size of the renovated area.' },
      { question: 'Can I renovate a villa room by room?', answer: 'Yes. Phased renovation can reduce disruption, although repeated mobilization and temporary works may increase the total cost.' },
      { question: 'Does this include furniture?', answer: 'The planning estimate does not include loose furniture. Bespoke joinery and fixed finishes should be confirmed in the project scope.' }
    ]
  },
  fitout: {
    key: 'fitout',
    path: '/tools/abu-dhabi-fit-out-cost-calculator/',
    eyebrow: 'Free Abu Dhabi fit-out estimator',
    title: 'Abu Dhabi Office Fit-Out Cost Calculator',
    description: 'Estimate office and commercial fit-out costs in Abu Dhabi by area, property type and finish level. Calculate an indicative AED per m² project budget.',
    intro: 'Estimate an early budget for an office, retail or hospitality fit-out in Abu Dhabi, then refine it with drawings and an engineering review.',
    image: '/tools/images/royal-maskan/abu-dhabi-office-fitout.jpg',
    imageAlt: 'Premium exterior and fit-out finishes by Royal Maskan',
    baseRates: { practical: 2200, premium: 3800, luxury: 5800 },
    qualityLabels: { practical: 'Practical', premium: 'Premium', luxury: 'Luxury' },
    faqs: [
      { question: 'How much does fit-out cost in Abu Dhabi?', answer: 'Cost varies with property use, area, approvals, MEP changes, joinery, finishes and programme. This calculator provides an early range rather than a contractor quotation.' },
      { question: 'Are authority approvals included?', answer: 'Approval and consultant costs vary by property and authority. They should be separately confirmed during scope development.' },
      { question: 'What is included in a fit-out?', answer: 'A typical scope may include partitions, ceilings, floors, MEP alterations, lighting, fire and life-safety coordination, joinery and decoration.' }
    ]
  }
}
