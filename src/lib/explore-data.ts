import catSports from "@/assets/cat-sports.jpg";
import catGaming from "@/assets/cat-gaming.jpg";
import catArts from "@/assets/cat-arts.jpg";
import catFestivals from "@/assets/cat-festivals.jpg";
import evAthletics from "@/assets/ev-athletics.jpg";
import evKochi from "@/assets/ev-kochi.jpg";
import evMumbai from "@/assets/ev-mumbai.jpg";
import evEsports from "@/assets/ev-esports.jpg";
import liveFootball from "@/assets/live-football.jpg";
import liveDiwali from "@/assets/live-diwali.jpg";
import liveKabaddi from "@/assets/live-kabaddi.jpg";
import storyGallery from "@/assets/story-gallery.jpg";
import storyChess from "@/assets/story-chess.jpg";
import athBoxer from "@/assets/ath-boxer.jpg";
import artSitar from "@/assets/art-sitar.jpg";
import clubSkate from "@/assets/club-skate.jpg";
import storyCollege from "@/assets/story-college.jpg";
import av1 from "@/assets/avatars/a1.jpg";
import av2 from "@/assets/avatars/a2.jpg";
import av3 from "@/assets/avatars/a3.jpg";
import av4 from "@/assets/avatars/a4.jpg";
import av5 from "@/assets/avatars/a5.jpg";
import av8 from "@/assets/avatars/a8.jpg";
// AI-generated sample images of fictional people; replace with real photos when real accounts exist.
import smp0 from "@/assets/avatars/sample/kavya-reddy.webp";
import smp1 from "@/assets/avatars/sample/rohan-pillai.webp";
import smp2 from "@/assets/avatars/sample/zoya-khan.webp";
import smp3 from "@/assets/avatars/sample/devika-warrier.webp";
import smp4 from "@/assets/avatars/sample/imran-sheikh.webp";
import smp5 from "@/assets/avatars/sample/meenakshi-iyer.webp";
import smp6 from "@/assets/avatars/sample/faisal-qureshi.webp";
import smp7 from "@/assets/avatars/sample/priyanka-sen.webp";
import smp8 from "@/assets/avatars/sample/dhruv-malhotra.webp";
import smp9 from "@/assets/avatars/sample/malabarfolk.webp";
import smp10 from "@/assets/avatars/sample/stagecraft.webp";
import smp11 from "@/assets/avatars/sample/netravatistrikers.webp";
import smp12 from "@/assets/avatars/sample/greenfieldsports.webp";
import smp13 from "@/assets/avatars/sample/lakeshorearts.webp";
import smp14 from "@/assets/avatars/sample/northgateesports.webp";
import smp15 from "@/assets/avatars/sample/harbourviewculture.webp";
import smp16 from "@/assets/avatars/sample/stagedoor.webp";
import smp17 from "@/assets/avatars/sample/southernrhythm.webp";

// Placeholder Explore content — shaped to be swapped for backend data later.
export type ExploreComment = { id: string; author: string; text: string };
export type ExploreItem = {
  id: string;
  kind: "reel" | "post";
  tag: "Sports" | "Arts" | "Culture" | "Gaming" | "Festivals" | "Events" | "Community";
  img: string;
  /** Optional reel video URL — autoplays muted when active. */
  video?: string;
  creator: string;
  handle: string;
  caption: string;
  likes: number;
  featured?: boolean;
  comments: ExploreComment[];
  // --- Added for the Instagram-style feed (all optional so old data still type-checks) ---
  images?: string[]; // carousel slides (first is the cover)
  text?: { headline: string; bg: number }; // text/graphic post
  audio?: string; // reels
  location?: string; // posts
  verified?: boolean;
  ageH?: number; // hours since posted (mock "created_at")
  event?: { slug: string; name: string; date: string; city: string; price: number };
};

