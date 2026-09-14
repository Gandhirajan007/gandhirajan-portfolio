import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

def build_pdf():
    os.makedirs('resume', exist_ok=True)
    os.makedirs('assets', exist_ok=True)

    pdf_filename = 'resume/Gandhi_Rajan_Resume.pdf'

    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=45,
        leftMargin=45,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    primary_color = colors.HexColor('#0F172A')
    accent_color = colors.HexColor('#0284C7')
    text_dark = colors.HexColor('#334155')
    divider_color = colors.HexColor('#CBD5E1')

    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=primary_color,
        alignment=TA_CENTER
    )

    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=accent_color,
        alignment=TA_CENTER
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_dark,
        alignment=TA_CENTER
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=primary_color,
        spaceAfter=3,
        spaceBefore=6
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_dark,
        alignment=TA_JUSTIFY
    )

    item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=primary_color
    )

    story = []

    # Header
    story.append(Paragraph('GANDHI RAJAN S', name_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('B.Tech Information Technology Student &nbsp;|&nbsp; Full-Stack Developer', title_style))
    story.append(Spacer(1, 5))
    story.append(Paragraph('Email: gandhirajan.dev@gmail.com &nbsp;&bull;&nbsp; Phone: +91 98765 43210 &nbsp;&bull;&nbsp; Location: Tamil Nadu, India', contact_style))
    story.append(Paragraph('GitHub &nbsp;&bull;&nbsp; LinkedIn &nbsp;&bull;&nbsp; LeetCode &nbsp;&bull;&nbsp; HackerRank', contact_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width='100%', thickness=1.5, color=accent_color, spaceBefore=0, spaceAfter=8))

    # Summary
    story.append(Paragraph('PROFESSIONAL SUMMARY', section_heading))
    story.append(HRFlowable(width='100%', thickness=0.5, color=divider_color, spaceBefore=2, spaceAfter=6))
    summary_text = ('Dedicated B.Tech Information Technology student and aspiring Full-Stack Developer focused on '
                    'building modern web applications, responsive user interfaces, REST APIs, and database architecture. '
                    'Proficient in JavaScript, React, Node.js, Java, Python, and modern databases (MySQL & MongoDB), '
                    'with a commitment to writing clean, maintainable code and delivering impactful digital solutions.')
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 8))

    # Education
    story.append(Paragraph('EDUCATION', section_heading))
    story.append(HRFlowable(width='100%', thickness=0.5, color=divider_color, spaceBefore=2, spaceAfter=6))
    edu_title = Paragraph('<b>Bachelor of Technology (B.Tech) in Information Technology</b>', item_title)
    edu_desc = Paragraph('Academic focus on software engineering, web application development, data structures, and database management systems.', body_style)
    story.append(edu_title)
    story.append(Spacer(1, 2))
    story.append(edu_desc)
    story.append(Spacer(1, 8))

    # Technical Skills
    story.append(Paragraph('TECHNICAL SKILLS', section_heading))
    story.append(HRFlowable(width='100%', thickness=0.5, color=divider_color, spaceBefore=2, spaceAfter=6))

    skills_data = [
        [Paragraph('<b>Programming Languages:</b>', item_title), Paragraph('Java, Python, C, JavaScript', body_style)],
        [Paragraph('<b>Frontend Development:</b>', item_title), Paragraph('HTML5, CSS3, JavaScript, React, Bootstrap, Tailwind CSS', body_style)],
        [Paragraph('<b>Backend & Databases:</b>', item_title), Paragraph('Node.js, Express.js, MySQL, SQLite, MongoDB, REST APIs', body_style)],
        [Paragraph('<b>Tools & Platforms:</b>', item_title), Paragraph('Git, GitHub, VS Code', body_style)]
    ]

    skills_table = Table(skills_data, colWidths=[150, 370])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 8))

    # Key Projects
    story.append(Paragraph('KEY PROJECTS', section_heading))
    story.append(HRFlowable(width='100%', thickness=0.5, color=divider_color, spaceBefore=2, spaceAfter=6))

    projects = [
        ('Personal Portfolio Website', 'HTML5, CSS3, JavaScript',
         'Designed and developed a modern, responsive developer portfolio featuring dark glassmorphism design, particle animations, interactive UI components, and smooth navigation.'),
        ('Inventory Management System', 'React, Node.js, MySQL',
         'Built a full-featured inventory tracking system supporting complete CRUD operations, real-time stock alert monitoring, analytics reporting, and database management.'),
        ('Real-Time Task Management Dashboard', 'React, Node.js, MongoDB',
         'Created a collaborative task management platform with real-time status updates, kanban drag-and-drop workflow boards, and secure JWT user authentication.'),
        ('Micro-Blogging Application', 'React, Firebase, Tailwind CSS',
         'Developed a lightweight social platform for short-form content featuring real-time feed updates, user authentication, and a responsive mobile-first interface.')
    ]

    for p_name, p_tech, p_desc in projects:
        p_header = f'<b>{p_name}</b> &nbsp;|&nbsp; <font color="#0284C7"><i>{p_tech}</i></font>'
        story.append(Paragraph(p_header, item_title))
        story.append(Spacer(1, 2))
        story.append(Paragraph(f'&bull; {p_desc}', body_style))
        story.append(Spacer(1, 5))

    story.append(Spacer(1, 3))

    # Certifications & Achievements
    story.append(Paragraph('CERTIFICATIONS & ACHIEVEMENTS', section_heading))
    story.append(HRFlowable(width='100%', thickness=0.5, color=divider_color, spaceBefore=2, spaceAfter=6))

    certs = [
        ('Python for Data Science (Certification)', 'Comprehensive coverage of data analysis, visualization, and machine learning fundamentals with Python.'),
        ('Open Source Contributor (Achievement)', 'Active open-source contributor delivering bug fixes and feature additions to community repositories on GitHub.')
    ]

    for c_title, c_desc in certs:
        story.append(Paragraph(f'<b>{c_title}</b>', item_title))
        story.append(Spacer(1, 2))
        story.append(Paragraph(f'&bull; {c_desc}', body_style))
        story.append(Spacer(1, 4))

    doc.build(story)

    # Copy to assets/resume.pdf as well for backup compatibility
    shutil.copyfile(pdf_filename, 'assets/resume.pdf')
    print('PDF generated successfully at resume/Gandhi_Rajan_Resume.pdf!')

if __name__ == '__main__':
    build_pdf()
