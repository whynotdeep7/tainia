// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        setupFormValidation();
        setupFormSubmission();
    }
    
    setupChatButton();
    setupFAQInteractions();
}

function setupFormValidation() {
    const form = document.getElementById('contactForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Real-time validation
    firstName.addEventListener('blur', () => validateName(firstName, 'firstNameError', 'First name'));
    lastName.addEventListener('blur', () => validateName(lastName, 'lastNameError', 'Last name'));
    email.addEventListener('blur', () => validateContactEmail(email));
    phone.addEventListener('blur', () => validatePhone(phone));
    subject.addEventListener('change', () => validateSubject(subject));
    message.addEventListener('blur', () => validateMessage(message));

    // Clear errors on input
    [firstName, lastName, email, phone, subject, message].forEach(input => {
        input.addEventListener('input', () => FormValidator.clearError(input));
    });
}

function setupFormSubmission() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleContactFormSubmit);
}

function validateName(input, errorId, fieldName) {
    const name = input.value.trim();
    
    if (!name) {
        FormValidator.showError(input, `${fieldName} is required`);
        return false;
    }
    
    if (name.length < 2) {
        FormValidator.showError(input, `${fieldName} must be at least 2 characters`);
        return false;
    }
    
    if (!FormValidator.validateName(name)) {
        FormValidator.showError(input, `${fieldName} should only contain letters and spaces`);
        return false;
    }
    
    FormValidator.clearError(input);
    return true;
}

function validateContactEmail(emailInput) {
    const email = emailInput.value.trim();
    
    if (!email) {
        FormValidator.showError(emailInput, 'Email address is required');
        return false;
    }
    
    if (!FormValidator.validateEmail(email)) {
        FormValidator.showError(emailInput, 'Please enter a valid email address');
        return false;
    }
    
    FormValidator.clearError(emailInput);
    return true;
}

function validatePhone(phoneInput) {
    const phone = phoneInput.value.trim();
    
    // Phone is optional, so only validate if provided
    if (phone && phone.length > 0) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
            FormValidator.showError(phoneInput, 'Please enter a valid phone number');
            return false;
        }
    }
    
    FormValidator.clearError(phoneInput);
    return true;
}

function validateSubject(subjectInput) {
    const subject = subjectInput.value;
    
    if (!subject) {
        FormValidator.showError(subjectInput, 'Please select a subject');
        return false;
    }
    
    FormValidator.clearError(subjectInput);
    return true;
}

function validateMessage(messageInput) {
    const message = messageInput.value.trim();
    
    if (!message) {
        FormValidator.showError(messageInput, 'Message is required');
        return false;
    }
    
    if (message.length < 10) {
        FormValidator.showError(messageInput, 'Message must be at least 10 characters');
        return false;
    }
    
    if (message.length > 1000) {
        FormValidator.showError(messageInput, 'Message must be less than 1000 characters');
        return false;
    }
    
    FormValidator.clearError(messageInput);
    return true;
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const newsletter = document.getElementById('newsletter');
    
    // Validate all fields
    const isFirstNameValid = validateName(firstName, 'firstNameError', 'First name');
    const isLastNameValid = validateName(lastName, 'lastNameError', 'Last name');
    const isEmailValid = validateContactEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isSubjectValid = validateSubject(subject);
    const isMessageValid = validateMessage(message);
    
    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || 
        !isPhoneValid || !isSubjectValid || !isMessageValid) {
        return;
    }
    
    // Collect form data
    const formData = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        subject: subject.value,
        message: message.value.trim(),
        newsletter: newsletter.checked,
        timestamp: new Date().toISOString()
    };
    
    // Simulate form submission
    submitContactForm(formData);
}

function submitContactForm(formData) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real app, this would be sent to a server
        console.log('Contact form submitted:', formData);
        
        // Save to localStorage for demo purposes
        const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        contacts.push(formData);
        localStorage.setItem('contactSubmissions', JSON.stringify(contacts));
        
        // Show success message
        showContactSuccess();
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

function showContactSuccess() {
    const successModal = document.createElement('div');
    successModal.className = 'contact-success-modal';
    successModal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h2>Message Sent Successfully!</h2>
            <p>Thank you for contacting us. We've received your message and will get back to you within 24 hours.</p>
            <button class="close-success" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    const successStyles = document.createElement('style');
    successStyles.textContent = `
        .contact-success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .contact-success-modal .success-content {
            background: white;
            border-radius: 16px;
            padding: 3rem;
            text-align: center;
            max-width: 400px;
            animation: bounceIn 0.6s ease-out;
        }
        
        .contact-success-modal .success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--extra-color-1), var(--extra-color-2));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            color: white;
            margin: 0 auto 1.5rem;
        }
        
        .contact-success-modal h2 {
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .contact-success-modal p {
            color: var(--dark-gray);
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        
        .close-success {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
        }
        
        .close-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(6, 82, 221, 0.3);
        }
    `;
    
    document.head.appendChild(successStyles);
    document.body.appendChild(successModal);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (successModal.parentElement) {
            successModal.remove();
            successStyles.remove();
        }
    }, 5000);
}