/** The four categories that get a badge. Festivals, Events and Community have no badge. */
export type BadgeCategory = "Sports" | "Arts" | "Culture" | "Gaming";
export type ExploreProfile = { id: string; username: string; fullName: string; verified: boolean; type: "Organizer" | "Athlete" | "Artist" | "Club" | "College"; followers: number; following: boolean; /** Up to two. Empty or missing means no badge. */ categories?: BadgeCategory[]; /** Full-profile details (optional). */ city?: string; about?: string; achievements?: string[]; eventSlugs?: string[] };
export type ExploreStory = { id: string; profileId: string; media: string[]; expiresAt: number };

// MOCK: short public sample clip so autoplay can be tested. Replace with real media later.
const SAMPLE_VIDEO = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const c = (id: string, author: string, text: string): ExploreComment => ({ id, author, text });

export const exploreItems: ExploreItem[] = [
  { id: "x1", kind: "reel", featured: true, tag: "Sports", img: liveFootball, creator: "Kolkata Terrace Crew", handle: "terracecrew", caption: "Derby night from the stands. Flares, drums and ninety minutes of noise.", likes: 412, comments: [c("c1", "arjun.k", "That second-half chant gave me chills."), c("c2", "maya_r", "Next derby I'm going.")] },
  { id: "x2", kind: "post", tag: "Festivals", img: liveDiwali, creator: "Jaipur Lights Walk", handle: "jaipurlights", caption: "Johari Bazaar lit up for Deepotsav. Every lane, every lamp.", likes: 268, comments: [c("c3", "neha.s", "Beautiful framing.")] },
  { id: "x3", kind: "reel", tag: "Gaming", img: evEsports, creator: "Deccan Esports", handle: "deccanesports", caption: "Grand finals walkout at HITEX. Lights down, crowd up.", likes: 189, comments: [] },
  { id: "x4", kind: "post", tag: "Arts", img: storyGallery, creator: "Open Wall Studio", handle: "openwall", caption: "Opening night of the new group show. Twelve artists, one long wall.", likes: 97, comments: [c("c4", "rhea.art", "The third piece is stunning.")] },
  { id: "x5", kind: "reel", tag: "Sports", img: liveKabaddi, creator: "Pune Raiders Fan Club", handle: "puneraiders", caption: "That super raid in the final minute. Watch the bench react.", likes: 233, comments: [] },
  { id: "x6", kind: "post", tag: "Culture", img: evKochi, creator: "Kochi Heritage Collective", handle: "kochiheritage", caption: "Chenda melam rehearsal before the parade. Fort Kochi, golden hour.", likes: 151, comments: [] },
  { id: "x7", kind: "reel", featured: true, tag: "Arts", img: artSitar, creator: "Raag Room Sessions", handle: "raagroom", caption: "A late evening alaap, recorded live in one take.", likes: 204, comments: [c("c5", "dev.music", "Need the full set please.")] },
  { id: "x8", kind: "post", tag: "Community", img: clubSkate, creator: "Indiranagar Skaters", handle: "indiranagarsk8", caption: "Sunday session. Beginners welcome, boards to borrow.", likes: 88, comments: [] },
  { id: "x9", kind: "post", tag: "Gaming", img: storyChess, creator: "Chennai Chess Circle", handle: "chesscircle", caption: "Rapid tournament, round four. Silence you could hear.", likes: 64, comments: [] },
  { id: "x10", kind: "reel", tag: "Sports", img: athBoxer, creator: "Bhiwani Boxing Club", handle: "bhiwanibox", caption: "Morning pad work. Same drills, every day.", likes: 176, comments: [] },
  { id: "x11", kind: "post", tag: "Events", img: evAthletics, creator: "Track Circuit India", handle: "trackcircuit", caption: "Lane check before the 400m heats at Kalinga Stadium.", likes: 121, comments: [] },
  { id: "x12", kind: "reel", tag: "Festivals", img: catFestivals, creator: "Colour Run Collective", handle: "colourrun", caption: "Slow-motion colour throw. Wash your phone after.", likes: 158, comments: [] },
  { id: "x13", kind: "post", tag: "Community", img: storyCollege, creator: "Campus Fest Network", handle: "campusfest", caption: "Setting up the main stage the night before fest week.", likes: 73, comments: [] },
  { id: "x14", kind: "post", tag: "Arts", img: catArts, creator: "Mural Lab", handle: "murallab", caption: "Day three of the community mural. Neighbours kept adding colour.", likes: 92, comments: [] },
  { id: "x15", kind: "reel", tag: "Gaming", img: catGaming, creator: "LAN Night Hyderabad", handle: "lannight", caption: "Forty setups, one power strip prayer.", likes: 110, comments: [] },
  { id: "x16", kind: "post", tag: "Sports", img: catSports, creator: "Weekend League", handle: "weekendleague", caption: "Floodlights on, final whistle soon.", likes: 85, comments: [] },
];

