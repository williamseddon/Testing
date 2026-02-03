export type SpreadPosition = {
  key: string
  label: string
  prompt: string
}

export type SpreadLayoutCell = {
  /** Position key */
  key: string
  /** Column 1..N */
  col: number
  /** Row 1..M */
  row: number
}

export type Spread = {
  id: string
  name: string
  tagline: string
  description: string
  cards: number
  positions: SpreadPosition[]
  /** Simple grid layout (used for arranging cards visually) */
  layout: {
    cols: number
    rows: number
    cells: SpreadLayoutCell[]
  }
  quotes?: string[]
}

export const spreads: Spread[] = [
  {
    id: 'sip-n-see',
    name: 'Sip N See',
    tagline: '“What’s the real tea girl?”',
    description:
      "When you want to get to the bottom of a situation and who’s behind the scenes.",
    cards: 3,
    positions: [
      { key: '1', label: 'The Issue', prompt: 'What’s at the center of this situation?' },
      { key: '2', label: 'Action to Avoid', prompt: 'What would make this worse if you do it now?' },
      { key: '3', label: 'How to Move Forward', prompt: 'What is the best next step from here?' },
    ],
    layout: {
      cols: 3,
      rows: 1,
      cells: [
        { key: '2', col: 1, row: 1 },
        { key: '1', col: 2, row: 1 },
        { key: '3', col: 3, row: 1 },
      ],
    },
  },
  {
    id: 'bone-collector',
    name: 'The Bone Collector',
    tagline: '“Who said that?”',
    description:
      'A daily check-in to discuss over cawfee tawk with your 50 closest girlfriends.',
    cards: 4,
    positions: [
      {
        key: '1',
        label: 'You',
        prompt: 'What deeper truth or intention are you harboring about your situation?',
      },
      {
        key: '2',
        label: 'The Bone',
        prompt: 'What don’t you know? What’s being hidden from you?',
      },
      {
        key: '3',
        label: 'The Surface',
        prompt: 'The perceived truth or current state of affairs.',
      },
      {
        key: '4',
        label: 'The Light',
        prompt: 'Advised direction based on revealed information.',
      },
    ],
    layout: {
      cols: 4,
      rows: 1,
      cells: [
        { key: '1', col: 1, row: 1 },
        { key: '2', col: 2, row: 1 },
        { key: '3', col: 3, row: 1 },
        { key: '4', col: 4, row: 1 },
      ],
    },
  },
  {
    id: 'reunion',
    name: 'The Reunion',
    tagline: 'Ideal for complex questions & situations that need a comprehensive overview for mediation.',
    description:
      'A five-card spread to understand the root, challenges, and the hidden wisdom of a situation.',
    cards: 5,
    positions: [
      {
        key: '1',
        label: 'The Host',
        prompt: 'What is the root of the situation? What’s brought you here?',
      },
      {
        key: '2',
        label: 'The Hot Seat',
        prompt: 'What challenges do you face?',
      },
      {
        key: '3',
        label: 'Roses & Thorns',
        prompt: 'What do you take with you or leave behind?',
      },
      {
        key: '4',
        label: 'Advice',
        prompt: 'What enables you to engage with the issue?',
      },
      {
        key: '5',
        label: 'Resolution',
        prompt: 'What is the hidden wisdom of the situation?',
      },
    ],
    layout: {
      cols: 3,
      rows: 3,
      cells: [
        { key: '4', col: 2, row: 1 },
        { key: '2', col: 1, row: 2 },
        { key: '1', col: 2, row: 2 },
        { key: '3', col: 3, row: 2 },
        { key: '5', col: 2, row: 3 },
      ],
    },
  },
  {
    id: 'sprinter-van',
    name: 'Sprinter Van',
    tagline:
      'Ideal for going the distance on a targeted issue that requires head-on action, but is interrupted by competing elements & energies.',
    description:
      'A six-card spread to confront an issue, unpack influences, and see the likely outcome after action.',
    cards: 6,
    positions: [
      {
        key: '1',
        label: 'What’s your issue with me?',
        prompt: 'What lies at the heart of the situation?',
      },
      {
        key: '2',
        label: 'Who told you that?',
        prompt: 'What affects how you think about the situation?',
      },
      {
        key: '3',
        label: 'That’s how you feel',
        prompt: 'What emotions & intentions inform the issue?',
      },
      {
        key: '4',
        label: 'Stop talking',
        prompt: 'What underlying forces drive the momentum of your issue?',
      },
      {
        key: '5',
        label: 'Who are you calling?',
        prompt: 'What influence guides you towards balance?',
      },
      {
        key: '6',
        label: 'Where are you going?',
        prompt: 'What is the outcome after confronting the issue at hand?',
      },
    ],
    layout: {
      cols: 3,
      rows: 2,
      cells: [
        { key: '1', col: 1, row: 1 },
        { key: '2', col: 2, row: 1 },
        { key: '3', col: 3, row: 1 },
        { key: '4', col: 1, row: 2 },
        { key: '5', col: 2, row: 2 },
        { key: '6', col: 3, row: 2 },
      ],
    },
    quotes: ['“Let’s talk in facts, not feelings.”', '“Receipts. Proof. Timeline. Screenshots. Everything.”'],
  },
]

export function getSpread(id: string): Spread | undefined {
  return spreads.find((s) => s.id === id)
}
