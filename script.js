// DOM Elements
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        const progressBar = document.getElementById('progressBar');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinksContainer = document.getElementById('navLinks');
        const loginForm = document.getElementById('loginForm');
        const loginBtn = document.getElementById('loginBtn');
        const loginSpinner = document.getElementById('loginSpinner');
        const startJourneyBtn = document.getElementById('startJourneyBtn');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        const signupLink = document.getElementById('signupLink');
        const toast = document.getElementById('toast');

        // Settings Elements
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsContent = document.getElementById('settingsContent');
        const themeToggle = document.getElementById('themeToggle');

        // Chatbot Elements
        const chatbotToggle = document.getElementById('chatbotToggle');
        const chatbotWindow = document.getElementById('chatbotWindow');
        const closeChatbot = document.getElementById('closeChatbot');
        const chatbotMessages = document.getElementById('chatbotMessages');
        const chatbotInput = document.getElementById('chatbotInput');
        const sendMessage = document.getElementById('sendMessage');

        // Scanner Elements
        const scannerVideo = document.getElementById('scannerVideo');
        const scannerOverlay = document.getElementById('scannerOverlay');
        const startScannerBtn = document.getElementById('startScannerBtn');
        const pauseScannerBtn = document.getElementById('pauseScannerBtn');
        const resetScannerBtn = document.getElementById('resetScannerBtn');
        const scannerResults = document.getElementById('scannerResults');
        const analysisResults = document.getElementById('analysisResults');

        // Theme Management
        function initializeTheme() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            themeToggle.checked = savedTheme === 'light';
        }

        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.checked = newTheme === 'light';
            showToast(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode activated`);
        }

        // Settings Dropdown
        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsContent.classList.toggle('show');
        });

        // Close settings when clicking outside
        document.addEventListener('click', () => {
            settingsContent.classList.remove('show');
        });

        // Theme Toggle
        themeToggle.addEventListener('change', toggleTheme);

        // Page Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
                
                // Hide all pages
                pages.forEach(page => page.classList.remove('active'));
                
                // Show target page
                document.getElementById(targetPage).classList.add('active');
                
                // Close mobile menu if open
                navLinksContainer.classList.remove('active');
                
                // Show loading progress
                simulateProgress();
            });
        });

        // Mobile Menu Toggle
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        // Login Form Submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading spinner
            loginBtn.style.display = 'none';
            loginSpinner.style.display = 'block';
            
            // Simulate API call
            setTimeout(() => {
                // Hide loading spinner
                loginBtn.style.display = 'inline-block';
                loginSpinner.style.display = 'none';
                
                // Show success message
                showToast('Login successful! Redirecting...', 'success');
                
                // Redirect to home page after delay
                setTimeout(() => {
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    document.querySelector('[data-page="home"]').classList.add('active');
                    
                    pages.forEach(page => page.classList.remove('active'));
                    document.getElementById('home').classList.add('active');
                }, 2000);
            }, 2000);
        });

        // Start Journey Button
        startJourneyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Starting your fitness journey!', 'success');
            
            // Navigate to login page after delay
            setTimeout(() => {
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                document.querySelector('[data-page="login"]').classList.add('active');
                
                pages.forEach(page => page.classList.remove('active'));
                document.getElementById('login').classList.add('active');
            }, 1500);
        });

        // Forgot Password Link
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Password reset instructions sent to your email!', 'success');
        });

        // Signup Link
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Redirecting to signup page...', 'success');
        });

        // Chatbot Functionality
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.style.display = 'flex';
            chatbotToggle.classList.remove('pulse-animation');
        });

        closeChatbot.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
        });

        sendMessage.addEventListener('click', sendChatbotMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatbotMessage();
            }
        });

        function sendChatbotMessage() {
            const message = chatbotInput.value.trim();
            if (message === '') return;
            
            // Add user message
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message typing-indicator';
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            // Simulate AI response after delay
            setTimeout(() => {
                // Remove typing indicator
                chatbotMessages.removeChild(typingIndicator);
                
                // Add bot response
                const response = getBotResponse(message);
                addMessage(response, 'bot');
            }, 1500);
        }

        function addMessage(text, sender) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${sender}-message`;
            messageElement.textContent = text;
            chatbotMessages.appendChild(messageElement);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function getBotResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                return "Hello! How can I assist with your fitness goals today?";
            } else if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
                return "I can help you create a personalized workout plan. What are your fitness goals?";
            } else if (lowerMessage.includes('nutrition') || lowerMessage.includes('diet')) {
                return "Proper nutrition is key to fitness success. I can provide meal suggestions based on your goals.";
            } else if (lowerMessage.includes('form') || lowerMessage.includes('technique')) {
                return "Use our camera scanner to analyze your exercise form and get real-time feedback!";
            } else if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
                return "I can help track your progress and adjust your plan as you improve.";
            } else if (lowerMessage.includes('theme') || lowerMessage.includes('dark') || lowerMessage.includes('light')) {
                return "You can change between dark and light mode using the settings icon in the navigation bar!";
            } else {
                return "I'm here to help with your fitness journey! You can ask me about workouts, nutrition, form correction, or progress tracking.";
            }
        }

        // Camera Scanner Functionality
        let scannerActive = false;
        
        startScannerBtn.addEventListener('click', () => {
            if (!scannerActive) {
                startScanner();
            }
        });
        
        pauseScannerBtn.addEventListener('click', () => {
            if (scannerActive) {
                pauseScanner();
            }
        });
        
        resetScannerBtn.addEventListener('click', () => {
            resetScanner();
        });
        
        function startScanner() {
            scannerActive = true;
            scannerOverlay.style.display = 'none';
            startScannerBtn.style.display = 'none';
            pauseScannerBtn.style.display = 'inline-block';
            
            // Simulate camera activation
            scannerVideo.innerHTML = `
                <div style="width: 100%; height: 100%; background: linear-gradient(45deg, var(--color-dark-card), var(--color-dark-card)); 
                           display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <div class="pulse-animation" style="width: 100px; height: 100px; border: 2px solid var(--color-accent-orange); 
                           border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <i class="fas fa-dumbbell" style="font-size: 2em; color: var(--color-accent-orange);"></i>
                    </div>
                    <p>Analyzing your form...</p>
                </div>
            `;
            
            // Simulate analysis after delay
            setTimeout(() => {
                showAnalysisResults();
            }, 3000);
        }
        
        function pauseScanner() {
            scannerActive = false;
            pauseScannerBtn.style.display = 'none';
            startScannerBtn.style.display = 'inline-block';
            startScannerBtn.textContent = 'RESUME SCANNER';
            
            scannerVideo.innerHTML = `
                <div style="width: 100%; height: 100%; background: var(--color-dark-card); 
                           display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-pause" style="font-size: 3em; color: var(--color-accent-orange);"></i>
                </div>
            `;
        }
        
        function resetScanner() {
            scannerActive = false;
            scannerOverlay.style.display = 'flex';
            startScannerBtn.style.display = 'inline-block';
            startScannerBtn.textContent = 'START SCANNER';
            pauseScannerBtn.style.display = 'none';
            scannerResults.style.display = 'none';
            
            scannerVideo.innerHTML = `
                <i class="fas fa-camera" style="font-size: 3em;"></i>
            `;
        }
        
        function showAnalysisResults() {
            scannerResults.style.display = 'block';
            
            // Simulated analysis results
            analysisResults.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <h4 style="color: var(--color-accent-orange); margin-bottom: 5px;">Squat Analysis</h4>
                    <p><i class="fas fa-check" style="color: #33cc33;"></i> Good depth and back alignment</p>
                    <p><i class="fas fa-exclamation-triangle" style="color: #FFAA00;"></i> Knees slightly collapsing inward</p>
                    <p><i class="fas fa-times" style="color: #ff3333;"></i> Heels lifting off the ground</p>
                </div>
                <div>
                    <h4 style="color: var(--color-accent-orange); margin-bottom: 5px;">Recommendations</h4>
                    <ul style="padding-left: 20px;">
                        <li>Focus on pushing knees outward during descent</li>
                        <li>Practice with lighter weights to improve form</li>
                        <li>Consider mobility exercises for ankles</li>
                    </ul>
                </div>
            `;
            
            showToast('Form analysis complete! Check your results below.', 'success');
        }

        // Progress Bar Simulation
        function simulateProgress() {
            progressBar.style.width = '0%';
            
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        progressBar.style.width = '0%';
                    }, 500);
                } else {
                    width += 10;
                    progressBar.style.width = width + '%';
                }
            }, 50);
        }

        // Toast Notification Function
        function showToast(message, type = 'info') {
            toast.textContent = message;
            toast.className = 'toast';
            toast.classList.add(type);
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe feature cards for animation
        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });

        // Initialize theme on page load
        initializeTheme();
        
        // Initial progress bar
        simulateProgress();
        
        // Add subtle animation to gym posters
        const posters = document.querySelectorAll('.gym-poster');
        posters.forEach((poster, index) => {
            poster.style.animation = `float ${3 + index}s ease-in-out infinite alternate`;
        });
        
        // Add CSS for floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
                100% { transform: translateY(-10px) rotate(var(--rotation, 0deg)); }
            }
        `;
        document.head.appendChild(style);
        
        // Set custom rotation for each poster
        document.querySelector('.poster-1').style.setProperty('--rotation', '-5deg');
        document.querySelector('.poster-2').style.setProperty('--rotation', '3deg');
        document.querySelector('.poster-3').style.setProperty('--rotation', '-2deg');
