const data = window.portfolio;
const motifs = { molecule: '✳', chart: '↗', cells: '◎', community: '◌', bottle: '◉', document: '≋' };
const colors = { peach: '#f0d0bd', lavender: '#d9d5e7', sage: '#d8e0d2', blue: '#d1dce4', yellow: '#eddfb9', mint: '#d2e4db' };
const grid = document.querySelector('#project-grid');
const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function art(project, cls) { return `<div class="${cls}" style="--card-bg:${colors[project.color] || colors.sage}">${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} project image" loading="lazy">` : `<span class="motif ${escapeHtml(project.motif)}" aria-hidden="true">${motifs[project.motif] || '✳'}</span>`}</div>`; }
for (const p of data.projects) {
  const card = document.createElement('button'); card.type = 'button'; card.className = 'project-card';
  card.setAttribute('aria-label', `Read about ${p.title}`);
  card.innerHTML = `${art(p,'project-image').replace('class="project-image"', 'class="project-image"') .replace('>', `><span class="project-number">${escapeHtml(p.number)}</span>`)}<div class="project-info"><span class="project-category">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.summary)}</p><div class="card-bottom"><span>VIEW PROJECT</span><span aria-hidden="true">↗</span></div></div>`;
  card.addEventListener('click', () => {
    dialogContent.innerHTML = `${art(p,'dialog-art')}<div class="dialog-body"><span class="project-category">${escapeHtml(p.category)}</span><h2 id="dialog-title">${escapeHtml(p.title)}</h2><span class="project-context">${escapeHtml(p.context)}</span><p>${escapeHtml(p.overview)}</p><h3>What I worked on</h3><ul>${p.contributions.map(c => `<li>${escapeHtml(c)}</li>`).join('')}</ul>${p.note ? `<p><em>${escapeHtml(p.note)}</em></p>` : ''}<div class="dialog-tags">${p.tools.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div></div>`;
    dialog.showModal();
  });
  grid.append(card);
}
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
document.querySelector('#experience-list').innerHTML = data.experience.map(e => `<div class="experience-row"><time>${escapeHtml(e.years)}</time><div><h3>${escapeHtml(e.role)}</h3><strong>${escapeHtml(e.organization)}</strong></div><p>${escapeHtml(e.description)}</p><span class="arrow" aria-hidden="true">↗</span></div>`).join('');
const contact = document.querySelector('#contact-links');
const links = [['Email me', data.contact.email ? `mailto:${data.contact.email}` : ''], ['LinkedIn',data.contact.linkedin], ['GitHub',data.contact.github], ['Résumé',data.contact.resume]];
contact.innerHTML = links.filter(([,url]) => url).map(([label,url]) => `<a href="${escapeHtml(url)}" ${url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(label)} ↗</a>`).join('');
if (!contact.children.length) contact.innerHTML = '<span>Contact links coming soon</span>';
document.querySelector('#year').textContent = new Date().getFullYear();
const profile = document.querySelector('.about-photo');
const testImage = new Image(); testImage.onload = () => {profile.classList.add('has-photo');profile.style.backgroundImage = 'url("assets/profile.jpg")';profile.innerHTML = '';}; testImage.src = 'assets/profile.jpg';
const menu = document.querySelector('.menu-button'), nav = document.querySelector('.site-header nav');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu'); });
nav.addEventListener('click', e => { if (e.target.closest('a')) {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');} });
