export interface World {
  id: string
  label: string
  description: string
  accent: string
  children?: World[]
  content?: string
}

const leaf = (id: string, label: string, accent: string): World => ({
  id,
  label,
  accent,
  description: `Explore ${label.toLowerCase()}.`,
  content: `Placeholder content for ${label}.`,
})

export const home: World = {
  id: 'home',
  label: 'Ross Troha',
  description: 'Software engineering, projects, and interests.',
  accent: '#a855f7',
  children: [
    {
      id: 'about',
      label: 'About',
      description: 'Background and interests.',
      accent: '#48d4e7',
      children: [
        leaf('biography', 'Biography', '#48d4e7'),
        leaf('interests', 'Interests', '#48d4e7'),
      ],
    },
    {
      id: 'work',
      label: 'Work',
      description: 'Professional experience and technical skills.',
      accent: '#f4b65c',
      children: [
        leaf('experience', 'Experience', '#f4b65c'),
        leaf('skills', 'Skills', '#f4b65c'),
      ],
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Featured software and experiments.',
      accent: '#b49aff',
      children: [
        leaf('featured', 'Featured', '#b49aff'),
        leaf('experiments', 'Experiments', '#b49aff'),
      ],
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Start a conversation.',
      accent: '#43d5b1',
      children: [
        leaf('email', 'Email', '#43d5b1'),
        leaf('social', 'Social', '#43d5b1'),
      ],
    },
  ],
}

export const worlds = new Map<string, World>()
export const parents = new Map<string, World>()

function index(node: World) {
  worlds.set(node.id, node)
  node.children?.forEach((child) => {
    parents.set(child.id, node)
    index(child)
  })
}

index(home)