// ---- Mock enrichment: verified flags, audio/location, events, ages, extra carousel/text posts ----
const extra: Record<string, Partial<ExploreItem>> = {
  x1: { verified: true, audio: "Original audio", ageH: 2, video: SAMPLE_VIDEO, event: { slug: "isl-derby-night", name: "Kolkata Derby Night", date: "Today", city: "Kolkata", price: 349 } },
  x2: { verified: true, location: "Johari Bazaar, Jaipur", ageH: 5, images: [liveDiwali, catFestivals, evKochi], event: { slug: "deepotsav-street-festival", name: "Deepotsav Street Festival", date: "Tonight", city: "Jaipur", price: 0 } },
  x3: { verified: true, audio: "Arena crowd · Original audio", ageH: 9, event: { slug: "hyderabad-esports-open", name: "Hyderabad Esports Open", date: "15 Nov", city: "Hyderabad", price: 299 } },
  x4: { verified: true, location: "Open Wall Studio, Delhi", ageH: 20, images: [storyGallery, catArts] },
  x5: { audio: "Kabaddi chants · Original audio", ageH: 26, video: SAMPLE_VIDEO },
  x6: { verified: true, location: "Fort Kochi", ageH: 30, event: { slug: "kochi-cultural-festival", name: "Kochi Cultural Festival", date: "02 Nov", city: "Kochi", price: 0 } },
  x7: { verified: true, audio: "Raag Yaman · Original audio", ageH: 40 },
  x8: { location: "Indiranagar, Bengaluru", ageH: 50 },
  x9: { location: "Chennai", ageH: 60 },
  x10: { verified: true, audio: "Original audio", ageH: 70, video: SAMPLE_VIDEO },
  x11: { verified: true, location: "Kalinga Stadium, Bhubaneswar", ageH: 80, event: { slug: "national-athletics-championship", name: "National Athletics Championship", date: "12 Oct", city: "Bhubaneswar", price: 199 } },
  x12: { audio: "Holi beats · Original audio", ageH: 95 },
  x13: { location: "Pune", ageH: 110 },
  x14: { verified: true, location: "Mumbai", ageH: 130, images: [catArts, evMumbai, storyGallery] },
  x15: { audio: "Original audio", ageH: 150 },
  x16: { location: "Weekend League Ground", ageH: 170 },
};
const more: ExploreItem[] = [
  { id: "x17", kind: "post", tag: "Sports", img: liveFootball, creator: "Kolkata Terrace Crew", handle: "terracecrew", verified: true, caption: "Swipe for the tifo reveal, the flares and the final whistle.", likes: 530, ageH: 6, images: [liveFootball, liveKabaddi, catSports, athBoxer], comments: [] },
  { id: "x18", kind: "post", tag: "Community", img: catFestivals, creator: "SAC Newsroom", handle: "sacnews", verified: true, caption: "Registrations are open for 14 colleges this month.", likes: 740, ageH: 12, text: { headline: "Inter-college athletics opens in Mangaluru", bg: 1 }, comments: [] },
  { id: "x19", kind: "post", tag: "Gaming", img: evEsports, creator: "Deccan Esports", handle: "deccanesports", verified: true, caption: "Squads of five, one substitute. Free entry.", likes: 310, ageH: 18, text: { headline: "Open qualifier: 5v5. Closes 30 Oct.", bg: 2 }, comments: [] },
  { id: "x20", kind: "reel", tag: "Culture", img: evKochi, creator: "Kochi Heritage Collective", handle: "kochiheritage", verified: true, audio: "Chenda melam · Original audio", caption: "Parade morning. Listen for the second round of chenda.", likes: 365, ageH: 33, video: SAMPLE_VIDEO, comments: [] },
];
export const exploreCatalog: ExploreItem[] = [
  ...exploreItems.map((i) => ({ verified: false, ageH: 24, ...i, ...(extra[i.id] ?? {}) })),
  ...more,
];

