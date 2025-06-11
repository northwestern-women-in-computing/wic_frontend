-- Insert sample sponsors
INSERT INTO sponsors (name, logo_url, website_url, tier, description) VALUES
('Microsoft', '/placeholder.svg?height=100&width=200', 'https://microsoft.com', 'Platinum', 'Leading technology company supporting women in tech through mentorship and career opportunities.'),
('Google', '/placeholder.svg?height=100&width=200', 'https://google.com', 'Platinum', 'Empowering the next generation of women technologists through innovative programs and resources.'),
('Meta', '/placeholder.svg?height=100&width=200', 'https://meta.com', 'Gold', 'Building the future of social technology while fostering diversity and inclusion in engineering.'),
('Apple', '/placeholder.svg?height=100&width=200', 'https://apple.com', 'Gold', 'Creating innovative products while championing equality and opportunity for all.'),
('Amazon', '/placeholder.svg?height=100&width=200', 'https://amazon.com', 'Silver', 'Committed to building a diverse and inclusive workplace in technology and beyond.'),
('Salesforce', '/placeholder.svg?height=100&width=200', 'https://salesforce.com', 'Silver', 'Driving equality and empowerment for women in technology through various initiatives.');

-- Insert sample exec board members
INSERT INTO exec_board (name, position, bio, image_url, email, linkedin_url, year, major, display_order) VALUES
('Sarah Johnson', 'President', 'Computer Science major passionate about increasing diversity in tech. Previously interned at Google and Microsoft.', '/placeholder.svg?height=300&width=300', 'sarah.johnson@northwestern.edu', 'https://linkedin.com/in/sarahjohnson', 'Senior', 'Computer Science', 1),
('Emily Chen', 'Vice President', 'Data Science enthusiast with experience in machine learning and AI. Advocates for women in STEM education.', '/placeholder.svg?height=300&width=300', 'emily.chen@northwestern.edu', 'https://linkedin.com/in/emilychen', 'Junior', 'Data Science', 2),
('Maya Patel', 'Secretary', 'Software engineering student with a focus on web development and user experience design.', '/placeholder.svg?height=300&width=300', 'maya.patel@northwestern.edu', 'https://linkedin.com/in/mayapatel', 'Sophomore', 'Computer Science', 3),
('Jessica Rodriguez', 'Treasurer', 'Information Systems major with expertise in cybersecurity and financial technology.', '/placeholder.svg?height=300&width=300', 'jessica.rodriguez@northwestern.edu', 'https://linkedin.com/in/jessicarodriguez', 'Junior', 'Information Systems', 4),
('Amanda Kim', 'Events Coordinator', 'Computer Engineering student passionate about organizing tech talks and networking events.', '/placeholder.svg?height=300&width=300', 'amanda.kim@northwestern.edu', 'https://linkedin.com/in/amandakim', 'Sophomore', 'Computer Engineering', 5),
('Rachel Thompson', 'Outreach Director', 'Biomedical Engineering major bridging the gap between technology and healthcare innovation.', '/placeholder.svg?height=300&width=300', 'rachel.thompson@northwestern.edu', 'https://linkedin.com/in/rachelthompson', 'Senior', 'Biomedical Engineering', 6);

-- Insert sample events
INSERT INTO events (title, description, date, time, location, points) VALUES
('Tech Talk: Women Leaders in AI', 'Join us for an inspiring talk with women leaders from top AI companies discussing their career journeys and the future of artificial intelligence.', '2024-02-15', '18:00', 'Tech Building Room 101', 10),
('Coding Workshop: Web Development', 'Hands-on workshop covering HTML, CSS, and JavaScript fundamentals. Perfect for beginners!', '2024-02-22', '19:00', 'Computer Lab A', 15),
('Networking Night with Industry Professionals', 'Connect with alumni and industry professionals over dinner and meaningful conversations about career paths in tech.', '2024-03-01', '18:30', 'University Center', 20),
('Hackathon: Women in Tech Challenge', '24-hour hackathon focused on creating solutions that empower women in technology. Prizes and mentorship included!', '2024-03-15', '09:00', 'Innovation Hub', 50),
('Resume Review and Interview Prep', 'Get your resume reviewed by industry professionals and practice technical interviews in a supportive environment.', '2024-03-22', '17:00', 'Career Services Center', 10),
('Panel: Entrepreneurship in Tech', 'Hear from successful women entrepreneurs about starting tech companies, securing funding, and building diverse teams.', '2024-04-05', '18:00', 'Auditorium B', 15);

-- Insert sample member (password would be hashed in real implementation)
INSERT INTO members (email, password_hash, first_name, last_name, year, major, points) VALUES
('demo@northwestern.edu', '$2b$10$example_hash_here', 'Demo', 'User', 'Junior', 'Computer Science', 45);
