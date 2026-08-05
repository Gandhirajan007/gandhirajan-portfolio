import http.server
import socketserver
import json
import os
import urllib.parse

PORT = 8000
SUBMISSIONS_FILE = 'submissions.json'

class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/contact':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                # Parse data
                data = json.loads(post_data.decode('utf-8'))
                name = data.get('name', '').strip()
                email = data.get('email', '').strip()
                message = data.get('message', '').strip()
                
                if not name or not email or not message:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'All fields are required.'}).encode('utf-8'))
                    return
                
                # Load existing submissions
                submissions = []
                if os.path.exists(SUBMISSIONS_FILE):
                    try:
                        with open(SUBMISSIONS_FILE, 'r', encoding='utf-8') as f:
                            submissions = json.load(f)
                            if not isinstance(submissions, list):
                                submissions = []
                    except Exception:
                        submissions = []
                
                # Append new submission
                new_submission = {
                    'name': name,
                    'email': email,
                    'message': message,
                    'timestamp': self.log_date_time_string()
                }
                submissions.append(new_submission)
                
                # Save submissions
                with open(SUBMISSIONS_FILE, 'w', encoding='utf-8') as f:
                    json.dump(submissions, f, indent=4, ensure_ascii=False)
                
                # Respond success
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'success': True, 'message': 'Submission saved successfully!'}).encode('utf-8'))
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    # Ensure standard static files are handled by the handler
    # SimpleHTTPRequestHandler defaults to serving files in the current working directory
    handler = PortfolioHandler
    
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Portfolio server running at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