const p = (id: string, username: string, fullName: string, verified: boolean, type: ExploreProfile["type"], followers: number, following = false, categories: BadgeCategory[] = []): ExploreProfile => ({ id, username, fullName, verified, type, followers, following, categories });
type Details = Pick<ExploreProfile, "city" | "about" | "achievements" | "eventSlugs">;
const d = (city: string, about: string, achievements: string[], eventSlugs: string[]): Details => ({ city, about, achievements, eventSlugs });
export const exploreProfiles: ExploreProfile[] = [
  { ...p("terracecrew", "terracecrew", "Kolkata Terrace Crew", true, "Club", 48200, true, ["Sports"]), ...d("Kolkata", "Sample profile: a supporters' club known for derby-day tifos and terrace chants.", ["Best Fan Display — City Derby 2025 (sample)", "1,000-member terrace milestone 2024 (sample)"], ["isl-derby-night"]) },
  { ...p("sacnews", "sacnews", "SAC Newsroom", true, "Organizer", 120400, true), ...d("Mumbai", "Sample profile: the SAC team sharing event news, registrations and highlights from across India.", ["Covered 200+ events in 2025 (sample)", "Launched inter-college coverage 2024 (sample)"], ["national-athletics-championship", "kochi-cultural-festival"]) },
  { ...p("deccanesports", "deccanesports", "Deccan Esports League", true, "Organizer", 33900, false, ["Gaming"]), ...d("Hyderabad", "Sample profile: an esports league running open qualifiers and arena finals in the Deccan region.", ["Hosted 64-team open qualifier 2025 (sample)", "Arena finals sell-out 2024 (sample)"], ["hyderabad-esports-open"]) },
  { ...p("openwall", "openwall", "Open Wall Studio", true, "Artist", 8100, false, ["Arts"]), ...d("Delhi", "Sample profile: an artist-run studio hosting group shows for emerging painters.", ["Curated 12-artist group show 2025 (sample)", "Featured studio — City Art Week 2024 (sample)"], ["delhi-open-art-market"]) },
  { ...p("kochiheritage", "kochiheritage", "Kochi Heritage Collective", true, "Organizer", 15600, false, ["Arts", "Culture"]), ...d("Kochi", "Sample profile: a collective organising heritage walks, chenda melam and parades in Fort Kochi.", ["Organised harbour parade 2025 (sample)", "Heritage walk series, 30 editions (sample)"], ["kochi-cultural-festival"]) },
  { ...p("bhiwanibox", "bhiwanibox", "Bhiwani Boxing Club", true, "Club", 21800, false, ["Sports"]), ...d("Bhiwani", "Sample profile: a boxing club training juniors and seniors with daily morning sessions.", ["3 golds — State Boxing Meet 2025 (sample)", "Junior Club of the Year 2024 (sample)"], ["national-athletics-championship"]) },
  { ...p("raagroom", "raagroom", "Raag Room Sessions", false, "Artist", 6400, false, ["Arts", "Culture"]), ...d("Pune", "Sample profile: live recorded sessions of Hindustani classical music.", ["50 live sessions recorded (sample)", "Opening act — City Music Evening 2025 (sample)"], ["bengaluru-music-festival"]) },
  { ...p("puneraiders", "puneraiders", "Pune Raiders Fan Club", false, "Club", 9700, false, ["Sports"]), ...d("Pune", "Sample profile: kabaddi fans travelling together to every home game.", ["Loudest Stand award 2025 (sample)", "Organised 20 away trips (sample)"], ["pro-kabaddi-playoffs"]) },
  { ...p("campusfest", "campusfest", "Campus Fest Network", false, "College", 5200, false, ["Culture", "Arts"]), ...d("Pune", "Sample profile: a network connecting college fest teams across the country.", ["Linked 40 college fests 2025 (sample)", "Best Fest Partner 2024 (sample)"], ["mumbai-live-experience", "deepotsav-street-festival"]) },
  { ...p("trackcircuit", "trackcircuit", "Track Circuit India", true, "Organizer", 12900, false, ["Sports"]), city: "Bhubaneswar", about: "Demo organizer: Track Circuit India runs athletics meets across the country, from district trials to national championships.", eventSlugs: ["national-athletics-championship"] },
  { ...p("jaipurlights", "jaipurlights", "Jaipur Lights Walk", false, "Organizer", 4300, false, ["Culture"]), ...d("Jaipur", "Sample profile: evening walks through Jaipur's festival lights and bazaars.", ["Deepotsav walk, 2,000 visitors 2025 (sample)", "Heritage Tourism mention 2024 (sample)"], ["deepotsav-street-festival"]) },
  { ...p("murallab", "murallab", "Mural Lab", false, "Artist", 3900, false, ["Arts"]), ...d("Mumbai", "Sample profile: a community mural project inviting neighbours to paint together.", ["15 community murals completed (sample)", "Public Art grant 2025 (sample)"], ["delhi-open-art-market"]) },
  // DEMO athlete profile for testing the Community → full profile flow.
  { ...p("demo.athlete", "demo.athlete", "Aarav Menon (Demo)", true, "Athlete", 2400, false, ["Sports"]), city: "Bengaluru", about: "Demo athlete: 400m sprinter training in Bengaluru. This is sample information for testing.", achievements: ["Gold, 400m — State Athletics Meet 2025 (demo)", "Silver, 4x400m relay — South Zone Championship 2024 (demo)"], eventSlugs: ["national-athletics-championship"] },
  // SAMPLE DATA: replace with real accounts when the backend exists.
  { ...p("chesscircle", "chesscircle", "Chennai Chess Circle", false, "Club", 3100, false, ["Gaming"]), ...d("Chennai", "Sample profile: a chess club running weekly rapid and blitz tournaments.", ["Rapid Open winners 2025 (sample)", "100 tournaments hosted (sample)"], ["hyderabad-esports-open"]) },
  { ...p("colourrun", "colourrun", "Colour Run Collective", true, "Organizer", 18700, false, ["Culture"]), ...d("Mumbai", "Sample profile: organisers of colour runs and Holi community events.", ["5,000-runner colour run 2025 (sample)", "Best Community Event 2024 (sample)"], ["deepotsav-street-festival"]) },
  { ...p("indiranagarsk8", "indiranagarsk8", "Indiranagar Skaters", false, "Club", 2600, false, ["Sports"]), ...d("Bengaluru", "Sample profile: a skate crew with Sunday sessions and boards to borrow for beginners.", ["Best Crew — City Skate Jam 2025 (sample)", "Taught 300 beginners (sample)"], ["national-skate-jam"]) },
  { ...p("lannight", "lannight", "LAN Night Hyderabad", true, "Organizer", 7400, false, ["Gaming"]), ...d("Hyderabad", "Sample profile: monthly LAN nights with forty setups and open brackets.", ["24 LAN nights hosted (sample)", "Record 160 players 2025 (sample)"], ["hyderabad-esports-open"]) },
  { ...p("weekendleague", "weekendleague", "Weekend League", false, "Organizer", 5800, false, ["Sports"]), ...d("Pune", "Sample profile: a floodlit weekend football league for amateur teams.", ["32-team season 2025 (sample)", "Fair Play League award 2024 (sample)"], ["isl-derby-night"]) },
  { ...p("kavya.reddy", "kavya.reddy", "Kavya Reddy", true, "Athlete", 14200, false, ["Sports"]), ...d("Hyderabad", "Sample profile: badminton singles player training at a city academy.", ["Gold, Women's Singles — State Badminton 2025 (sample)", "Quarterfinal — National Juniors 2024 (sample)"], ["national-athletics-championship"]) },
  { ...p("rohan.pillai", "rohan.pillai", "Rohan Pillai", false, "Athlete", 3600, false, ["Sports"]), ...d("Kochi", "Sample profile: freestyle swimmer focused on 100m and 200m events.", ["Gold, 200m Freestyle — State Aquatics 2025 (sample)", "Bronze, 100m Freestyle — South Zone 2024 (sample)"], ["national-athletics-championship"]) },
  { ...p("zoya.khan", "zoya.khan", "Zoya Khan", true, "Athlete", 27800, false, ["Gaming"]), ...d("Mumbai", "Sample profile: competitive esports player and team captain.", ["MVP — City Esports Cup 2025 (sample)", "Runner-up — Open Qualifier 2024 (sample)"], ["hyderabad-esports-open"]) },
  { ...p("devika.warrier", "devika.warrier", "Devika Warrier", false, "Athlete", 5200, false, ["Sports", "Culture"]), ...d("Kozhikode", "Sample profile: kalaripayattu practitioner who performs and teaches traditional forms.", ["Gold, Meipayattu — State Kalari Meet 2025 (sample)", "Lead performer — Heritage Festival 2024 (sample)"], ["kochi-cultural-festival"]) },
  { ...p("imran.sheikh", "imran.sheikh", "Imran Sheikh", true, "Athlete", 11900, false, ["Sports"]), ...d("Pune", "Sample profile: raider for a district kabaddi team.", ["Best Raider — District League 2025 (sample)", "Silver — State Kabaddi 2024 (sample)"], ["pro-kabaddi-playoffs"]) },
  { ...p("meenakshi.iyer", "meenakshi.iyer", "Meenakshi Iyer", true, "Artist", 22400, false, ["Arts", "Culture"]), ...d("Chennai", "Sample profile: Bharatanatyam dancer performing solo margams and temple festivals.", ["Solo recital — December Season 2025 (sample)", "Young Dancer award 2024 (sample)"], ["chennai-heritage-walk", "mumbai-live-experience"]) },
  { ...p("faisal.qureshi", "faisal.qureshi", "Faisal Qureshi", false, "Artist", 9300, false, ["Arts", "Culture"]), ...d("Hyderabad", "Sample profile: ghazal singer performing at intimate evening mehfils.", ["Headliner — City Mehfil 2025 (sample)", "Released debut ghazal album 2024 (sample)"], ["bengaluru-music-festival"]) },
  { ...p("priyanka.sen", "priyanka.sen", "Priyanka Sen", true, "Artist", 6800, false, ["Arts"]), ...d("Kolkata", "Sample profile: illustrator and muralist painting large public walls.", ["Lead artist — Riverside Mural 2025 (sample)", "Illustration prize 2024 (sample)"], ["delhi-open-art-market"]) },
  { ...p("dhruv.malhotra", "dhruv.malhotra", "Dhruv Malhotra", false, "Artist", 4100, false, ["Arts", "Gaming"]), ...d("Delhi", "Sample profile: digital artist and indie game designer.", ["Best Art — Indie Game Jam 2025 (sample)", "Concept art showcase 2024 (sample)"], ["hyderabad-esports-open", "delhi-open-art-market"]) },
  { ...p("malabarfolk", "malabarfolk", "Malabar Folk Collective", true, "Club", 8700, false, ["Culture"]), ...d("Kozhikode", "Sample profile: folk musicians keeping Malabar drumming traditions alive.", ["Opening ensemble — Cultural Festival 2025 (sample)", "40 village performances (sample)"], ["kochi-cultural-festival"]) },
  { ...p("stagecraft", "stagecraft", "Stagecraft Theatre Troupe", false, "Club", 3400, false, ["Arts"]), ...d("Bengaluru", "Sample profile: an amateur theatre troupe staging classics and new plays.", ["Best Ensemble — City Theatre Fest 2025 (sample)", "12 productions staged (sample)"], ["mumbai-live-experience"]) },
  { ...p("netravatistrikers", "netravatistrikers", "Netravati Strikers", true, "Club", 6100, false, ["Sports"]), ...d("Mangaluru", "Sample profile: a weekend cricket club playing district leagues.", ["District T20 champions 2025 (sample)", "Runners-up — Coastal Cup 2024 (sample)"], ["national-athletics-championship"]) },
  { ...p("greenfieldsports", "greenfieldsports", "Greenfield Institute Sports Council", false, "College", 2900, false, ["Sports"]), ...d("Pune", "Sample profile: the student sports council running inter-college athletics and football.", ["Inter-college athletics overall champions 2025 (sample)", "Hosted 10-college football cup 2024 (sample)"], ["national-athletics-championship"]) },
  { ...p("lakeshorearts", "lakeshorearts", "Lakeshore College Arts Society", true, "College", 3800, false, ["Arts", "Culture"]), ...d("Bhopal", "Sample profile: a student arts society for painting, music and theatre on campus.", ["Best Arts Society — University Fest 2025 (sample)", "Annual lakeside exhibition 2024 (sample)"], ["delhi-open-art-market", "chennai-heritage-walk"]) },
  { ...p("northgateesports", "northgateesports", "Northgate University Esports Society", true, "College", 4600, false, ["Gaming"]), ...d("Delhi", "Sample profile: a university esports society fielding teams in campus leagues.", ["Campus League champions 2025 (sample)", "Semi-finalists — Open Qualifier 2024 (sample)"], ["hyderabad-esports-open"]) },
  { ...p("harbourviewculture", "harbourviewculture", "Harbourview College Cultural Council", false, "College", 2200, false, ["Culture"]), ...d("Visakhapatnam", "Sample profile: the cultural council behind the college's annual festival week.", ["Best Cultural Fest — Coastal Colleges 2025 (sample)", "Folk dance trophy 2024 (sample)"], ["deepotsav-street-festival"]) },
  { ...p("stagedoor", "stagedoor", "Stage Door Productions", true, "Organizer", 31500, false, ["Arts"]), ...d("Mumbai", "Sample profile: producers of live theatre and stage shows.", ["Produced 25 live shows 2025 (sample)", "Best Production House 2024 (sample)"], ["mumbai-live-experience"]) },
  { ...p("southernrhythm", "southernrhythm", "Southern Rhythm Events", false, "Organizer", 12300, false, ["Arts", "Culture"]), ...d("Chennai", "Sample profile: organisers of music concerts and cultural evenings in South India.", ["Season of 18 concerts 2025 (sample)", "Best Cultural Organiser 2024 (sample)", "Heritage music walk series (sample)"], ["bengaluru-music-festival", "chennai-heritage-walk"]) },
];

