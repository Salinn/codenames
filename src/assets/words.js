import { shuffle, nameToSeed } from "../utils/Game";

const normalWords = [
  "Hollywood","Well","Foot","New York","Spring","Court","Tube","Point","Tablet","Slip","Date","Drill","Lemon","Bell",
"Screen","Fair","Torch","State","Match","Iron","Block","France","Australia","Limousine","Stream","Glove","Nurse","Leprechaun",
"Play","Tooth","Arm","Bermuda","Diamond","Whale","Comic","Mammoth","Green","Pass","Missile","Paste", "Drop", "Phoenix",
"Marble","Staff","Figure","Park","Centaur", "Shadow","Fish", "Cotton","Egypt","Theater","Scale","Fall","Track","Force",
"Dinosaur","Bill","Mine","Turkey","March","Contract","Bridge","Robin","Line","Plate","Band","Fire","Bank","Boom",
"Cat","Shot","Suit","Chocolate","Roulette","Mercury","Moon","Net","Lawyer","Satellite","Angel","Spider","Germany","Fork",
"Pitch","King","Crane","Trip","Dog","Conductor","Part","Bugle","Witch","Ketchup","Press","Spine","Worm","Alps",
"Bond","Pan","Beijing","Racket","Cross","Seal","Aztec","Maple","Parachute","Hotel","Berry","Soldier","Ray","Post",
"Greece","Square","Mass","Bat","Wave","Car","Smuggler","England","Crash","Tail","Card","Horn","Capital","Fence",
"Deck","Buffalo","Microscope","Jet","Duck","Ring","Train","Field","Gold","Tick","Check","Queen","Strike","Kangaroo",
"Spike","Scientist","Engine","Shakespeare","Wind","Kid","Embassy","Robot","Note","Ground","Draft","Ham","War","Mouse",
"Center","Chick","China","Bolt","Spot","Piano","Pupil","Plot","Lion","Police","Head","Litter","Concert","Mug",
"Vacuum","Atlantis","Straw","Switch","Skyscraper","Laser","Scuba Diver","Africa","Plastic","Dwarf","Lap","Life","Honey","Horseshoe",
"Unicorn","Spy","Pants","Wall","Paper","Sound","Ice","Tag","Web","Fan","Orange","Temple","Canada","Scorpion",
"Undertaker","Mail","Europe","Soul","Apple","Pole","Tap","Mouth","Ambulance","Dress","Ice Cream","Rabbit","Buck","Agent",
"Sock","Nut","Boot","Ghost","Oil","Superhero","Code","Kiwi","Hospital","Saturn","Film","Button","Snowman","Helicopter",
"Loch Ness","Log","Princess","Time","Cook","Revolution","Shoe","Mole","Spell","Grass","Washer","Game","Beat","Hole",
"Horse","Pirate","Link","Dance","Fly","Pit","Server","School","Lock","Brush","Pool","Star","Jam","Organ",
"Berlin","Face","Luck","Amazon","Cast","Gas","Club","Sink","Water","Chair","Shark","Jupiter","Copper","Jack",
"Platypus","Stick","Olive","Grace","Bear","Glass","Row","Pistol","London","Rock","Van","Vet","Beach","Charge",
"Port","Disease","Palm","Moscow","Pin","Washington","Pyramid","Opera","Casino","Pilot","String","Night",
"Chest","Yard","Teacher","Pumpkin","Thief","Bark","Bug","Mint","Cycle","Telescope","Calf","Air",
"Box","Mount","Thumb","Antarctica","Trunk","Snow","Penguin","Root","Bar","File","Hawk","Battery",
"Compound","Slug","Octopus","Whip","America","Ivory","Pound","Sub","Cliff","Lab","Eagle","Genius",
"Ship","Dice","Hood","Heart","Novel","Pipe","Himalayas","Crown","Round","India","Needle","Shop",
"Watch","Lead","Tie","Table","Cell","Cover","Czech","Back","Bomb","Ruler","Forest","Bottle",
"Space","Hook","Doctor","Ball","Bow","Degree","Rome","Plane","Giant","Nail","Dragon","Stadium",
"Flute","Carrot","Wake","Fighter","Model","Tokyo","Eye","Mexico","Hand","Swing","Key","Alien",
"Tower","Poison","Cricket","Cold","Knife","Church","Board","Cloak","Ninja","Olympus","Belt","Light",
"Death","Stock","Millionaire","Day","Knight","Pie","Bed","Circle","Rose","Change","Cap","Triangle",
]

