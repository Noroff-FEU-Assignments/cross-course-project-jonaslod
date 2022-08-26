export default function showError(error, container){
    container.innerHTML = `
        <div>
            <h2>An error occurred</h2>
            <p><span class="bold">Error:</span> <span class="italic">${error}</span></p>
        </div>
    `;
}