export interface World {
  id: string
  label: string
  description: string
  theme: string
  children?: World[]
  content?: string
  links?: { label: string; href: string }[]
  employment?: {
    role: string
    dates: string
    logo: string
    website: string
  }
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
        {
          id: 'experience',
          label: 'Experience',
          description: 'Four roles in software engineering.',
          theme: 'work',
          children: [
            {
              id: 'f5',
              label: 'F5',
              description: 'Browser security and developer tooling.',
              theme: 'work',
              employment: {
                role: 'Software Engineer III',
                dates: 'February 2022 to present',
                logo: '/logos/f5.svg',
                website: 'https://www.f5.com/',
              },
              content:
                'I build browser signals for Distributed Cloud Bot Defense and client-side security. I automate releases for 36 interrelated npm packages and rewrote CSP Validator in Next.js.',
            },
            {
              id: '6kites',
              label: '6kites',
              description: 'Full-stack consulting and integrations.',
              theme: 'work',
              employment: {
                role: 'Full-Stack Software Engineer, Consultant',
                dates: 'January 2021 to February 2022',
                logo: '/logos/6kites.svg',
                website:
                  'https://web.archive.org/web/20220519215912/https://www.6kites.com/',
              },
              content:
                'I built a Microsoft Teams application and bot for Powtoon using Microsoft Bot Framework and the Powtoon API. I collaborated with teams in Israel and Ukraine and supported Adobe Creative Cloud plugins.',
            },
            {
              id: 'northwoods',
              label: 'Northwoods',
              description: 'Human-services software and team leadership.',
              theme: 'work',
              employment: {
                role: 'Software Engineer',
                dates: 'January 2017 to November 2020',
                logo: '/logos/northwoods.png',
                website: 'https://www.teamnorthwoods.com/',
              },
              content:
                'I built REST APIs and front-end features for Traverse, a case-file discovery application. I led a small team on Northwoods’ first customer-facing React application, mentored developers, and centralized QA-environment workflows.',
            },
            {
              id: 'icc',
              label: 'ICC',
              description: 'Application development and test automation.',
              theme: 'work',
              employment: {
                role: 'Software Engineer, Consultant',
                dates: 'June 2013 to December 2016',
                logo: '/logos/icc.png',
                website: 'https://g2o.com/',
              },
              content:
                'At Information Control Company, I built NetJets maintenance and parts-ordering applications, flight-scheduling data integrations, and reservation and quoting workflows. I also built a Selenium testing framework for OCLC.',
            },
          ],
        },
        leaf('skills', 'Skills', 'work'),
      ],
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Personal projects.',
      theme: 'projects',
      children: [
        leaf('software', 'Software', 'projects'),
        leaf('home-automation', 'Home Automation', 'projects'),
        leaf('van', 'Van', 'projects'),
      ],
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Start a conversation.',
      theme: 'contact',
      children: [
        leaf('email', 'Email', 'contact'),
        {
          id: 'social',
          label: 'Social',
          description: 'Find me on LinkedIn and GitHub.',
          theme: 'contact',
          links: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rosstroha' },
            { label: 'GitHub', href: 'https://github.com/rosstroha' },
          ],
        },
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
