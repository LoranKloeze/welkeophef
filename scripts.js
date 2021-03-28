(() => {

  async function main() {
    const ophefjesJson = await (await window.fetch('/ophefjes.json')).json();
    const template = await (await window.fetch('/_article.html')).text();
    const ophefSectie = document.querySelector('section.opheffen');

    ophefjesJson.forEach(ophefData => {
      let ophefHtml = template;

      const datum = new Date(ophefData.datum)
      const weekdag = datum.toLocaleDateString('nl', {weekday: 'long'})
      const datumCijfers = datum.toLocaleDateString('nl', {day: '2-digit', month: '2-digit', year: 'numeric'})

      ophefHtml = ophefHtml.replace(/{{titel}}/g, ophefData.titel);
      ophefHtml = ophefHtml.replace(/{{inhoud}}/g, ophefData.inhoud);
      ophefHtml = ophefHtml.replace(/{{twitterLink}}/g, ophefData.twitterLink);
      ophefHtml = ophefHtml.replace(/{{twitterLabel}}/g, ophefData.twitterLabel);
      ophefHtml = ophefHtml.replace(/{{datumDag}}/g, weekdag);
      ophefHtml = ophefHtml.replace(/{{datumLeesbaar}}/g, datumCijfers);
      ophefHtml = ophefHtml.replace(/{{datumISO}}/g, datum.toISOString());

      ophefSectie.innerHTML += ophefHtml;
    });
  }

  window.addEventListener("DOMContentLoaded", main);
})();
