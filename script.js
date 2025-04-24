// Component UI definitions
const componentUITemplates = {
  button: '<div class="ui-button">Click Me</div>',
  image:
    '<div class="ui-image">  <img src="https://images.unsplash.com/photo-1742845918430-c6093f93f740?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />  </div>',
  text: '<div class="ui-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nulla eget eleifend.</div>',
  form: '<div class="ui-form"><input type="text" placeholder="Name"><input type="email" placeholder="Email"></div>',
  card: '<div class="ui-card"><h3>Card Title</h3><p>This is a card component with some content.</p></div>',
};

// Get DOM elements
const dragComponents = document.querySelectorAll('.drag-component');
const dropZone = document.querySelector('.drop-zone');
const resetButton = document.getElementById('resetButton');

// Add event listeners for draggable components
dragComponents.forEach((component) => {
  // When drag starts
  component.addEventListener('dragstart', (e) => {
    component.classList.add('dragging');

    // Set the drag data - we'll transfer the component type
    e.dataTransfer.setData(
      'text/plain',
      component.getAttribute('data-component-type')
    );    
  });

  // When drag ends
  component.addEventListener('dragend', (e) => {
    component.classList.remove('dragging');
  });
});

// Add event listeners for drop zone
// When a draggable element enters the drop zone
dropZone.addEventListener('dragenter', (e) => {
  dropZone.classList.add('drop-zone-hover');
});

// When draggable element is over the drop zone
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault(); // Necessary to allow dropping
});

// When a draggable element leaves the drop zone
dropZone.addEventListener('dragleave', (e) => {
  dropZone.classList.remove('drop-zone-hover');
});

// When an element is dropped in the drop zone
dropZone.addEventListener('drop', (e) => {
  dropZone.classList.remove('drop-zone-hover');

  // Clear placeholder text if it's the first component
  if (dropZone.querySelector('div[style*="color: #666"]')) {
    dropZone.innerHTML = '';
  }

  // Get the component type
  const componentType = e.dataTransfer.getData('text/plain');  
  if (componentType in componentUITemplates) {
    // Create the component UI based on its type
    const componentUI = document.createElement('div');
    componentUI.innerHTML = componentUITemplates[componentType];

    // Add the component to the drop zone
    dropZone.appendChild(componentUI.firstChild);
  }
});

// Reset button functionality
resetButton.addEventListener('click', () => {
  // Clear drop zone and add placeholder
  dropZone.innerHTML =
    '<div style="color: #666; text-align: center; width: 100%; margin-top: 150px;">Drag components here to build your UI</div>';
});