const nsfwWords = [
  'Horse' ,'Sauna' ,'Hooker' ,'Stool' ,'Mouth' ,'Touchdown' ,'Snake' ,'Whiskey' ,'Pickle' ,'Hose' ,'Legend' ,'Blush' ,'Dick' ,'Cock',
  'Alcohol' ,'Sausage' ,'Pecker' ,'Straight' ,'Sore' ,'Toy' ,'Black' ,'White' ,'Period' ,'Couch' ,'Juice' ,'Bra' ,'Dame' ,'Chick',
  'Bitch' ,'Score' ,'Sheep' ,'Strap' ,'Mattress' ,'Train' ,'Bondage' ,'Wiener' ,'Penis' ,'Furry' ,'Joystick' ,'Apples' ,'Condom' ,'Bisexual',
  'Hole' ,'Secretary' ,'Roll' ,'Strip' ,'Freak' ,'Tramp' ,'Foreskin' ,'Wine' ,'Pee' ,'Experiment' ,'Johnson' ,'Banana' ,'Clam' ,'Blow',
  'Balloon' ,'Semen' ,'Regret' ,'Stripper' ,'Homerun' ,'Trim' ,'Bar' ,'Wood' ,'Paddle' ,'Cowgirl' ,'John' ,'Candle' ,'Cigarette' ,'Cigar',
  'Knob' ,'Sex' ,'Gang' ,'Stud' ,'Screw' ,'Trousers' ,'Safe' ,'Girl' ,'Package' ,'Grope' ,'Jewels' ,'Beach' ,'Chubby' ,'Beef',
  'Bender' ,'Shaft' ,'Peaches' ,'Swallow' ,'Flower' ,'Trunk' ,'Sack' ,'Job' ,'Onion' ,'Bowl' ,'Jerk' ,'Crap' ,'Bush' ,'Box',
  'Mushroom' ,'Shame' ,'Couple' ,'Sweat' ,'Strobe' ,'Tubesteak' ,'Rug' ,'Butt' ,'Nylon' ,'Lick' ,'Hotel' ,'Boy' ,'Boob' ,'Biscuits',
  'Fatty' ,'Share' ,'Slut' ,'Swimmers' ,'Pound' ,'Tuna' ,'Roach' ,'Brownie' ,'Nuts' ,'Blonde' ,'Horny' ,'Catcher' ,'Body' ,'Dominate',
  'Mole' ,'Shave' ,'Orgasm' ,'Taboo' ,'Roof' ,'Twig' ,'Red' ,'Lube' ,'Nude' ,'Eat' ,'Hooters' ,'Legs' ,'Behind' ,'Olive',
  'Brown' ,'Shower' ,'Oyster' ,'Taco' ,'Salad' ,'Udders' ,'Rave' ,'Inch' ,'Nipple' ,'Gay' ,'High' ,'Booze' ,'Beaver' ,'Pussy',
  'Ice' ,'Skank' ,'Melons' ,'Tail' ,'Rack' ,'Uranus' ,'Queer' ,'Lingerie' ,'Needle' ,'Escort' ,'Herb' ,'Bear' ,'Beans' ,'Log',
  'Hamster' ,'Skirt' ,'Gigolo' ,'Tap' ,'Pie' ,'Vasectomy' ,'Queen' ,'Group' ,'Necklace' ,'Commando' ,'Headlights' ,'Ashes' ,'Bacon' ,'Goose',
  'Pillows' ,'Smell' ,'Latex' ,'Tavern' ,'Smegma' ,'Vegas' ,'Queef' ,'Hot' ,'Navel' ,'Gag' ,'Headboard' ,'Bed' ,'Ass' ,'Caboose',
  'Carpet' ,'Smoke' ,'Cuffs' ,'Teabag' ,'Shot' ,'Vein' ,'Purple' ,'Gash' ,'Nail' ,'Hand' ,'Head' ,'Chaps' ,'Animal' ,'Coozie',
  'Fish' ,'Snatch' ,'Rookie' ,'Tease' ,'Snort' ,'Vibrator' ,'Pucker' ,'Film' ,'Mug' ,'Bang' ,'Hammer' ,'Grandma',
  'Grass' ,'Sniff' ,'Prick' ,'Tent' ,'Baked' ,'Video' ,'Pub' ,'G-Spot' ,'Movie' ,'Jazz' ,'Friction' ,'Eyes', 
  'Drunk' ,'Softballs' ,'Kitty' ,'Tequila' ,'Bottom' ,'Vinyl' ,'Prostate' ,'Chains' ,'MotorboatCrabs' ,'French' ,'Hurl', 
  'Cheek' ,'Solo' ,'Lizard' ,'Threesome' ,'Breast' ,'Virgin' ,'Prison' ,'Donkey' ,'Monkey' ,'Douche' ,'Freckles' ,'Bond', 
  'Keg' ,'Spank' ,'Boxers' ,'Throat' ,'Pinch' ,'Vodka' ,'Pot' ,'Lips' ,'Mom' ,'Finger' ,'Fluff' ,'Bling', 
  'Rectum' ,'Speed' ,'Missionary' ,'Tickle' ,'Sin' ,'Vomit' ,'Porn' ,'Cuddle' ,'Moist' ,'Manboobs' ,'Flash' ,'Dildo', 
  'Cocktail' ,'Sperm' ,'Emission' ,'tie' ,'Diarrhea' ,'Wad' ,'Pork' ,'Bottle' ,'Mixer' ,'Crack' ,'Fist' ,'Club', 
  'Cucumber' ,'Spoon' ,'Seed' ,'Tip' ,'Intern' ,'Wang' ,'Pole' ,'Champagne' ,'Milk' ,'Loose' ,'Fire' ,'Choke', 
  'Noodle' ,'Spread' ,'Doggy' ,'Tit' ,'Beer' ,'Waste' ,'Poker' ,'Gerbil' ,'Member' ,'Bartender' ,'Fetish' ,'Bone', 
  'Motel' ,'Squirt' ,'Lotion' ,'Tongue' ,'Flesh' ,'Watch' ,'Player' ,'Balls' ,'Meat' ,'Cream' ,'Fecal' ,'Rubber', 
  'Kinky' ,'Stalker' ,'Bust' ,'Tool' ,'Skid' ,'Wax' ,'Pitcher' ,'Knees' ,'Martini' ,'Lobster' ,'Feather' ,'Booty', 
  'Joint' ,'Steamy' ,'Mesh' ,'Top' ,'Facial' ,'Weed' ,'Pipe' ,'Cherry' ,'Lust' ,'Knockers' ,'Fantasy' ,'Hump', 
  'Poop' ,'Stiff' ,'Nurse' ,'Torture' ,'Bong' ,'Wench' ,'Pink' ,'Gangbang' ,'Love' ,'Coyote' ,'Drill' ,'Acid', 
  'Line' ,'Stiletto' ,'Turd' ,'Touch' ,'Daddy' ,'Wet' ,'Pimp' ,'Hell' ,'Liquor' ,'Burn' ,'Drag' ,'Cougar', 
  'Briefs' ,'Stones' ,'Naked' ,'Orgy' ,'Chest' ,'Whip' ,'Pig' ,'Jugs' ,'Lighter' ,'Cannons' ,'Down' ,'Clap'
]

