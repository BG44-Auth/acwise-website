export type ArticleCategory =
  | "Buyer's Guide"
  | "Maintenance"
  | "Information"
  | "General";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  readTime?: string;
  body: string[];
  references: string[];
}

export const articles: Article[] = [
  {
    slug: "why-the-lowest-air-conditioning-quote-can-cost-you-more",
    title: "Why The Lowest Air Conditioning Quote Can Cost You More",
    category: "Information",
    excerpt:
      "The cheapest quote and the cheapest system are not the same thing. Here is what actually shapes the cost of air conditioning, and how to weigh a quote.",
    body: [
      "When the quotes come in, price is the easiest thing to line up. One number next to another, lowest wins, and that is a common instinct. The catch is that the price on the quote and the cost of the system over its life are two different things.",
      "Price is the easy comparison. Every quote shares a total, so sorting cheapest to dearest feels like progress. It tells you what each installer charges. It does not tell you whether you are comparing the same system, sized and installed the same way.",
      "The sticker isn't the real cost. Most of what an air conditioner costs you arrives later, in years of running it and in whether it was set up correctly. A lower quote that gets those wrong can overtake a dearer one within a few seasons.",
      'The wrong size costs you. A system that is too small for the space has to work harder and may never hold temperature. Government energy guidance states that an undersized appliance "will work harder to heat or cool the space and may be unable to maintain the right temperature" [1].',
      'Too big is also a cost. Oversizing is not a safety margin. The same guidance is clear that appliances that are too big "will end up costing you more money, both upfront and in running costs" [1], because they cost more to buy and cycle inefficiently once running.',
      "The install shapes the result. How a system is fitted decides how well it performs and how long it lasts. Handling refrigerant, the fluid that carries heat in and out, is also regulated: by law, anyone working on this equipment must hold a refrigerant handling licence, and doing so without one is a strict liability offence that will void your manufacturers warranty [2].",
      "Efficiency adds up over years. A reverse cycle system, one that both heats and cools, can run at 300 to 600 per cent efficiency, turning one unit of electricity into three to six of heating or cooling [4]. The Zoned Energy Rating Label shows how a model performs in your climate, so a small efficiency gap becomes real money across a decade of use [1].",
      "The dearest quote isn't the answer. Paying the most can mean paying for capacity you will never call on. Brand is one factor worth weighing, but correct sizing, installation quality and warranty support shape the result alongside it, and a bigger number does not guarantee any of them.",
      "It comes down to your property. The right system depends on your space, insulation, which way the rooms face, your climate, and how you actually use it, such as cooling one bedroom overnight or a whole living area all day. Because this is complex, energy guidance recommends getting professional advice on sizing before you decide [1]. Our role is to help you understand what matters so you can read each quote for what it is.",
      "What good value looks like. Value is not the lowest number or the highest. It is a system sized correctly for your rooms, efficient for your climate, fitted by a qualified professional, and quoted honestly. When those line up, the price is fair because it is attached to the right system.",
      "So let price be one column, not the whole table. Ask each installer how they arrived at the size, what the system will cost to run, and what the quote does and does not include. If you would like a clearer starting point before the quotes come in, AC Wise can help you understand what to look for and match you with a vetted professional suited to your property.",
    ],
    references: [
      "[1] Energy Rating (Australian Government), Heating and cooling. energyrating.gov.au",
      "[2] Australian Refrigeration Council (ARCtick), Frequently Asked Questions. arctick.org",
      "[3] Australian Competition and Consumer Commission (ACCC), Consumer guarantees. accc.gov.au",
      "[4] energy.gov.au (Australian Government), Heating and cooling. energy.gov.au",
    ],
  },
  {
    slug: "how-an-air-conditioner-is-sized-why-too-big-and-too-small-both-cost-you",
    title:
      "How an Air Conditioner Is Sized: Why Too Big and Too Small Both Cost You",
    category: "Buyer's Guide",
    excerpt:
      "The wrong size air conditioner costs you whether it's too big or too small, just in different ways. The right capacity comes from a calculation, not a glance around the room. Here is how sizing works, what each mistake actually does, and what decides the right number.",
    body: [
      "Oversized costs you. An oversized unit cools the room fast, switches off, then switches straight back on. That short-cycling wastes energy, can leave humidity behind, and wears the compressor faster than steady running would.",
      "Undersized costs you differently. An undersized unit runs flat out to keep up, which is its least efficient and loudest operating mode, and it still falls short on the hottest or coldest days, the exact days you bought it for. Constant maximum-load running also wears components faster than a correctly sized unit cycling comfortably. [1]",
      "Neither mistake can be adjusted later. A thermostat setting can be changed. Capacity cannot. Once the unit is on the wall or in the ceiling, the size is fixed for the life of the system, commonly a decade or more. That is why sizing is the one decision worth slowing down for before anything is installed.",
      "Why rule-of-thumb charts push you toward oversized. Simple size charts usually account for floor area alone and quietly assume a worst case: uninsulated, poorly shaded, west-facing. [1] For any home that is not actually worst case, that produces a unit larger, louder and dearer than needed.",
      "Why a cheap quote can push you toward undersized. A smaller-capacity system costs less to supply, so a quote that undercuts the others may be quoting a size the load calculation would not support. The capacity on the quote is worth checking against the calculation, not just against the other prices. [2]",
      "What actually sets the size. A proper calculation weighs floor area and ceiling height, insulation, window size and orientation, climate zone and humidity, the number of occupants, heat-generating appliances, and whether it is one room or a whole home. [2] North and west-facing rooms pick up far more sun through the day.",
      "Heating and cooling are sized separately. A home that needs modest cooling in summer can carry a much larger heating load in a cold-climate winter, or the reverse. [2] Both loads are calculated, not assumed from one another.",
      "A real calculation leaves a paper trail. A load calculation should appear as a line item or an attached worksheet with the quote, not a verbal. [2] Where the numbers exist, the sizing was made on evidence rather than intuition, and you can see whether the capacity quoted matches the load calculated.",
      "What to ask when the quotes come in. Three questions cover it: What load calculation is this capacity based on, and can I see it? Why this size rather than the next size up or down? If two quotes name different capacities for the same rooms, what explains the difference? A professional who sized the system correctly can answer all three without hesitation.",
      "Right-sizing is the foundation every other decision rests on.",
    ],
    references: [
      "[1] CHOICE Australia: air conditioner sizing and buying guidance. choice.com.au",
      "[2] AIRAH: load estimation and the FairAir calculators. fairair.com.au; airah.org.au",
    ],
  },
  {
    slug: "how-to-read-an-air-conditioner-s-energy-label",
    title: "How to Read an Air Conditioner's Energy Label",
    category: "Information",
    excerpt:
      "A star rating looks like a simple shortcut, but an air conditioner's energy label carries more than one number, and misreading it can mean paying for efficiency that does not apply where you live. Here is what the label actually tells you, and what's worth knowing before you compare two units.",
    body: [
      "The label is regulated. Air conditioners sold in Australia must meet minimum efficiency standards under the Greenhouse and Energy Minimum Standards (GEMS) Act, overseen by the GEMS Regulator. [1] Since 2020, new non-ducted air conditioners must carry the Zoned Energy Rating Label, which replaced the older single-point label. [1]",
      'Why "zoned" matters. The older label measured performance at a single outdoor temperature, which flattered some units and penalised others depending on the climate. [1] The Zoned Energy Rating Label instead rates the unit across three climate zones, hot, average and cold, so a buyer in Darwin and one in Hobart are genuinely looking at different numbers. [2]',
      "Stars are efficiency, not power. The star rating tells you how efficiently a unit runs, not how much heating or cooling it delivers. Output capacity, shown in kilowatts, is the separate figure for the unit's actual power. [2]",
      "Read the right climate column. The label shows a star rating and an estimated annual energy use in kilowatt hours for each of the three zones. [2] When an installer quotes savings, look at which climate column the figure comes from, because the hot-zone number can read very differently to the cold-zone one.",
      "Capacity is shown at set temperatures. The label gives heating output at two outdoor temperatures and cooling output at one, so you can see how the unit holds up in tougher conditions, not just on a mild day. [2]",
      "Noise is on there too. Indoor and outdoor noise are listed separately in decibels, because a quiet indoor unit paired with a loud outdoor compressor is still a noisy install. [2] The outdoor figure matters most if the unit will sit near a bedroom window or a boundary.",
      "How stars compare like with like. A star rating is only meaningful between units of similar capacity. A five-star small split and a five-star ducted system are not measured on the same footing, and the scale tightens over time, so a five-star unit today is not the same as one from years ago. [2]",
      "The number behind the stars. The rating is built on a seasonal efficiency measure, which weighs the energy a unit delivers against the energy it uses across a whole season rather than a single test point. [2] That is closer to how the unit behaves in a real home.",
      "Knowing how to read the label puts you in control of the comparison. If you want help choosing a system that suits your home and climate, AC Wise connects you with vetted, licensed professionals across Australia.",
    ],
    references: [
      "[1] Australian Government, GEMS Regulator: Greenhouse and Energy Minimum Standards for air conditioners. energyrating.gov.au",
      "[2] Australian Government, energyrating.gov.au: Zoned Energy Rating Label and Energy Rating Calculator. energyrating.gov.au",
    ],
  },
  {
    slug: "air-conditioning-licensing-what-arctick-actually-covers",
    title: "Air Conditioning Licensing: What ARCtick Actually Covers",
    category: "Buyer's Guide",
    excerpt:
      "Installing or servicing air conditioning is licensed work in Australia, and the licence is more than a formality. The rules exist because the sector is the country's largest user of ozone-depleting and synthetic greenhouse gases. Here is what the licence covers and why it matters.",
    body: [
      "Refrigerant work is licensed by law. Under the Ozone Protection and Synthetic Greenhouse Gas Management Regulations, anyone who installs, services, commissions or decommissions refrigeration and air conditioning equipment must hold a Refrigerant Handling Licence, administered nationally by the Australian Refrigeration Council under the ARCtick scheme. [1]",
      "The scheme has scale. More than 130,000 individuals and businesses hold a licence, and the ARC runs over 5,000 compliance audits a year. [1] A licence reflects assessed training, typically a Certificate III in Refrigeration and Air Conditioning plus specific competencies, not just a registration fee.",
      'A licence is not all-or-nothing. Licence types differ by the work involved. A restricted split-system installation licence is not the same as a full trade licence, so "licensed" does not automatically mean licensed for a particular job. [1]',
      "Businesses need their own permit. Separate from an individual's licence, a business that acquires, stores or disposes of refrigerant must hold a current Refrigerant Trading Authorisation. [1] A solo operator can be individually licensed while the business still needs this authorisation to hold stock legally.",
      "The penalties are real. Handling refrigerant without a licence can attract fines of up to $1,800 for individuals, and illegally importing or exporting ozone-depleting or synthetic greenhouse gases carries penalties up to $90,000 for individuals and $450,000 for corporations. [1]",
      "Warranties can hinge on it. Manufacturer warranties are frequently conditional on licensed installation. [2] An unlicensed install can void cover before the system has run a season, often discovered only when something fails and the manufacturer asks for the installer's licence number.",
      "Newer refrigerants, newer accreditation. For low-GWP refrigerants such as hydrocarbons, CO2 and ammonia, the ARC also runs a voluntary Green Scheme Accreditation. [1] As manufacturers move to lower-impact refrigerants, it is a useful signal of an installer staying current.",
      "The licence is publicly recorded. The Look For The Tick register confirms a licence by number and surname or business name, showing whether it is current and what work it covers. [3]",
      "AC Wise's installer network is ARC-licensed and verified, so the licence check is already done for you. Request a no-obligation quote.",
    ],
    references: [
      "[1] Australian Refrigeration Council / ARCtick: licences, authorisations, penalties and accreditation. arctick.org",
      "[2] Look For The Tick: licensed-installer and warranty guidance. lookforthetick.com.au",
      "[3] Look For The Tick: ARC licence verification register. lookforthetick.com.au",
    ],
  },
  {
    slug: "what-an-air-conditioning-quote-should-include",
    title: "What an Air Conditioning Quote Should Include",
    category: "Buyer's Guide",
    excerpt:
      "Plenty of air conditioning quotes are a single number next to a brand name, with no scope and no detail. That leaves any later surprise cost with nowhere to be challenged, because nothing was specified to begin with. Here is what a complete quote sets out, drawn from industry best practice.",
    body: [
      "It starts before the number. AIRAH's Residential Best Practice Guideline sets out what should happen between a sales visit and a signature. [1] A transparent process establishes your actual needs first: cooling only or heating too, use of the home, whether a high efficiency rating matters more than upfront price, and your budget.",
      "It's in writing. A written quotation, not a verbal figure, is the baseline. Verbal quotes are unenforceable and easy to change later, so the detail that protects you has to be on paper. [1]",
      "Exact equipment, named. A quote should specify the make, model and capacity of the system. [1] That lets the figures be checked against the energy label and the sizing calculation rather than taken on trust.",
      "More than one option. A single option is a default, not a recommendation. Best practice is to offer alternative equipment or system choices so the decision is yours. [1]",
      "The installation scope, spelled out. The quote should detail indoor and outdoor unit placement, pipe and cable runs, and any electrical or structural work. [1] This is exactly where surprise costs on the day come from when it is left vague.",
      "Noise and placement. Expected noise output and the position of units relative to boundaries should be noted. [1] An outdoor unit too close to a fence or bedroom window is a common source of disputes.",
      "Both warranties. Equipment and installation carry separate warranties with separate conditions, and the quote should state both. [1] Knowing which covers what saves confusion if something fails.",
      "Servicing and disputes. The price of the first scheduled service, and what future services cost and exclude, should be disclosed rather than left as a future surprise. [1] A clear dispute-resolution path should be set out too, so a problem has an agreed route to a fix.",
      "Cooling-off on uninvited sales. If a system is sold door to door, a 10 business day cooling-off period applies under the Australian Consumer Law. [2] That gives breathing room to anyone who agreed under pressure and had second thoughts.",
      "A complete quote is the difference between a fixed price and a moving one.",
    ],
    references: [
      "[1] AIRAH: Residential Air Conditioning Best Practice Guideline (state and territory editions). airah.org.au",
      "[2] Australian Consumer Law (Competition and Consumer Act 2010, Sch 2): unsolicited consumer agreements and the 10 business day cooling-off period. accc.gov.au",
    ],
  },
  {
    slug: "what-drives-your-air-conditioning-running-costs",
    title: "What Drives Your Air Conditioning Running Costs",
    category: "Information",
    excerpt:
      "Two homes can run the same air conditioner and get very different bills. Here are the factors that drive your running costs, and where the savings sit.",
    readTime: "4 min read",
    body: [
      "Two homes can run the same air conditioner for the same hours and still get very different power bills. That is because running cost comes down to a handful of factors: some about the system, some about your home, and some about how you use it. Here is what actually moves the number, and where the biggest savings sit.",
      "It's a big share of your bill. Heating and cooling make up around 40% of the average Australian household's energy use, and up to 50% in hotter climates. [1] That is why small changes to how you run your system show up clearly on your bill.",
      "The temperature you set. This is the lever with the fastest payback. Setting your system one degree lower for cooling, or higher for heating, can add around 10% to your running costs for each degree. [3] Aiming for 25 to 27 degrees in summer and 18 to 20 in winter keeps you comfortable without overworking the system. [3] If that feels too warm or too cool, 23 to 25 in summer and up to 22 in winter is still reasonable, just expect each degree to add around 10% to your running costs.",
      "How efficient your system is. Every non-ducted air conditioner sold in Australia carries a Zoned Energy Rating Label, which shows its efficiency across hot, average and cold climate zones. [2] More stars means less electricity for the same output, so a high-rated model can cost noticeably less to run than an older or budget unit. [2]",
      "Reverse cycle is a heat pump. A reverse cycle air conditioner does not burn energy to make heat, it moves existing heat from outside to inside, which is why models on the Australian market run at 300 to 600% efficiency. [1] So despite a common assumption, reverse cycle is usually the cheapest way to heat a home, far more efficient than a plug-in electric heater. [1]",
      "The system type. Ducted systems condition the whole home and lose some energy through the ductwork and a larger fan, so they generally cost more to run than a wall-mounted split serving one area. [1] Matching the system to how much space you actually need to condition keeps costs down.",
      "Whether it's sized right. An undersized system runs flat out and struggles to reach temperature, while an oversized one costs more to buy and to run. [2] Correct sizing is the foundation of efficient running, which is why it comes from a proper assessment rather than floor area alone.",
      "How much of the home you condition. Conditioning empty rooms is wasted energy. Closing doors to unused rooms, or using zoning on a ducted system to cool only the areas in use, cuts the load your system has to carry. [1]",
      "Your home's thermal performance. Draughts, poor insulation and unshaded windows all let conditioned air escape and outside heat pour in, so the system works harder to hold temperature. [1] Sealing gaps around doors and windows and shading glass reduce that load before you spend a cent on running the unit. [1]",
      "How well it's maintained. A clogged filter restricts airflow and forces the system to use more energy for the same result, so regular filter cleaning lowers consumption. [2] It is one of the simplest ways to stop running costs creeping up across a season.",
      "When you run it, and your tariff. Your cost per kilowatt hour depends on your electricity plan, and many plans charge more during peak afternoon and evening hours. [3] If you are on a time-of-use tariff, running or pre-cooling the home outside those peak periods lowers what the same usage costs. [3]",
      "Understanding these drivers is the first step. If you are weighing up a new system, or want one sized and set up to run efficiently, AC Wise connects you with vetted, licensed professionals across Australia.",
    ],
    references: [
      "[1] Australian Government, energy.gov.au: Heating and Cooling (household energy share, reverse cycle efficiency, ducted vs split, zoning, draught sealing and insulation). energy.gov.au",
      "[2] Australian Government, energyrating.gov.au: Heating and Cooling consumer information (Zoned Energy Rating Label, star ratings, sizing, filters). energyrating.gov.au",
      "[3] Australian Government, energyrating.gov.au: Energy Rating Calculator (thermostat settings, cost per degree, electricity tariffs). energyrating.gov.au",
    ],
  },
  {
    slug: "how-to-choose-an-air-conditioning-installer",
    title: "The Standards to Look for in an Air Conditioning Installer",
    category: "General",
    excerpt:
      "From licensing to handover, here are the standards that mark a proper air conditioning installer, and what every job should meet",
    readTime: "4 min read",
    body: [
      "Air conditioning installation is licensed, regulated work in Australia, governed by clear legal requirements and industry standards. This guide sets out what those standards actually require, so you can check any installer against them before you commit.",
      "A refrigerant licence is the law. Anyone who handles refrigerant must hold a Refrigerant Handling Licence issued by the Australian Refrigeration Council (ARC), and working without one is illegal and carries penalties for individuals and businesses. [1] An unlicensed install can also void your manufacturer's warranty from day one. [2]",
      "Licensing is publicly recorded. The ARC maintains a free public register, where any refrigeration and air conditioning licence can be confirmed by name or number, along with its type and whether it's current. [3]",
      "State licensing applies too. On top of the national ARC licence, most states and territories require a separate contractor or electrical licence to install legally, and the requirements differ between jurisdictions. [4]",
      "Always get a written, itemised quote. A verbal figure gives you no protection if the final invoice changes. Under industry best-practice guidelines, the quote should state the system model, the total installed price, the scope of work, the unit locations, and the price of your first service. [5]",
      "Insist on a heat load calculation. Correct sizing comes from a heat load assessment, which accounts for insulation, ceiling height, window orientation and local climate, not a price-per-square-metre formula. [5] Floor area alone isn't enough to size a system accurately.",
      "Compare two or three quotes on scope. The cheapest isn't automatically the best value once you weigh efficiency, warranty terms, and whether commissioning is included. [5] A large price gap usually signals a real difference in what's being delivered.",
      "Know what's legally payable upfront. Never pay in full before work begins. Deposits for domestic building work are capped by state legislation, commonly between 5% and 10% of the contract price depending on your state and the contract value [6], and for any uninvited (door-to-door) sale the supplier cannot lawfully take payment at all during the cooling-off period. [7]",
      "You have a cooling-off period on uninvited sales. If you bought after a door-knock or unsolicited call, the Australian Consumer Law gives you 10 business days to cancel for any reason, starting the first business day after you receive the agreement. [7] During that window the supplier can't carry out the work or take your money.",
      "Insist on commissioning and handover. The job isn't finished when the system switches on. Best-practice guidelines say the installer should commission it with calibrated instruments and hand you a completed checklist, operating instructions and a maintenance schedule. [5] Keep these with your installation details in case of a warranty claim.",
      "AC Wise connects you with installers who meet every one of these standards: ARC-licensed, appropriately state-licensed, and following AIRAH best-practice guidelines. Request a no-obligation quote.",
    ],
    references: [
      "[1] Australian Refrigeration Council: Refrigerant Handling Licence requirements and penalties. arctick.org",
      "[2] Look For The Tick: licensed-installer and warranty guidance. lookforthetick.com.au",
      "[3] Look For The Tick: ARC licence verification register. lookforthetick.com.au",
      "[4] ARC: national and state/territory licensing requirements. arcltd.org.au",
      "[5] AIRAH: Residential Air Conditioning Best Practice Guidelines. airah.org.au",
      "[6] State domestic building legislation, e.g. Domestic Building Contracts Act 1995 (Vic) s 11; QBCC (Qld); Home Building Act 1989 (NSW). Confirm current limits with the relevant state authority.",
      "[7] Australian Consumer Law (Competition and Consumer Act 2010, Sch 2): unsolicited consumer agreements and the 10 business day cooling-off period. accc.gov.au",
    ],
  },
  {
    slug: "ac-maintenance-checklist",
    title:
      "Air Conditioner Maintenance: What to Do, and When to Call a Professional",
    category: "Maintenance",
    excerpt:
      "Simple upkeep keeps your air conditioner efficient and protects your warranty. Here's what you can safely do yourself, and when to book a licensed technician.",
    readTime: "5 min read",
    body: [
      "Heating and cooling make up around 40% of the average Australian household's energy use, so a well-kept air conditioner is one of the simplest ways to keep your bills down. [1] Much of that upkeep you can do yourself, and regular professional servicing is often required to keep your manufacturer's warranty valid. Here is what every system needs, and where a licensed technician has to step in.",
      "Why upkeep pays off. Common faults quietly waste energy, with typical losses of 14 to 20%, and when several build up at once, consumption climbs sharply and the risk of failure rises with it. [2] Staying on top of maintenance protects your efficiency, your running costs and, in many cases, your warranty.",
      "Filters come first. A clean filter is the single most important maintenance task for any system, because a blocked one restricts airflow, drives up running costs and can freeze the indoor coil. Most Australian systems, both high-wall splits and ducted returns, use washable filters: rinse them every four to six weeks during regular use, or as often as fortnightly in heavy use. [3] If your ducted system uses disposable media filters instead, check them on the same schedule but expect to replace them every few months, or sooner if they're visibly clogged.",
      "Never reinstall a damp filter. Washable filters must dry fully before they go back in, because a damp filter becomes a breeding ground for mould and bacteria that then circulate through your home. Ducted systems can use disposable filters instead, which remove that risk and the washing altogether.",
      "Keep the outdoor unit clear. Airflow drives efficiency, so keep leaves, dirt and vegetation away from the unit and leave roughly 500mm of clearance on all sides. If the fins are dusty, switch the unit off at the isolator first, then rinse the finned coil gently with a low-pressure hose, keeping water away from the isolator and any wiring. Never use high pressure, which bends the fins. For a deeper coil clean, book a licensed technician as part of your regular service.",
      "Set sensible temperatures. Every extra degree of heating or cooling adds around 5 to 10% to your energy use. [1] You don't need to suffer through an uncomfortable house, but even a one or two degree adjustment toward moderate makes a real difference to your bill. And resist setting extremes to heat or cool faster: your system runs at the same rate regardless, so a very low or high setpoint doesn't speed anything up, it just overshoots and wastes energy.",
      "Evaporative coolers need seasonal care. Clean the cooling pads and filter at the start of each cooling season and monthly during use, and replace any pads that are crumbling or heavily mineralised. [4] At the end of the season, cover the roof unit and close off the ducts, which stops cold air entering through the system and lifting your winter heating costs. [4]",
      "Know the warning signs. Book a licensed technician if you notice unusual noises, weak airflow, the system running without reaching the set temperature, water dripping indoors, ice forming on the unit or refrigerant lines, or an unexplained jump in your power bill. Each points to a fault that needs professional diagnosis.",
      "Some work is licensed only. All refrigerant handling and electrical work must be carried out by a technician licensed through the Australian Refrigeration Council (ARC). [5] Ducted air distribution maintenance also follows the AS/NZS 3666.2 standard. [6] Refrigerant, electrical, drainage and ductwork repairs are not DIY jobs.",
      "Service on schedule. Have refrigerated systems, both split and ducted, professionally serviced about every 12 months, ideally before peak season. [6] Evaporative coolers need a professional every two to three years to de-scale the pads, check the pump, adjust the fan belt and set the bleed rate. [4]",
      "AC Wise connects you with vetted, licensed air conditioning professionals across Australia, for routine servicing, fault diagnosis, filter upgrades and full system inspections. Request a service from an AC Wise partner.",
    ],
    references: [
      "[1] Australian Government, YourHome: Heating and Cooling. yourhome.gov.au",
      "[2] Australian Government, Department of Climate Change, Energy, the Environment and Water: Heating and Cooling. energy.gov.au",
      "[3] Australian Government, Department of Climate Change, Energy, the Environment and Water: keeping cool and filter cleaning guidance. energy.gov.au",
      "[4] Australian Government, Department of Climate Change, Energy, the Environment and Water: evaporative cooling maintenance. energy.gov.au",
      "[5] Australian Refrigeration Council: licensing for refrigerant handling and air conditioning work. arctick.org",
      "[6] AIRAH: DA19 HVAC&R Maintenance Schedules, maintenance under AS/NZS 3666.2. airah.org.au",
    ],
  },
  {
    slug: "your-complete-guide-to-reverse-cycle-air-conditioning",
    title: "Ducted Reverse Cycle Air Conditioning: What to Know Before You Buy",
    category: "Buyer's Guide",
    excerpt:
      "Ducts, zoning, inverters and correct sizing all shape how a ducted reverse cycle system performs. Here's what to know before you buy.",
    readTime: "4 min read",
    body: [
      "A ducted reverse cycle system heats and cools your whole home from a central unit in the roof space, and done well it runs efficiently for well over a decade. Before you buy, a handful of factors decide how well it performs and what it costs to run. Here is what shapes a good ducted system, grounded in Australian standards and government guidance.",
      "Ducts lose energy. Every ducted system loses some energy through its ductwork, which makes it less efficient to run than a wall-mounted split. [1] Leaks at poorly sealed joins and ceiling registers add to that, and air leaks can account for 15 to 25% of winter heat loss in a building. [2]",
      "Good ductwork is insulated and sealed. A quality install uses ducts insulated to at least R1.5 with every join sealed, and a higher rating in extreme climates. [3] In older homes, leaky existing ducts will drag down a brand-new system, so the roof space is worth inspecting before installation. [4]",
      "Zoning saves running costs. Zoning uses motorised dampers to heat or cool only the rooms you are using, rather than conditioning the whole house at once. [3] Conditioning empty rooms wastes energy, and zone settings can make a central system considerably more efficient. [1]",
      "Design zoning from the start. Retrofitting zoning into an existing system is possible, but it costs more than building it in from the beginning. It is worth mapping how your household uses the home across the day before anything goes into the ceiling.",
      "Strata can refuse an install. In a strata or body corporate property, an outdoor unit on common property is a modification that needs formal approval before any work starts, and refusals do happen. Committees can knock one back over external appearance, noise, limited space, or unapproved penetrations through shared walls.",
      "Get strata approval in writing first. Approval is not automatic, even if other units in your building already have air conditioning. Skipping it can mean a penalty and an order to remove the unit at your own cost, so secure written approval before you buy.",
      "Inverter vs non-inverter. A non-inverter compressor runs at full power then switches off, restarting at full power each time, which is energy-intensive and hard on the compressor. [5] An inverter uses a variable speed drive to ramp the compressor up and down to match demand instead of stopping and starting, holding a steadier temperature. [5][6]",
      "Why inverters cost less to run. Inverter systems typically use 30 to 50% less energy than non-inverter models, and across a whole-home ducted system running long hours, that adds up over a season. They also run quieter and tend to last longer, since continuous operation causes less wear than repeated stop-start cycling. [6]",
      "Sizing is the critical step. Correct sizing comes from a heat load calculation based on AIRAH's DA09 manual, which is built for Australian conditions. [7] An undersized system runs constantly and never quite gets comfortable, while an oversized one short-cycles, leaving the home cool but humid and wearing the compressor out faster. [7]",
      "How proper sizing is done. A heat load assessment weighs floor area, ceiling height, insulation, window type and orientation, sun exposure, local climate and occupancy, not floor area alone.",
      "For a properly sized inverter ducted system with quality ductwork and smart zoning, AC Wise connects you with vetted, licensed installers who size and build to standard. Request a no-obligation quote from an AC Wise partner.",
    ],
    references: [
      "[1] Australian Government, Department of Climate Change, Energy, the Environment and Water: Heating and Cooling. energy.gov.au",
      "[2] Australian Government, YourHome: Ventilation and Airtightness (citing CSIRO 2015 research). yourhome.gov.au",
      "[3] Australian Government, YourHome: Heating and Cooling. yourhome.gov.au",
      "[4] Palmer, J: Energy Losses Due to Ductwork in Victorian Homes. Field study funded by Sustainability Victoria, conducted through RMIT, published in AIRAH HVAC&R Nation, 2009. airah.org.au",
      "[5] Australian Government, Department of Climate Change, Energy, the Environment and Water: Motors and Variable Speed Drives. energy.gov.au",
      "[6] LG Electronics Australia and Panasonic Australia: inverter air conditioner operation. lg.com/au; panasonic.com/au",
      "[7] AIRAH: DA09 Application Manual, Air Conditioning Load Estimation. airah.org.au",
    ],
  },
];

export const categories = [
  "All",
  "Buyer's Guide",
  "Maintenance",
  "Information",
  "General",
] as const;
