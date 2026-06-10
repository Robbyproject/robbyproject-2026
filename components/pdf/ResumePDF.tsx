"use client";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

// --- DATA CV (Updated: Design & Front-End Focus) ---
const data = {
  name: "ROBBY FABIAN",
  role: "Graphic Designer & Front-End Developer",
  email: "robbyfabian20@gmail.com",
  location: "Jakarta, Indonesia",
  links: [
    { text: "linkedin.com/in/robby-fabian", url: "https://linkedin.com/in/robby-fabian" },
    { text: "behance.net/robby-fabian", url: "https://behance.net/robby-fabian" } // Diganti ke Behance agar relevan dengan desain
  ],
  summary: "Graphic Designer dan Front-End Developer dengan fokus pada penciptaan antarmuka digital yang estetis dan fungsional. Menggabungkan kreativitas desain visual dengan keahlian teknis menggunakan React dan Tailwind CSS untuk membangun pengalaman pengguna yang responsif dan menarik.",
  
  experience: [
    {
      role: "UI/UX Designer Intern",
      company: "Disinfolahtaau",
      date: "Jul 2024 - Des 2024",
      points: [
        "Merancang antarmuka pengguna (UI) yang modern dan intuitif untuk sistem internal.",
        "Membuat wireframe dan high-fidelity prototype menggunakan Figma.",
        "Berkolaborasi dengan tim teknis untuk memastikan implementasi desain yang akurat."
      ]
    },
    {
      role: "IT Support Intern",
      company: "Disinfolahtaau",
      date: "Jul 2024 - Des 2024",
      points: [
        "Mendukung operasional teknis dan pemeliharaan perangkat lunak desain.",
        "Membantu dokumentasi teknis dan visualisasi data organisasi."
      ]
    }
  ],

  education: [
    {
      degree: "S1 Ilmu Komputer",
      school: "Cakrawala University",
      date: "2025 - Sekarang",
      desc: "Fokus pada Desain Interaksi dan Pengembangan Web."
    },
    {
      degree: "Rekayasa Perangkat Lunak",
      school: "SMK Prestasi Prima",
      date: "2022 - 2025",
      desc: "Spesialisasi dalam Front-End Web Development."
    }
  ],

  // SKILLS DIPISAH AGAR RAPI (2 KOLOM)
  designSkills: [
    "Adobe Photoshop",
    "Figma",
    "Adobe Illustrator", // Opsional, relevan untuk graphic design
    "UI/UX Design"
  ],
  devSkills: [
    "HTML5 & CSS3",
    "JavaScript",
    "React.js",
    "Next.js",
    "Tailwind CSS"
  ],

  certificates: [
    { title: "UI/UX Essentials", issuer: "Udemy", date: "2024" }, // Contoh disesuaikan
    { title: "Front-End Web Dev", issuer: "Dicoding", date: "2024" }
  ]
};

// --- STYLING ---
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#222",
  },
  
  // Header
  headerContainer: { alignItems: "center", marginBottom: 15 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 4, textTransform: "uppercase" },
  role: { fontSize: 11, marginBottom: 4, color: "#444", textTransform: "uppercase", letterSpacing: 1 },
  contactLine: { flexDirection: "row", gap: 5, fontSize: 9, color: "#555", marginBottom: 2 },
  link: { color: "#555", textDecoration: "none" },

  // Sections
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 8, marginTop: 12, color: "#000", textTransform: "uppercase", borderBottomWidth: 1, borderBottomColor: "#ddd", paddingBottom: 2 },
  
  // Summary
  summaryText: { textAlign: "center", fontSize: 10, color: "#333", marginBottom: 10 },

  // Items
  itemContainer: { marginBottom: 10 },
  itemHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 2 },
  itemTitle: { fontSize: 11, fontWeight: "bold", color: "#000" },
  itemDate: { fontSize: 9, color: "#666", textAlign: "right" },
  itemCompany: { fontSize: 10, color: "#444", marginBottom: 3, fontStyle: "italic" },

  // Bullet Points Standard
  bulletPoint: { flexDirection: "row", marginBottom: 2, paddingLeft: 5 },
  bulletDot: { width: 10, fontSize: 10 },
  bulletText: { flex: 1, fontSize: 10, color: "#333" },

  // Skills Layout (Grid 2 Kolom)
  skillsContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
  skillColumn: { width: "48%" },
  skillCategoryTitle: { fontSize: 10, fontWeight: "bold", marginBottom: 4, color: "#444", textDecoration: "underline" },
  skillItem: { fontSize: 10, marginBottom: 2, color: "#333" },
});

const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* 1. HEADER */}
      <View style={styles.headerContainer}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.role}>{data.role}</Text>
        <View style={styles.contactLine}>
          <Link src={`mailto:${data.email}`} style={styles.link}>{data.email}</Link>
          <Text> | </Text>
          <Text>{data.location}</Text>
        </View>
        <View style={styles.contactLine}>
          {data.links.map((link, index) => (
            <Text key={index}>
              <Link src={link.url} style={styles.link}>{link.text}</Link>
              {index < data.links.length - 1 ? " | " : ""}
            </Text>
          ))}
        </View>
      </View>

      {/* 2. SUMMARY */}
      <View>
        <Text style={styles.summaryText}>{data.summary}</Text>
      </View>

      

      {/* 4. PENGALAMAN KERJA */}
      <View>
        <Text style={styles.sectionTitle}>Pengalaman Kerja</Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={styles.itemContainer}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{exp.role}</Text>
              <Text style={styles.itemDate}>{exp.date}</Text>
            </View>
            <Text style={styles.itemCompany}>{exp.company}</Text>
            {exp.points.map((point, idx) => (
              <View key={idx} style={styles.bulletPoint}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{point}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* 5. PENDIDIKAN */}
      <View>
        <Text style={styles.sectionTitle}>Pendidikan</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={styles.itemContainer}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{edu.school}</Text>
              <Text style={styles.itemDate}>{edu.date}</Text>
            </View>
            <Text style={styles.itemCompany}>{edu.degree}</Text>
            <Text style={{ fontSize: 10, color: "#333", marginLeft: 10 }}>{edu.desc}</Text>
          </View>
        ))}
      </View>

      {/* 3. KEAHLIAN (SKILLS) - DIBUAT 2 KOLOM RAPI */}
      <View>
        <Text style={styles.sectionTitle}>Keahlian & Tools</Text>
        <View style={styles.skillsContainer}>
            {/* Kolom Kiri: Design */}
            <View style={styles.skillColumn}>
                <Text style={styles.skillCategoryTitle}>Design Tools</Text>
                {data.designSkills.map((skill, i) => (
                    <Text key={i} style={styles.skillItem}>• {skill}</Text>
                ))}
            </View>
            {/* Kolom Kanan: Development */}
            <View style={styles.skillColumn}>
                <Text style={styles.skillCategoryTitle}>Front-End Development</Text>
                {data.devSkills.map((skill, i) => (
                    <Text key={i} style={styles.skillItem}>• {skill}</Text>
                ))}
            </View>
        </View>
      </View>

    </Page>
  </Document>
);

export default ResumePDF;