const phiTauWords = [
  'Tall Paul', 'Gary Proud', 'Gary Gasper', 'Ming Dong', "Dean's", 'Pledges', 'Associate Members', 'Christmas Party', 'Beer', 'Keg', 'PBR', 'Triathlon', 'Kyle Grant', 'Casper', 'Mitch', 'Dunn', 'Dunn Syndrome', 'Whale Wars', 'Nurse', 'Anal Leakage', 'Whiskey', 'Tequila', 'Mud Tug', 'Harper', 'Weed',
  'Beef', 'Clayton', 'Neives', 'Hogan', 'Stickbug', 'Studin', 'Spiders', 'Don', 'Keg Race', 'Christmas Tree Hunt', 'Bung', 'ΔΦΕ', 'ΦΚΨ', 'ZTA', 'TKE', 'AΣA', 'ΣΧ', 'Stoner', 'Toilet Talks', 'ΣΣΣ', 'Danny', 'Mansion', 'Brady', 'Kent', 'Mountzorous',
  'Baxely', 'Mrs. Broderick', 'AJ', 'Phil', 'The box', 'Folders', 'Pins', 'Pumpkin hunt', 'Uhaul', 'Pan Beer', 'Eric Pope', 'Eric Thomas', 'Asshole', 'Valentine Day Massacre', 'Cory Ludwig', 'Coke Mills', 'EOP', 'Pledge Again', 'DEAF', 'RIT', 'National', 'Ritual', 'Zoom', 'Bull moose', 'Pirdy',
  'Rib', 'Vannah White', 'Case Race', 'Movie Night', 'Wine', 'Rossi Jug', 'The Lizard', 'Kreepy Kyle', 'Garret', 'Thumper', 'Hogger', 'True American Hero', 'Campo', 'Fire', 'Volcano', 'Red Room', 'Serious Fun', 'Hot Tub Club', 'Drink if it is anal', 'Everclear', 'Gin', 'Genny', "St. Patty's Day", 'Rush Week', 'Piss bucket',
  'Storm trooping', 'Krassy Kat', 'Run away', 'Garbage Plate', 'Zonies', 'Henny Hots', 'Poop', 'Potentials', 'ΚΔΡ', 'ΦΔΘ', 'Quarter Mile', 'FHWC', 'Cabaret', 'Five Loko', 'ΦΣΚ', 'ΠΚΦ', 'ΑΞΔ', 'Can-can', 'Dinkleberg', 'Funnel tunnel', 'Baseball', 'TNBP', 'Little Sisters', 'Rescouncil', 'Eboard',
  'Pledge Mark Sweaty', 'Liquor Master', 'Beer Master', 'Boiler room Society', 'Casket', 'Coffin', 'Shoot the Boot', 'Jews', 'Stump', 'Pig Roast', 'Dorm Storm', '50th', 'Convention', 'Regional Conference', 'Salsritas', 'X', 'Buffdalo', 'Zack', 'Tony', 'Go Fund Me', 'Wurl', 'Family Line', 'Big Brother Night', 'Little Brother', 'Big Brother',
  'Lavalier', 'Casale', 'Fink', 'Library', 'Beer Pong', 'President', '1st VP', '2nd VP', 'Fraternity', 'Sorority', 'Tree Beer', 'Margarita Mondays', 'Tinder', 'Santa', 'DD', 'Jamie Dodge', 'Bid', 'No Bid', 'Connor', 'Pitcher', 'Mugs', 'Acquire', 'Social', 'Flip cup', 'Quarters',
  // '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
]

const pickVersion = version => {
  switch(version) {
    case 'normal':
      return normalWords
    case 'nsfw':
      return nsfwWords
    case 'phitau':
      return phiTauWords
    default:
      return normalWords
  }
}

export const pickWords = ({gameName, gameNumber, gameVersion }) => {
  const words = pickVersion(gameVersion)
  return shuffle(words, nameToSeed({ name: gameName, number: gameNumber })).slice(0, 25);
}