/**
 * Centralized Resume & Competition Data for Akira Waewbandhit (Asgar)
 * 13-Year-Old Student Prodigy (Mathematics, English, & Competitive Programming)
 * 16-Bit Retro Platformer Resume
 */

export const RESUME_DATA = {
  profile: {
    name: "Akira Waewbandhit",
    nickname: "Asgar",
    birthday: "18 August 2013",
    age: 13,
    title: "Passionate academic competitor specializing in advanced mathematics and Python / C++ programming",
    currentGrade: "Secondary 2",
    school: "Panyarat High School",
    location: "Bangkok, Thailand",
    stats: {
      math: 99,
      problemSolving: 90,
      coding: 89,
      english: 89,
      thai: 25,
      sport: 67,
      roblox: 100,
      minecraft: 100
    },
    email: "akira.asgar@gmail.com",
    like: "Fried Chicken, KFC, Crispy Fried Seaweed",
    dislike: "All kinds of vegetables and fruits",
    hobby: "playing Games, Chess, Table Tennis, and Swimming.",
    motto: "Never argue with a 90° angle. It's always RIGHT!"
  },

  stages: [
    {
      id: "stage-profile",
      title: "My Profile",
      subtitle: "Personal Foundation & Early Sparks",
      theme: "city",
      costume: "school",
      palette: {
        skyTop: "#1a103c",
        skyBottom: "#e26a6a",
        ground: "#2a2d43",
        accent: "#f4d06f"
      },
      description: " ",
      items: [
        {
          id: "profile-kcs",
          year: "2016-2019",
          title: "Kwongchow School",
          level: "Kindergarten 1 - Primary 1",
          location: "525 Silom Road, Bangrak, Bangkok",
          summary: "A historic school in Bangkok, originally known as Kwong Siew School, offering multi-level education with both Thai regular and English programs.",
          icon: "images/school/kcs.png",
          images: ["images/school/kcs1.jpg", "images/school/kcs2.jpg", "images/school/kcs3.jpg"]
        },
        {
          id: "profile-btd",
          year: "2020",
          title: "Bangkok Thonburi Demonstration School",
          level: "Primary 2",
          location: "468 Liap Khlong Thawi Watthana Road, Thawi Watthana, Bangkok",
          summary: "A modern school offers learning programs from pre-kindergarten up to high school, focusing on an international atmosphere and a trilingual approach.",
          icon: "images/school/btd.png",
          images: ["images/school/btd1.jpg", "images/school/btd2.jpg", "images/school/btd3.jpg", "images/school/btd4.jpg"]
        },
        {
          id: "profile-homeschool",
          year: "2021-2024 ",
          title: "Home School",
          level: "Primary 3 - Primary 6",
          location: "Everywhere, Internet",
          summary: "Learning in the wider world, a time that coincided with the COVID-19 pandemic.",
          icon: "images/school/home.png",
          images: ["images/school/home1.jpg", "images/school/home2.jpg", "images/school/home3.jpg", "images/school/home4.jpg", "images/school/home5.jpg"]
        },
        {
          id: "profile-chinda",
          year: "2024",
          title: "Chindamanee School",
          level: "Primary 6",
          location: "41 Soi 18, Bang Mot, Chom Thong, Bangkok",
          summary: "A pioneer bilingual school in Thailand that integrates English-language instruction with Thai cultural values.",
          icon: "images/school/chinda.png",
          images: ["images/school/chinda1.jpg", "images/school/chinda2.jpg", "images/school/chinda3.jpg"]
        },
        {
          id: "profile-panyarat",
          year: "2025 - Present",
          title: "Panyarat High School",
          level: "Secondary 1 - Secondary 2",
          location: "250 Silom Soi 18, Bangrak, Bangkok",
          summary: "Elite secondary school located in the heart of Bangkok's central business district on Silom Road.",
          icon: "images/school/phs.png",
          images: ["images/school/phs1.jpg", "images/school/phs2.jpg", "images/school/phs3.jpg", "images/school/phs4.jpg", "images/school/phs5.jpg", "images/school/phs6.jpg", "images/school/phs7.jpg", "images/school/phs8.jpg", "images/school/phs9.jpg", "images/school/phs10.jpg"]
        }
      ]
    },
    {
      id: "stage-english",
      title: "English Competitions",
      subtitle: "Master the language - Shape the narrative - Own the stage",
      theme: "forest",
      costume: "explorer",
      palette: {
        skyTop: "#082b21",
        skyBottom: "#459663",
        ground: "#1b4d2e",
        accent: "#72f285"
      },
      description: "The competition is more than a test of fluency; it is a proving ground to wield language with nuance, command the narrative, and turn raw ideas into compelling dialogue.",
      items: [
        {
          id: "english-asmopss",
          title: "ASMOPSS - English",
          desc: "ASMOPSS stands for the Asian Science & Mathematics Olympiad for Primary and Secondary Schools, an international academic competition designed to challenge and inspire young students. Founded and established by the Surya Institute in Indonesia. The competition operates under the joint cooperation of 11 countries, creating a reputable global platform for academic excellence.",
          icon: "images/icon/asmopss.png",
          competitions: [
            { year: "2025", round: "🇹🇭 National", award: "🥉 Bronze Medal" },
            { year: "2026", round: "🇹🇭 National", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/asmopss_eng1.jpg", "images/certificates/asmopss_eng2.jpg"]
        },
        {
          id: "english-asmo",
          title: "ASMO - English",
          desc: "Asian Science and Mathematics Olympiad (ASMO) is an international academic competition designed to assess and challenge students' abilities in Mathematics, Science, and English. Founded and coordinated by ASMO Malaysia (Olympic Edu Sdn Bhd) alongside participating regional bodies across Asia.",
          icon: "images/icon/asmo.png",
          competitions: [
            { year: "2025", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2026", round: "🇹🇭 National", award: "⏳ Pending..." }
          ],
          images: ["images/certificates/asmo_eng1.jpg", "images/certificates/asmo_eng2.jpg"]
        },
        {
          id: "english-teset",
          title: "TESET",
          desc: "TESET stands for Thailand English Skills Evaluation Test, a national English proficiency assessment designed for students from Grade 1 to Grade 12 (Prathom 1 to Matthayom 6). Organized by Thailand Academic Contest (TAC) collaborated with the Language Institute of Thammasat University (LITU).",
          icon: "images/icon/teset.png",
          competitions: [
            { year: "2024", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2025", round: "🇹🇭 National", award: "💎 Diamond Medal" },
            { year: "2026", round: "🇹🇭 National", award: "💎 Diamond Medal" }
          ],
          images: ["images/certificates/teset1.jpg", "images/certificates/teset2.jpg", "images/certificates/teset3.jpg"]
        },
        {
          id: "english-tsb",
          title: "TSB",
          desc: "Thailand Spelling Bee (TSB) is a premier national English vocabulary and spelling competition designed for primary and secondary school students across Thailand. Organized by the Thailand Academic Contest (TAC) in academic collaboration under a Memorandum of Understanding (MOU) with the Language Institute of Thammasat University (LITU).",
          icon: "images/icon/tsb.png",
          competitions: [
            { year: "2023", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2023", round: "🇹🇭 Champion", award: "🏆 2nd Place Winner" },
            { year: "2024", round: "🇹🇭 National", award: "🥇 Gold Medal", remark: "⭐Perfect Score" },
            { year: "2025", round: "🇹🇭 National", award: "💎 Diamond Medal" },
            { year: "2026", round: "🇹🇭 National", award: "💎 Diamond Medal", remark: "⭐Perfect Score" }
          ],
          images: ["images/certificates/tsb1.jpg", "images/certificates/tsb2.jpg", "images/certificates/tsb3.jpg", "images/certificates/tsb4.jpg", "images/certificates/tsb5.jpg", "images/certificates/tsb6.jpg"]
        },
        {
          id: "english-tesc",
          title: "TESC",
          desc: "TESC stands for Thailand English Speech Contest, a national English public speaking competition in Thailand designed for students. Organized by the Thailand Academic Contest (TAC), an organization that hosts national academic and skill-based evaluations and competitions for youth in Thailand.",
          icon: "images/icon/tesc.png",
          competitions: [
            { year: "2024", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2025", round: "🇹🇭 National", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/tesc1.jpg", "images/certificates/tesc2.jpg"]
        },
        {
          id: "english-eurasian",
          title: "ESB",
          desc: "Eurasian Spelling Bee (ESB) is an international English vocabulary and spelling competition designed for students aged 6 to 19.  Established in 2020 by the English Language Proficiency Competition LLC. Tests and materials follow the Common European Framework of Reference for Languages (CEFR).",
          icon: "images/icon/eurasian.png",
          competitions: [
            { year: "2026", round: "🇹🇭 National", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/eurasian1.jpg"]
        },
        {
          id: "english-nepa",
          title: "NEPA",
          desc: "NEPA (National English Proficiency Assessment) competition is a nationwide English language assessment and competition designed for Thai students.  Participants receive certificates, CEFR score reports, and medals or trophies based on their performance criteria.",
          icon: "images/icon/nepa.png",
          competitions: [
            { year: "2025", round: "🇹🇭 National", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/nepa1.jpg"]
        },
        {
          id: "english-naec",
          title: "NAEC",
          desc: "NAEC stands for the National Advanced English Competition, a major national English proficiency contest in Thailand organized by the National Educational Testing Office (NETO), often held alongside other academic events like the National Spelling Bee (NSB).",
          icon: "images/icon/naec.png",
          competitions: [
            { year: "2024", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2025", round: "🇹🇭 National", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/naec1.jpg", "images/certificates/naec2.jpg"]
        },
        {
          id: "english-nsb",
          title: "NSB",
          desc: "The National Spelling Bee (NSB) in Thailand is a major English vocabulary and spelling competition designed for primary and lower-secondary school students. Organized by the National Educational Testing Office (NETO) (formerly known as the Andaman Academic Hub).",
          icon: "images/icon/nsb.png",
          competitions: [
            { year: "2024", round: "🇹🇭 National", award: "🥇 Gold Medal", remark: "🏆 Rank 2nd " },
            { year: "2024", round: "🇹🇭 Champion", award: "🏆 1st Place Winner" },
            { year: "2025", round: "🇹🇭 National", award: "💎 Diamond Medal", remark: "⭐Perfect Score" }
          ],
          images: ["images/certificates/nsb1.jpg", "images/certificates/nsb2.jpg", "images/certificates/nsb3.jpg"]
        }
        ,
        {
          id: "english-asbc",
          title: "ASBC",
          desc: "The Asian Spelling Bee Cup (ASBC) is an intercontinental English spelling competition and educational exchange program initiated and organized by the SPBCN China Organizing Committee (Spelling Bee of China), led by founders Dean Zhang and Ava Zhang.",
          icon: "images/icon/asbc.png",
          competitions: [
            { year: "2024", round: "🇹🇭 International", award: "🏆 2nd Place Trophy" },
          ],
          images: ["images/certificates/asbc1.jpg", "images/certificates/asbc2.jpg"]
        }
      ]
    },

    {
      id: "stage-math",
      title: "Mathematics Competitions",
      subtitle: "Beyond the formulas lies the art of reason",
      theme: "cave",
      costume: "miner",
      palette: {
        skyTop: "#120924",
        skyBottom: "#3c1766",
        ground: "#23113c",
        accent: "#d946ef"
      },
      description: "I step into an arena where logic, creativity, and perseverance tackle the most elegant problems, challenging my mind to move beyond standard formulas through precision, intuition, and mental agility.",
      items: [
        {
          id: "math-fmc",
          title: "FMC",
          desc: "Factorial Math Competition (FMC) is an international and national mathematics competition created by the Surya Institute designed to assess and challenge students' analytical and problem-solving skills.",
          icon: "images/icon/fmc.png",
          competitions: [
            { year: "2024", round: "🇹🇭 National", award: "🥇 Gold Medal", remark: "🏆3rd Place Winner" },
            { year: "2024", round: "🇮🇩 International", award: "🥈 Silver Medal" },
            { year: "2025", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2026", round: "🇹🇭 National", award: "🥇 Gold Medal", remark: "⭐Perfect Score" }
          ],
          images: ["images/certificates/fmc1.jpg", "images/certificates/fmc2.jpg", "images/certificates/fmc3.jpg", "images/certificates/fmc4.jpg", "images/certificates/fmc5.jpg", "images/certificates/fmc6.jpg"]
        },
        {
          id: "math-asmopss",
          title: "ASMOPSS - Math",
          desc: "ASMOPSS stands for the Asian Science & Mathematics Olympiad for Primary and Secondary Schools, an international academic competition designed to challenge and inspire young students. Founded and established by the Surya Institute in Indonesia. The competition operates under the joint cooperation of 11 countries, creating a reputable global platform for academic excellence.",
          icon: "images/icon/asmopss.png",
          competitions: [
            { year: "2025", round: "🇹🇭 National", award: "🥇 Gold Medal", remark: "👑Hall of Fame" },
            { year: "2025", round: "🇹🇭 Selection", award: "🥉 Bronze Medal" },
            { year: "2026", round: "🇹🇭 National", award: "🥇 Gold Medal", remark: "⭐Perfect Score, 👑Hall of Fame" }
          ],
          images: ["images/certificates/asmopss_math1.jpg", "images/certificates/asmopss_math2.jpg", "images/certificates/asmopss_math3.jpg", "images/certificates/asmopss_math4.jpg", "images/certificates/asmopss_math5.jpg"]
        },
        {
          id: "math-asmo",
          title: "ASMO - Math",
          desc: "Asian Science and Mathematics Olympiad (ASMO) is an international academic competition designed to assess and challenge students' abilities in Mathematics, Science, and English. Founded and coordinated by ASMO Malaysia (Olympic Edu Sdn Bhd) alongside participating regional bodies across Asia.",
          icon: "images/icon/asmo.png",
          competitions: [
            { year: "2024", round: "🇹🇭 National", award: "🥈 Silver Medal" },
            { year: "2025", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2025", round: "🇮🇩 International", award: "🥈 Silver Medal" },
            { year: "2026", round: "🇹🇭 National", award: "Pending..." }
          ],
          images: ["images/certificates/asmo_math1.jpg", "images/certificates/asmo_math2.jpg", "images/certificates/asmo_math3.jpg"]
        },
        {
          id: "math-timo",
          title: "TIMO",
          desc: "Thailand International Mathematical Olympiad (TIMO), is an annual international mathematics competition organized jointly by the Olympiad Champion Education Center (OCEC) from Hong Kong and the Thailand Mathematics Society.",
          icon: "images/icon/timo.png",
          competitions: [
            { year: "2024", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2024", round: "🇹🇭 International", award: "🥇 Gold Medal" },
            { year: "2025", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2025", round: "🇹🇭 International", award: "🥇 Gold Medal" },
            { year: "2026", round: "🇹🇭 National", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/timo1.jpg", "images/certificates/timo2.jpg", "images/certificates/timo3.jpg", "images/certificates/timo4.jpg", "images/certificates/timo5.jpg"]
        },
        {
          id: "math-bbb",
          title: "BBB",
          desc: "Big Bay Bei (BBB) Guangdong-Hong Kong-Macao Greater Bay Area Mathematical Olympiad. It is a prestigious, annual international mathematics competition organized by the Olympiad Champion Education Centre (OCEC) based in Hong Kong.",
          icon: "images/icon/bbb.png",
          competitions: [
            { year: "2025", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2025", round: "🇭🇰 International", award: "🥇 Gold Medal" },
            { year: "2026", round: "🇹🇭 National", award: "🥈 Silver Medal" },
            { year: "2026", round: "🇭🇰 International", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/bbb1.jpg", "images/certificates/bbb2.jpg", "images/certificates/bbb3.jpg", "images/certificates/bbb4.jpg"]
        },
        {
          id: "math-hkimo",
          title: "HKIMO",
          desc: "HKIMO stands for the Hong Kong International Mathematical Olympiad, an annual international mathematics competition developed by the Olympiad Education center from Hong Kong. The competition is divided into several grade-specific categories, ranging from Kindergarten (K3) to Senior Secondary (Grade 12). Unlike some exams that focus purely on school curriculums, HKIMO tests deep logical reasoning across five main topics Logical Thinking, Arithmetic, Number Theory, Geometry and Combinatorics",
          icon: "images/icon/hkimo.png",
          competitions: [
            { year: "2024", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2024", round: "🇭🇰 International", award: "🥇 Gold Medal" },
            { year: "2026", round: "🇹🇭 National", award: "🥇 Gold Medal" },
            { year: "2026", round: "🇭🇰 International", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/hkimo1.jpg", "images/certificates/hkimo2.jpg", "images/certificates/hkimo3.jpg", "images/certificates/hkimo4.jpg"]
        },
        {
          id: "math-wimo",
          title: "WIMO",
          desc: "WIMO is organized and managed by the WIMO Foundation in partnership with the Olympiad Champion Education Group (OCEC) from Hong Kong. Founded by professional, highly experienced IMO coaches and former winners Dr. Andy Lam, Elvis Cheung, and Derek Lee. It is open only to the top 1% of students. To receive an invitation, students must win Gold Awards in specific major international final rounds, such as the HKIMO, TIMO and BBB.",
          icon: "images/icon/wimo.png",
          competitions: [
            { year: "2025", round: "🇨🇳 International", award: "🥇 Gold Medal" },
            { year: "2026", round: "🇨🇳 International", award: "Pending..." }
          ],
          images: ["images/certificates/wimo1.jpg", "images/certificates/wimo2.jpg", "images/certificates/wimo3.jpg", "images/certificates/wimo4.jpg"]
        },
        {
          id: "math-seamo",
          title: "SEAMO",
          desc: "The Southeast Asian Mathematical Olympiad (SEAMO) is a highly acclaimed international math competition. The competition is organized and governed by the Terry Chew Institute of Mathematical Olympiads (TCIMO) based in Singapore. SEAMO has grown rapidly from a regional event into a major international olympiad. It has expanded to over 20+ countries reaching more than 150,000 participants globally.",
          icon: "images/icon/seamo.png",
          competitions: [
            { year: "2024", round: "🇹🇭 National", award: "🥇 Gold Medal", remark: "🏆 1st Place Winner" },
            { year: "2025", round: "🇲🇾 International", award: "🥇 Gold Medal", remark: "🏆 2nd Place Winner" },
            { year: "2025", round: "🇹🇭 National", award: "🥇 Gold Medal", remark: "🏆 2nd Place Winner" },
            { year: "2026", round: "🇮🇩 International", award: "🥇 Gold Medal", remark: "🏆 1st Place Winner" },
            { year: "2026", round: "🇹🇭 National", award: "Pending..." }
          ],
          images: ["images/certificates/seamo1.jpg", "images/certificates/seamo2.jpg", "images/certificates/seamo3.jpg", "images/certificates/seamo4.jpg", "images/certificates/seamo5.jpg"]
        },
        {
          id: "math-imc",
          title: "IMC",
          desc: "The International Math Challenge (IMC) was founded in 2012 in Bangkok, Thailand. It focuses on building logical reasoning, critical thinking, and problem-solving skills rather than routine formula memorization. The competition has grown exponentially, attracting more than 50,000 students across 140+ countries worldwide.",
          icon: "images/icon/imc.png",
          competitions: [
            { year: "2024", round: "🌎 Online", award: "🥇 Gold Medal", remark: "Rank #11" },
            { year: "2024", round: "🇹🇭 International", award: "🥇 Gold Medal", remark: "Rank #8" },
            { year: "2025", round: "🌎 Online", award: "🥇 Gold Medal", remark: "Rank #11" }
          ],
          images: ["images/certificates/imc1.jpg", "images/certificates/imc2.jpg", "images/certificates/imc3.jpg", "images/certificates/imc4.jpg"]
        },
        {
          id: "math-lpmc",
          title: "LPMC",
          desc: "Learning and Playing Math Competition is a well-known academic examination in Thailand. It focuses on evaluating and enhancing the problem-solving and analytical skills of young students in mathematics and science.",
          icon: "images/icon/lpmc.png",
          competitions: [
            { year: "2025", round: "🇹🇭 National", award: "🥇 🏆 Gold Medal", remark: "⭐Perfect Score" }
          ],
          images: ["images/certificates/lpmc1.jpg"]
        },
        {
          id: "math-itmc",
          title: "ITMC",
          desc: "ITMC (International Talent Mathematics Contest) is an international mathematics competition designed to evaluate students' math potential and elevate their skills to global standards.  Organized in parallel with the national TMC Thailand network, in cooperation with international bodies involving multiple countries.",
          icon: "images/icon/itmc.png",
          competitions: [
            { year: "2025", round: "🇹🇭 International", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/itmc1.jpg", "images/certificates/itmc2.jpg"]
        },

      ]
    },

    {
      id: "stage-math2",
      title: "Mathematics Competitions (Continue)",
      subtitle: "Beyond the curriculum - Beyond the limits - Driven by discovery",
      theme: "ocean",
      costume: "diver",
      palette: {
        skyTop: "#0c182a",
        skyBottom: "#477890",
        ground: "#1b3345",
        accent: "#a5f3fc"
      },
      description: "Although the world of mathematics is highly intricate, it forms the bedrock of all technological innovation on Earth. The deeper our understanding of its complexities, the more equipped we are to unravel the mysteries of the universe.",
      items: [
        {
          id: "math-amc",
          title: "AMC",
          desc: "The Australian Mathematics Competition (AMC) is one of the world's largest school-based mathematics competitions, designed for students from Year 3 to Year 12. Organized and run by the Australian Maths Trust (AMT).",
          icon: "images/icon/amc.png",
          competitions: [
            { year: "2024", round: "🇦🇺 International", award: "🎖️ Distinction" },
            { year: "2025", round: "🇦🇺 International", award: "👑 High Distinction" }
          ],
          images: ["images/certificates/amc1.jpg", "images/certificates/amc2.jpg", "images/certificates/amc3.jpg", "images/certificates/amc4.jpg"]
        },
        {
          id: "math-amc8",
          title: "AMC8",
          desc: "The AMC 8 (American Mathematics Competitions 8) is a well-known middle school mathematics championship organized by the Mathematical Association of America (MAA). Today, the AMC programs attract over 300,000 students from more than 6,000 schools worldwide each year.",
          icon: "images/icon/amc8.png",
          competitions: [
            { year: "2025", round: "🇺🇸 International", award: "🎖️ Distinction" }
          ],
          images: ["images/certificates/amc81.jpg", "images/certificates/amc82.jpg"]
        },
        {
          id: "math-amo",
          title: "AMO",
          desc: "The American Math Olympiad (AMO) is an international mathematics competition designed for elementary, middle, and high school students from Grades 2 to 12. It aims to promote a deeper understanding of mathematics, build logical reasoning, and test students' problem-solving skills rather than rote memorization.",
          icon: "images/icon/amo.png",
          competitions: [
            { year: "2025", round: "🇺🇸 International", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/amo1.jpg"]
        },
        {
          id: "math-cjmc",
          title: "CJMC",
          desc: "The Canada Jay Mathematical Competition (CJMC) is a prominent international math competition originating from Canada. Founded in 2020 by Canadian mathematicians to foster problem-solving skills and excitement for math among younger students.",
          icon: "images/icon/cjmc.png",
          competitions: [
            { year: "2024", round: "🇨🇦 International", award: "🥉 Bronze Medal" },
            { year: "2025", round: "🇨🇦 International", award: "🥉 Bronze Medal" }
          ],
          images: ["images/certificates/cjmc1.jpg", "images/certificates/cjmc2.jpg", "images/certificates/cjmc3.jpg"]
        },
        {
          id: "math-imgo",
          title: "IMGO",
          desc: "The International Mathematical Genius Olympiad (IMGO) is an annual international mathematics competition designed for students aged 7 to 18 years old (Grades 1–12) to showcase and develop their logical, analytical, and problem-solving skills.",
          icon: "images/icon/imgo.png",
          competitions: [
            { year: "2024", round: "🇹🇭 National", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/imgo1.jpg"]
        },
        {
          id: "math-league",
          title: "Math League",
          desc: "The Math League is an international mathematics competition series designed for students in grades 1 through 12. Established in the United States by veteran high school mathematics teachers and educators Steven R. Conrad and Daniel Flegler. Both founders received Presidential Awards for Excellence in Mathematics Teaching and have authored numerous books and regional math contests.",
          icon: "images/icon/mathleague.png",
          competitions: [
            { year: "2024", round: "🇺🇸 International", award: "👑 Excellence" }
          ],
          images: ["images/certificates/mathleague1.jpg"]
        },
        {
          id: "math-smc",
          title: "SMC-SMGF",
          desc: "Singapore Math Challenge (SMC) is organized by the Singapore International Math Contests Centre (SIMCC). Also known as SINGA Math, this competition was established to benchmark global students against the high standards of the Singapore Math curriculum. The curriculum framework is originally crafted by top educators from Singapore's Ministry of Education (MOE).",
          icon: "images/icon/smc.png",
          competitions: [
            { year: "2025", round: "SMC 🇸🇬 International", award: "👑 Exemplary", remark: "🏆 Rank 1st 🇹🇭 , 10th 🌎 " },
            { year: "2026", round: "SMGF 🇸🇬 International", award: "👑🥇 Gold Medal", remark: "🏆 Rank 1st 🇹🇭 , 5th 🌎 " }
          ],
          images: ["images/certificates/smc1.jpg", "images/certificates/smc2.jpg"]
        },
        {
          id: "math-mce",
          title: "MCE-SMC",
          desc: "The MCE SMC stands for the Marshall Cavendish Education Singapore Mathematics Competition. It is a premier international mathematics tournament tailored for primary and lower secondary school students. MCE is widely renowned for developing world-class educational resources, particularly textbooks and frameworks utilizing the highly acclaimed Singapore Math approach.",
          icon: "images/icon/mce.png",
          competitions: [
            { year: "2026", round: "🇸🇬 International", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/mce1.jpg"]
        },
        {
          id: "math-simso",
          title: "SIMSO",
          desc: "The Siam International Math and Science Olympics (SIMSO) was launched in 2021. It was developed following the success of its counterpart, the Philippine International Math and Science Olympics (PIMSO). SIMSO is organized by International Champions in Education, Inc. (ICE).",
          icon: "images/icon/simso.png",
          competitions: [
            { year: "2026", round: "🇹🇭 National", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/simso1.jpg"]
        },
        {
          id: "math-olpcs",
          title: "OLPCS",
          desc: "Olympic Mathematics Competition (OLPCS)  The competition was first established in 1989 in Taiwan.  Over the decades, it expanded into a prominent cross-regional competition spanning multiple areas including Hong Kong, Macau, and Thailand.",
          icon: "images/icon/olpcs.png",
          competitions: [
            { year: "2025", round: "🇹🇼 International", award: "🥇 Gold Medal" }
          ],
          images: ["images/certificates/olpcs1.jpg"]
        },
        {
          id: "math-imas",
          title: "IMAS",
          desc: "IMAS (International Mathematics Assessment for Schools) is an international math test for students from primary to lower secondary school levels. Organized by the IMAS Executive Council, under the leadership of the Chiu Chang Mathematics Education Foundation from Taiwan.",
          icon: "images/icon/imas.png",
          competitions: [
            { year: "2025", round: "🇹🇼 International", award: "👑 High Distinction" },
            { year: "2026", round: "🇹🇼 International", award: "🎖️ Distinction" }
          ],
          images: ["images/certificates/imas1.jpg", "images/certificates/imas2.jpg"]
        },
        {
          id: "math-pmwc",
          title: "PMWC - Po Leung Kuk",
          desc: "The Po Leung Kuk Primary Mathematics World Contest (PMWC) is an annual international mathematics competition for primary school students aged 13 or under. The competition was first launched in 1997 in Hong Kong to promote mathematics education and foster cultural exchange among young students globally.",
          icon: "images/icon/pmwc.png",
          competitions: [
            { year: "2025", round: "🇭🇰 International", award: "🥉 Bronze Medal" }
          ],
          images: ["images/certificates/pmwc1.jpg", "images/certificates/pmwc2.jpg", "images/certificates/pmwc3.jpg"]
        }
      ]
    },

    {
      id: "stage-coding",
      title: "Computer & Coding Competitions",
      subtitle: "Think algorithmically. Build fearlessly. Debug instantly",
      theme: "ice",
      costume: "winter",
      palette: {
        skyTop: "#021729",
        skyBottom: "#0b4d75",
        ground: "#04283f",
        accent: "#38bdf8"
      },
      description: "Transforming abstract logic into efficient solutions, pushing computational limits, optimizing complexity under pressure, and turning intricate challenges into executing code.",
      items: [
        {
          id: "coding-cat",
          title: "CAT",
          desc: "Computational and Algorithmic Thinking (CAT) is an international competition assessing computational and algorithmic thinking skills, organized by the Australian Maths Trust (AMT). The competition is designed to test problem-solving and logical thinking without requiring advanced programming knowledge.",
          icon: "images/icon/cat.png",
          competitions: [
            { year: "2024", round: "🇦🇺 International", award: "👑 High Distinction", remark: "⭐Perfect Score" },
            { year: "2025", round: "🇦🇺 International", award: "👑 High Distinction" }
          ],
          images: ["images/certificates/cat1.jpg", "images/certificates/cat2.jpg", "images/certificates/cat3.jpg", "images/certificates/cat4.jpg"]
        },
        {
          id: "coding-kaggle",
          title: "Kaggle",
          desc: "Kaggle is an online community platform for data scientists and machine learning practitioners that hosts data science competitions and provides cloud-based tools. Founded in 2010 in Melbourne, Australia, by Anthony Goldbloom and Ben Hamner. The platform grew rapidly and was acquired by Google in March 2017, becoming a subsidiary under Google LLC.",
          icon: "images/icon/kaggle.png",
          competitions: [
            { year: "2026", course: "🌟 Intro to Programming" },
            { year: "2026", course: "🌟 Python" },
            { year: "2026", course: "🌟 Pandas" }
          ],
          images: ["images/certificates/kaggle1.jpg", "images/certificates/kaggle2.jpg", "images/certificates/kaggle3.jpg"]
        },
        {
          id: "coding-cisco",
          title: "Cisco",
          desc: "Cisco Networking Academy integrated programming education into its core curriculum. They partnered with the OpenEDG Python Institute to create high-quality, structured learning paths. This partnership allows students to learn Python—the leading language for network automation—directly within the Cisco learning ecosystem.",
          icon: "images/icon/cisco.png",
          competitions: [
            { year: "2026", course: "🌟 Python Essentials 1" },
            { year: "2026", course: "🌟 Python Essentials 2" }
          ],
          images: ["images/certificates/cisco1.jpg", "images/certificates/cisco2.jpg"]
        },
        {
          id: "coding-anthropic",
          title: "Anthropic",
          desc: "Anthropic is an American artificial intelligence safety and research company based in San Francisco, California. Founded in 2021 by former OpenAI executives and researchers, most notably siblings Dario Amodei and Daniela Amodei.",
          icon: "images/icon/anthropic.png",
          competitions: [
            { year: "2026", course: "🌟 Claude101" },
            { year: "2026", course: "🌟 AI Fluency for students" },
            { year: "2026", course: "🌟 AI Fluency Framework Foundations" },
            { year: "2026", course: "🌟 Introduction to Claude Cowork" },
            { year: "2026", course: "🌟 Introduction to agent skills" }
          ],
          images: ["images/certificates/anthropic1.jpg", "images/certificates/anthropic2.jpg", "images/certificates/anthropic3.jpg", "images/certificates/anthropic4.jpg", "images/certificates/anthropic5.jpg"]
        },
        {
          id: "coding-posn",
          title: "POSN - สอวน",
          desc: "POSN Computer is a national academic selection and camp project in Thailand that trains high school students in programming, algorithms, and computer science to compete in the International Olympiad in Informatics (IOI).",
          icon: "images/icon/posn.png",
          competitions: [
            { year: "2026", round: "Camp #1 Selection", award: "✔️ PASS" },
            { year: "2026", round: "Camp #2 Selection", award: "Pending..." }
          ],
          images: ["images/certificates/posn1.jpg"]
        }
      ]
    },

    {
      id: "stage-future",
      title: "What awaits me in the future ?",
      subtitle: "Future Aspirations & Cosmic Horizon",
      theme: "space",
      costume: "astronaut",
      palette: {
        skyTop: "#030014",
        skyBottom: "#190028",
        ground: "#0e0926",
        accent: "#facc15"
      },
      description: "The future is uncertain. Goals are meant to be crushed, and success is only for people who never give up. AI is changing the world so fast that sometimes I'm not even sure which way my future is going.",
      items: [
        //  {
        //  id: "future-interest",
        //  title: "Current interest",
        //  desc: "Areas I am currently studying, learning, and expanding my focus on.",
        //  icon: "images/icon/interest.png",
        //  competitions: [
        //    { year: "2026", course: "C++ Coding" },
        //    { year: "2026", course: "" }
        //  ],
        //  images: ["images/certificates/future1.jpg", "images/certificates/future2.jpg", "images/certificates/future3.jpg", "images/certificates/future3.jpg"]
        // },
        {
          id: "future-aspire",
          title: "Future Aspirations",
          desc: "Whatever happens in the future happens, and nobody knows what it will be. But at least I have a plan for it.",
          icon: "images/icon/future.png",
          competitions: [
            { year: "2028", course: "Aspire to receive the ASEAN Scholarship to study in Singapore high school" },
            { year: "2031", course: "Planning to study at NTU or NUS on an ASEAN Scholarship" }
          ],
          images: ["images/certificates/future1.jpg", "images/certificates/future2.jpg", "images/certificates/future3.jpg", "images/certificates/future3.jpg"]
        },
        {
          id: "future-contact",
          title: "Contact & Collaborate with Me",
          icon: "images/icon/contact.png",
          action: "open_contact"
        }
      ]
    }
  ]
};