const H = 3600e3;
export const exploreStories: ExploreStory[] = [
  { id: "s1", profileId: "terracecrew", media: [liveFootball, catSports], expiresAt: 20 * H },
  { id: "s2", profileId: "sacnews", media: [storyCollege, evAthletics, catFestivals], expiresAt: 14 * H },
  { id: "s3", profileId: "deccanesports", media: [evEsports, storyChess], expiresAt: 9 * H },
  { id: "s4", profileId: "openwall", media: [storyGallery], expiresAt: 22 * H },
  { id: "s5", profileId: "kochiheritage", media: [evKochi, liveDiwali], expiresAt: 6 * H },
  { id: "s6", profileId: "bhiwanibox", media: [athBoxer], expiresAt: 11 * H },
  { id: "s7", profileId: "raagroom", media: [artSitar], expiresAt: 3 * H },
];

/** The signed-in mock user. No categories, so no badge. */
export const YOU: ExploreProfile = { id: "you", username: "you", fullName: "You", verified: false, type: "Athlete", followers: 0, following: false, categories: [] };

/**
 * Profile images for every demo profile, looked up by handle, full name or
 * comment-author name (all lowercase). Profiles without a dedicated portrait
 * reuse their own post or story imagery.
 */
const avatarMap: Record<string, string> = {
  terracecrew: liveFootball, "kolkata terrace crew": liveFootball,
  sacnews: storyCollege, "sac newsroom": storyCollege,
  deccanesports: evEsports, "deccan esports": evEsports, "deccan esports league": evEsports,
  openwall: storyGallery, "open wall studio": storyGallery,
  kochiheritage: evKochi, "kochi heritage collective": evKochi,
  bhiwanibox: athBoxer, "bhiwani boxing club": athBoxer,
  raagroom: av2, "raag room sessions": av2,
  puneraiders: liveKabaddi, "pune raiders fan club": liveKabaddi,
  campusfest: storyCollege, "campus fest network": storyCollege,
  trackcircuit: evAthletics, "track circuit india": evAthletics,
  jaipurlights: liveDiwali, "jaipur lights walk": liveDiwali,
  murallab: av3, "mural lab": av3,
  "demo.athlete": av1, "aarav menon (demo)": av1,
  indiranagarsk8: clubSkate, "indiranagar skaters": clubSkate,
  chesscircle: storyChess, "chennai chess circle": storyChess,
  colourrun: catFestivals, "colour run collective": catFestivals,
  lannight: catGaming, "lan night hyderabad": catGaming,
  weekendleague: catSports, "weekend league": catSports,
  // AI-generated sample images of fictional people; replace with real photos when real accounts exist.
  "kavya.reddy": smp0, "kavya reddy": smp0,
  "rohan.pillai": smp1, "rohan pillai": smp1,
  "zoya.khan": smp2, "zoya khan": smp2,
  "devika.warrier": smp3, "devika warrier": smp3,
  "imran.sheikh": smp4, "imran sheikh": smp4,
  "meenakshi.iyer": smp5, "meenakshi iyer": smp5,
  "faisal.qureshi": smp6, "faisal qureshi": smp6,
  "priyanka.sen": smp7, "priyanka sen": smp7,
  "dhruv.malhotra": smp8, "dhruv malhotra": smp8,
  "malabarfolk": smp9, "malabar folk collective": smp9,
  "stagecraft": smp10, "stagecraft theatre troupe": smp10,
  "netravatistrikers": smp11, "netravati strikers": smp11,
  "greenfieldsports": smp12, "greenfield institute sports council": smp12,
  "lakeshorearts": smp13, "lakeshore college arts society": smp13,
  "northgateesports": smp14, "northgate university esports society": smp14,
  "harbourviewculture": smp15, "harbourview college cultural council": smp15,
  "stagedoor": smp16, "stage door productions": smp16,
  "southernrhythm": smp17, "southern rhythm events": smp17,
  "arjun.k": av4, "maya_r": av5, "neha.s": av8, "rhea.art": av3, "dev.music": av2,
};

/** Demo profile image for a handle, full name or author name. Null when unknown. */
export function avatarFor(name: string): string | null {
  return avatarMap[name.trim().toLowerCase()] ?? null;
}

/** Only verified profiles with supported categories carry a marker. */
export function categoriesOf(handle: string): BadgeCategory[] {
  const prof = exploreProfiles.find((x) => x.id === handle);
  return prof?.verified ? (prof.categories ?? []).filter((category) => ["Sports", "Arts", "Culture", "Gaming"].includes(category)) : [];
}

/**
 * Resolve a profile by handle. Accounts that post on Explore but have no
 * listed profile entry are built from their own published posts, so every
 * handle linked from a post or reel opens a real profile.
 */
export function findProfile(handle: string): ExploreProfile | undefined {
  const key = handle.trim().toLowerCase();
  const listed = exploreProfiles.find((x) => x.id.toLowerCase() === key || x.username.toLowerCase() === key);
  if (listed) return listed;
  const item = exploreCatalog.find((i) => i.handle.toLowerCase() === key);
  if (!item) return undefined;
  return { id: item.handle, username: item.handle, fullName: item.creator, verified: false, type: "Club", followers: 0, following: false, categories: [] };
}
