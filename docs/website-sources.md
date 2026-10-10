# Website content sources

Researched: 2026-10-05. This is a content reference for rosstroha.com, not finished website copy. Public pages and APIs were checked where available. Resume claims are self-reported unless a public source is also listed.

## Resume copies

Copied from `../resume-update/`; the originals remain there.

| File | Recommended use |
| --- | --- |
| [September 22 general resume](sources/resumes/Ross_Troha_Resume_2026-09-22_revised.docx) | Main source for website biography, experience, and skills. |
| [September 28 F5OS resume](sources/resumes/Ross_Troha_Resume_2026-09-28_F5OS_Sr_SDE.docx) | Additional developer tooling, Docker, and delivery experience; tailored for a specific role. |
| [August 9 resume](sources/resumes/Ross_Troha_Resume_8-9-2026.docx) | Older, fuller technology and project details. Prefer the revised versions when wording or claims differ. |

The resume body text was read directly from each DOCX. Do not combine overlapping descriptions into separate accomplishments.

## Profile and contact links

| Source | Evidence and status | Website use |
| --- | --- | --- |
| [LinkedIn](https://www.linkedin.com/in/rosstroha) | Search-indexed profile identifies Ross Troha, F5, Erie, Colorado, and BGSU. Direct page retrieval failed; indexed experience titles are incomplete. | Professional profile link; historical project and interest context. |
| [GitHub](https://github.com/rosstroha) | [Public user API](https://api.github.com/users/rosstroha) confirms Ross Troha, F5 Networks, Inc., Colorado, USA, and account creation in November 2013. | Primary code profile link. |
| [GitLab](https://gitlab.com/r.troha) | [Public user lookup](https://gitlab.com/api/v4/users?username=r.troha) confirms Ross Troha and user ID 20716743. Matches the author identity in the existing local resume inventory. | Professional code profile link. |
| [GitHub Gists](https://gist.github.com/rosstroha) | [Public gist API](https://api.github.com/users/rosstroha/gists?per_page=100) lists small utilities and experiments. | Optional experiments link. |
| [CodePen airplane demo](https://codepen.io/rosstroha/pen/ZONyKm) | Linked by the airplane-spinner README. The demo itself was not inspected. | Optional visual project link after checking it in a browser. |

No public contact email was returned by GitHub or GitLab, and none appeared in the extracted resume body. Choose the intended contact address before filling the site's Email section.

### GitLab access limits

The [public projects endpoint](https://gitlab.com/api/v4/users/20716743/projects?per_page=100) returned an empty list. This does not establish an absence of private work.

Local supporting evidence exists in `../resume-update/gitlab-authored-merge-requests.json`, generated 2026-08-06. Only its author metadata was used for identity matching here. Its private merge-request contents were not copied into this repo or presented as public portfolio links. It is an older inventory, not a live contribution count.

## Biography and experience

Source: the copied general resume, with additional details from the F5OS version where specified. Employment dates below reflect the resumes, not independent employer verification. Confirm the current title and employment status before publishing.

Potential biography direction: software engineer with 13+ years of experience building web applications, APIs, client-side security capabilities, and delivery automation. Strong themes are browser compatibility, developer efficiency, mentoring, and collaboration across distributed teams.

| Employer | Role and dates from resume | Supported content themes |
| --- | --- | --- |
| F5, Inc. | Software Engineer III; February 2022 to present in September 2026 resumes | Distributed Cloud Bot Defense browser signals; GitLab CI/CD and releases for 36 interrelated private npm packages; client-side security signals supporting PCI DSS 4.0.1 requirements; Next.js CSP Validator rewrite; nightly pipeline reliability; iHealth Cloud. |
| 6kites, Inc. | Full-Stack Software Engineer, Consultant; January 2021 to February 2022 | Microsoft Teams application and bot for Powtoon; Microsoft Bot Framework and Powtoon API integration; collaboration with teams in Israel and Ukraine; Adobe Creative Cloud plugin support in the general resume. |
| Northwoods Consulting Partners | Software Engineer; January 2017 to November 2020 | Traverse case-file discovery; REST APIs and front-end features; leading a small team on the company's first customer-facing React application; mentoring; centralized QA-environment workflow. |
| Information Control Company | Software Engineer, Consultant; June 2013 to December 2016 | NetJets maintenance and parts-ordering applications; Grails data integration for flight scheduling; reservation and quoting workflows; OCLC Selenium testing framework. |
| Bowling Green State University | B.S. Computer Science; December 2012 | Education. LinkedIn's indexed education period is 2008 to 2012. |

The F5OS resume additionally describes a Docker/Docker Compose development setup supporting Apple Silicon and Intel, remote debugging documentation, and an AI-assisted workflow for building and testing browser signals.

The general resume reports Traverse serving more than 7,500 human-services workers. Treat that as historical product reach, not a current user count. The August resume's 90% workflow automation and 99% QA-tool adoption figures are omitted from the revised resumes; do not use those percentages without supporting evidence and scope.

### Skills inventory

Use the resumes to select skills relevant to the work shown, rather than treating every technology as current expertise.

- Languages: JavaScript, TypeScript, Ruby, Java, Groovy, SQL; Bash in the F5OS version.
- Front end: React, Next.js, Angular, Redux, HTML, CSS/SCSS.
- Back end and platform: Node.js, Express, Ruby on Rails, REST APIs, WebSockets, Docker, Docker Compose, Terraform, Azure, AWS.
- Delivery and quality: Git, GitLab CI/CD, WebdriverIO, Cypress, Jest, Cucumber, RSpec, TDD/BDD.

## Public projects

Repository ownership, descriptions, languages, and fork status were checked through the [GitHub repositories API](https://api.github.com/users/rosstroha/repos?per_page=100&sort=updated). README content was retrieved through each repository's `/readme` API endpoint. Repository language is GitHub metadata, not a complete stack audit. Live demos were not functionally tested.

| Project | Source and observed behavior | Content opportunity |
| --- | --- | --- |
| Splitter | [Repository and README](https://github.com/rosstroha/splitter): receipt-splitting web app that includes tax in each person's total. JavaScript; not a fork. README links a [demo](https://rosstroha.github.io/splitter/). | Practical personal tool and candidate featured project. |
| Traktor Key Converter | [Repository and README](https://github.com/rosstroha/traktor-key-converter): converts Open Key notation in Traktor collection files to Camelot notation. Groovy; not a fork. README documents testing with Traktor Pro 2.6.1 and higher. | Strong connection between software and DJ interests. Avoid claiming compatibility with current Traktor versions. |
| CSS Airplane Spinner | [Repository and README](https://github.com/rosstroha/airplane-spinner): CSS airplane spinner made while at NetJets, with a linked CodePen demo. Depends on Font Awesome 4.6.3. Not a fork. | Small front-end experiment with a visual demonstration. |
| Personal website | [Repository](https://github.com/rosstroha/rosstroha.com): TypeScript; not a fork. | Website source link and eventual case study after implementation. |
| CSP Validator | [Live site](https://cspvalidator.org/), titled CSP Header Inspector and Validator; resume and local notes describe Ross's Next.js rewrite. Public Salvation changes below provide related evidence. | Professional project candidate. Public site retrieval exposed only its title, so the live implementation and full rewrite attribution were not independently verified. |

Other non-fork repositories include [noice-bot](https://github.com/rosstroha/noice-bot), [soundcloud-scraper-script](https://github.com/rosstroha/soundcloud-scraper-script), [library-manager-rails](https://github.com/rosstroha/library-manager-rails), [bgn-list](https://github.com/rosstroha/bgn-list), [javascript_audition](https://github.com/rosstroha/javascript_audition), and [rosstroha.github.io](https://github.com/rosstroha/rosstroha.github.io). They need further code review before writing project narratives. `noice-bot` has only a name in its README, the scraper has no README returned by the API, and the Rails repository's README describes an upstream template rather than the named application.

Forks such as `hacs-ai-export`, `gattacker`, `webdriverio`, `salvation`, and Home Assistant repositories are not evidence that Ross created the upstream products. Use specific authored changes for contribution claims.

## Public contributions

Authorship and merge timestamps were checked using the [GitHub authored pull-request search API](https://api.github.com/search/issues?q=author%3Arosstroha+is%3Apr&per_page=100). A closed pull request alone does not mean it was merged.

| Contribution | Primary source | Verified status |
| --- | --- | --- |
| Salvation TeaVM implementation | [PR 262](https://github.com/shapesecurity/salvation/pull/262) | Merged 2024-07-10. Title: TeaVM Impl. Read the diff before describing implementation scope. |
| Salvation demo website | [PR 263](https://github.com/shapesecurity/salvation/pull/263) | Merged 2024-07-17. |
| Salvation build and deployment follow-ups | [PR 264](https://github.com/shapesecurity/salvation/pull/264), [PR 266](https://github.com/shapesecurity/salvation/pull/266), [PR 267](https://github.com/shapesecurity/salvation/pull/267), [PR 268](https://github.com/shapesecurity/salvation/pull/268) | Merged July 2024; job configuration, working-directory, job consolidation, and GitHub Pages pathname changes. |
| Salvation DeviceID test scripts | [PR 269](https://github.com/shapesecurity/salvation/pull/269), [PR 270](https://github.com/shapesecurity/salvation/pull/270) | Merged 2024-08-26 and 2024-09-09. |
| ESPHome Anwio bulb configurations | [A19 RGBWW PR 913](https://github.com/esphome/devices.esphome.io/pull/913), [BR30 RGB CCT PR 914](https://github.com/esphome/devices.esphome.io/pull/914) | Both merged 2024-11-10. |
| Powercalc GE bulb profiles | [BR30 PR 1892](https://github.com/bramstroker/homeassistant-powercalc/pull/1892), [PAR38 PR 1893](https://github.com/bramstroker/homeassistant-powercalc/pull/1893) | Merged 2023-10-26 and 2023-11-01. |
| Home Assistant Flume documentation correction | [PR 24791](https://github.com/home-assistant/home-assistant.io/pull/24791) | Merged 2022-11-02. |
| Karma Slim preprocessor command-line options | [PR 6](https://github.com/ActionPackMedia/karma-slim-preprocessor/pull/6) | Merged 2017-11-09. |
| WebdriverIO mock-header documentation | [PR 14002](https://github.com/webdriverio/webdriverio/pull/14002) | Opened 2024-12-20; closed with no merge timestamp. Describe as a proposed contribution. |
| npm dependency-range bug report | [Issue 7889](https://github.com/npm/cli/issues/7889) | Authored 2024-10-31; public issue is closed. Evidence of a reproducible report, not a shipped fix. |

The official [Home Assistant credits](https://www.home-assistant.io/developers/credits/) and [ESPHome contributors](https://esphome.io/guides/supporters/) pages list Ross Troha / `rosstroha`. Specific merged changes above provide clearer portfolio evidence than a credits listing alone.

## Interests and experiments

- **Smart-home software:** the merged ESPHome, Powercalc, and Home Assistant changes establish hands-on contributions between 2022 and 2024. They support a home-automation interest narrative without assuming details of a current home installation.
- **DJing and electronic music:** a [DJ TechTools post dated November 7, 2013](https://forum.djtechtools.com/t/dj-troha-journey-to-barnyard-boogie-12-promotional-mix/61922) explicitly identifies DJ Troha as Ross Troha and describes a Goa/trance promotional mix. The Traktor converter is complementary code evidence. The forum embeds `@djtroha`; a current SoundCloud account was not independently verified.
- **Student organizations and making:** the [indexed LinkedIn profile](https://www.linkedin.com/in/rosstroha) lists co-founder/vice-president of BGSU DJ Club beginning August 2011, co-founder of BGSU Longboarding Association beginning August 2010, WBGU 88.1FM among university activities, and Columbus Idea Foundry membership beginning October 2015. Treat these as historical affiliations; stale present-tense end dates do not establish current involvement.
- **Small coding experiments:** [Flexbox utilities](https://gist.github.com/rosstroha/56c76185c62bfa94a8ab463fea8a19af), [CoffeeScript cyclic-object detection](https://gist.github.com/rosstroha/09054e150729494ff8b029658e9776b9), [Jasmine Doom theme](https://gist.github.com/rosstroha/a91d5daa23659cfa4038c1ad78bfaec3), and [Groovy mocking example](https://gist.github.com/rosstroha/15d653eee4067c8fa4a5686fc8893186). The cyclic detector credits an adapted Stack Overflow answer; preserve that attribution.
- **Developer community:** a [February 2021 Atlassian Forge discussion](https://community.developer.atlassian.com/t/viewing-vs-editing-for-a-confluence-macro/44896) is posted under `RossTroha`. Identity is plausible from the handle, but not independently linked to the verified profiles; keep it as a candidate source rather than a confirmed accomplishment.

## Additional internet research

Second pass: 2026-10-05. Searched the full name and established handles for music archives, developer communities, university coverage, interviews, and creative projects. The strongest new material is below. No clearly attributable interview, award, conference talk, or university news article was found in this pass.

### DJ archive and vinyl mixing: confirmed identity

The [Mixcloud profile](https://www.mixcloud.com/DJTroha/) is now linked to Ross by the [public profile API](https://api.mixcloud.com/DJTroha/), whose biography explicitly gives his full name. It describes Cleveland/Columbus origins, trance, psy-breaks, and psybient styles, and affiliations with Toy Maker Music and Electronic Enlightenment. These are historical profile statements, not confirmation of current location or affiliations.

The [public uploads API](https://api.mixcloud.com/DJTroha/cloudcasts/?limit=30) returned 17 uploads, dated 2012 to 2017. Useful candidates for a music section:

| Recording | Upload date | Website opportunity |
| --- | --- | --- |
| [All Vinyl Progressive Trance Classics](https://www.mixcloud.com/DJTroha/rtrance-november-mix-contest-all-vinyl-progressive-trance-classics/) | 2015-11-17 | Title identifies an all-vinyl mix for an r/trance November contest. Evidence of participation, not a contest result. |
| [Journey to Barnyard Boogie 14](https://www.mixcloud.com/DJTroha/journey-to-barnyard-boogie-14/) | 2015-10-26 | Psytrance mix; extends the previously found Barnyard Boogie 12 material into a series. |
| [Mindocalypse](https://www.mixcloud.com/DJTroha/mindocalypse/) | 2015-01-15 | Goa/trance mix candidate. |
| [Live opening set 2014-10-11](https://www.mixcloud.com/DJTroha/live-opening-set-2014-10-11/) | 2014-10-22 | Title describes a live opening set; venue and event are not established. |
| [Made For You: old 2011 Troha & Fife mix](https://www.mixcloud.com/DJTroha/made-for-you-old-2011-troha-fife-mix/) | 2014-06-13 | Title attributes a collaboration and an earlier recording year. Distinguish recording date from upload date. |
| [Journey to Barnyard Boogie 12](https://www.mixcloud.com/DJTroha/journey-to-barnyard-boogie-12/) | 2013-11-11 | Direct listening link for the previously identified forum post. |

The account also hosts a [1999 Essential Mix by Pete Tong, Paul Oakenfold, and Judge Jules](https://www.mixcloud.com/DJTroha/19990620-essential-mix-pete-tong-paul-oakenfold-judge-jules/), uploaded in 2017. Do not credit Ross with performing that recording.

The verified profile biography links [SoundCloud DJTroha](https://soundcloud.com/DJTroha) and [Facebook DJTroha](https://www.facebook.com/DJTroha). These are historical outbound links; current destination content was not verified. Playback and embeds were not tested. A music archive alongside the Traktor converter would connect creative interests with software projects.

### Stack Overflow: strong identity connection

The [Stack Overflow profile](https://stackoverflow.com/users/2643192/ross-troha) displays `ross_troha`; the [public user API](https://api.stackexchange.com/2.3/users/2643192?site=stackoverflow) lists Boulder, Colorado. The user ID matches the referral suffix in the Stack Overflow attribution URL in Ross's existing CoffeeScript gist. This is a strong connection, though it is not an explicit profile-to-profile ownership statement.

The [question inventory API](https://api.stackexchange.com/2.3/users/2643192/questions?site=stackoverflow&pagesize=100) provides additional career context:

- [Microsoft Teams bot private messages from a Task Module submit](https://stackoverflow.com/questions/66605296/how-can-a-bot-send-private-messages-from-the-context-of-a-task-module-submit), March 2021. Tags include Node.js, Bot Framework, and Microsoft Teams. Consistent with the resume's 6kites/Powtoon work, but the question alone does not establish the client or project.
- [AngularJS root scope question](https://stackoverflow.com/questions/45060546/why-should-i-use-rootscope-if-i-can-use-scope-root), July 2017.
- [Groovy class-loading question](https://stackoverflow.com/questions/18727659/groovy-java-lang-classnotfoundexception), September 2013. The [answer API](https://api.stackexchange.com/2.3/users/2643192/answers?site=stackoverflow&pagesize=100) identifies an accepted self-answer, [answer 18742486](https://stackoverflow.com/a/18742486).

Potential use: an optional developer-community link or supporting context for a career narrative. These questions do not establish additional employment or product ownership.

### 3D scanning and a Sprinter project: likely identity, needs confirmation

A [public Polycam model](https://poly.cam/explore/capture/a6c052f8-fbd3-43a8-98ad-b89d633d5004/MercedesBenz%2BSprinter%2B2500%2B170%2BInterior%2Bv1%2Bwith) is titled Mercedes-Benz Sprinter 2500 170 Interior v1 (with subflooring installed), credited to `rosstroha`, and dated December 23, 2023. The indexed page describes an Object Mode capture.

The distinctive handle matches the verified GitHub account, but no cross-profile link was found. Confirm ownership before adding this to the biography. If it is Ross's, it could support a hands-on making or 3D scanning project section with an interactive model. The page does not establish van ownership, a completed conversion, CAD skills, or travel history.

### Lower-confidence hobby lead

A [third-party mirror of a Conscious Coffees review](https://restaurantguru.com/Conscious-Coffees-Boulder) attributes a positive comment about Ethiopian coffee to Ross Troha. This is a name match without a verified profile connection. It is only a prompt to confirm whether coffee is a meaningful interest, not a basis for website copy.

Unrelated same-surname results, people-search directories, residential records, and family notices were not retained as website sources.

## Website section mapping

| Existing section | Best sources |
| --- | --- |
| Biography | General resume; verified GitHub identity; BGSU education. |
| Interests | Smart-home contributions; Traktor converter; historical DJ and student activities. |
| Experience | Resume chronology; public Salvation contributions where relevant. |
| Skills | Revised resume technology inventory, illustrated with specific projects. |
| Featured projects | Splitter, Traktor Key Converter, CSP Validator. |
| Experiments | CSS Airplane Spinner and selected attributed gists. |
| Social | LinkedIn, GitHub, GitLab; Gists and CodePen optional. |
| Email | Address still needed; no verified public email found. |

Before publishing: confirm current employment, which historical interests remain relevant, preferred project selection, contact email, and the wording and disclosure scope of employer-related case studies. Review demos in a browser before featuring them. Keep private employer details out of public copy.