function setupChatButton() {
    const chatButton = document.querySelector('.chat-button');
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            showChatModal();
        });
    }
}

function showChatModal() {
    const chatModal = document.createElement('div');
    chatModal.className = 'chat-modal';
    chatModal.innerHTML = `
        <div class="chat-content">
            <div class="chat-header">
                <h3>Live Chat Support</h3>
                <button class="close-chat">&times;</button>
            </div>
            <div class="chat-body">
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot-message">
                        <div class="message-content">
                            <p>Hello! 👋 Welcome to Tainía support. How can I help you today?</p>
                        </div>
                        <div class="message-time">Just now</div>
                    </div>
                </div>
                <div class="chat-input-container">
                    <input type="text" id="chatInput" placeholder="Type your message..." class="chat-input">
                    <button id="sendMessage" class="send-btn">Send</button>
                </div>
            </div>
        </div>
    `;
    
    const chatStyles = document.createElement('style');
    chatStyles.textContent = `
        .chat-modal {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInUp 0.3s ease-out;
            display: flex;
            flex-direction: column;
        }
        
        .chat-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 1rem;
            border-radius: 16px 16px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chat-header h3 {
            margin: 0;
            font-size: 1.1rem;
        }
        
        .close-chat {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: var(--transition);
        }
        
        .close-chat:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .chat-body {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .chat-messages {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
            max-height: 350px;
        }
        
        .message {
            margin-bottom: 1rem;
        }
        
        .message-content {
            padding: 0.75rem 1rem;
            border-radius: 12px;
            max-width: 80%;
        }
        
        .bot-message .message-content {
            background: #f1f3f4;
            color: var(--text-dark);
        }
        
        .user-message {
            text-align: right;
        }
        
        .user-message .message-content {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            margin-left: auto;
        }
        
        .message-time {
            font-size: 0.75rem;
            color: var(--dark-gray);
            margin-top: 0.25rem;
        }
        
        .user-message .message-time {
            text-align: right;
        }
        
        .chat-input-container {
            display: flex;
            padding: 1rem;
            border-top: 1px solid #eee;
            gap: 0.5rem;
        }
        
        .chat-input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
            font-size: 0.9rem;
        }
        
        .chat-input:focus {
            border-color: var(--primary-color);
        }
        
        .send-btn {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            padding: 0.75rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
        }
        
        .send-btn:hover {
            transform: scale(1.05);
        }
        
        @keyframes slideInUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 480px) {
            .chat-modal {
                bottom: 0;
                right: 0;
                width: 100%;
                height: 100%;
                border-radius: 0;
            }
            
            .chat-header {
                border-radius: 0;
            }
        }
    `;
    
    document.head.appendChild(chatStyles);
    document.body.appendChild(chatModal);
    
    // Setup chat functionality
    setupChatFunctionality(chatModal, chatStyles);
}

function setupChatFunctionality(chatModal, chatStyles) {
    const closeBtn = chatModal.querySelector('.close-chat');
    const chatInput = chatModal.querySelector('#chatInput');
    const sendBtn = chatModal.querySelector('#sendMessage');
    const messagesContainer = chatModal.querySelector('#chatMessages');
    
    closeBtn.addEventListener('click', () => {
        chatModal.remove();
        chatStyles.remove();
    });
    
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    };
    
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
            <div class="message-time">Just now</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('booking') || message.includes('ticket')) {
            return "I can help you with booking issues! Please provide your booking ID or tell me more about the problem you're experiencing.";
        } else if (message.includes('payment') || message.includes('refund')) {
            return "For payment and refund inquiries, I'll connect you with our billing team. Can you provide more details about your payment issue?";
        } else if (message.includes('movie') || message.includes('showtime')) {
            return "Looking for movie information? You can browse our current movies on the Movies page. Is there a specific movie you're interested in?";
        } else if (message.includes('account') || message.includes('login')) {
            return "Having trouble with your account? I can help you with login issues, password resets, or account settings. What specific problem are you facing?";
        } else if (message.includes('help') || message.includes('support')) {
            return "I'm here to help! Common topics include: booking tickets, account issues, payment problems, and movie information. What would you like assistance with?";
        } else {
            return "Thank you for your message! For detailed assistance, please contact our support team at support@tainia.com or call +1 (234) 567-8900. How else can I help you today?";
        }
    }
}

function setupFAQInteractions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in-up');
        
        item.addEventListener('click', () => {
            item.style.transform = item.style.transform === 'scale(1.02)' ? 'scale(1)' : 'scale(1.02)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateName,
        validateContactEmail,
        validatePhone,
        validateSubject,
        validateMessage,
        showContactSuccess
    };
}