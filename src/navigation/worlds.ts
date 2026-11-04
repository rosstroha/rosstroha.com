export interface World {
  id: string
  label: string
  description: string
  theme: string
  children?: World[]
  content?: string
}

const leaf = (id: string, label: string, theme: string): World => ({
  id,
  label,
  theme,
  description: `Explore ${label.toLowerCase()}.`,
  content: `Placeholder content for ${label}.`,
})

export const home: World = {
  id: 'home',
  label: 'Ross Troha',
  description: 'Software engineering, projects, and interests.',
  theme: 'home',
  children: [
    {
      id: 'about',
      label: 'About',
      description: 'Background and interests.',
      theme: 'about',
      children: [
        leaf('biography', 'Biography', 'about'),
        leaf('interests', 'Interests', 'about'),
      ],
    },
    {
      id: 'work',
      label: 'Work',
      description: 'Professional experience and technical skills.',
      theme: 'work',
      children: [
        leaf('experience', 'Experience', 'work'),
        leaf('skills', 'Skills', 'work'),
      ],
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Featured software and experiments.',
      theme: 'projects',
      children: [
        leaf('featured', 'Featured', 'projects'),
        leaf('experiments', 'Experiments', 'projects'),
      ],
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Start a conversation.',
      theme: 'contact',
      children: [
        leaf('email', 'Email', 'contact'),
        leaf('social', 'Social', 'contact'),
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
