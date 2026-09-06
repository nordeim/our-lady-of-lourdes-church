Key differences in the new src/: 
 
1. Design tokens completely changed: shrine-* (maroon/gold/parchment) → bsc-* (sapphire blue/gold/cream). The new palette reflects the blue tent roof. 
2. No test files: The new src/ has zero test files (no *.test.ts, *.test.tsx, or test/setup.ts). The old src.orig/ had 17 test files + setup. 
3. No useScrollSpy hook: The new src/ only has 2 hooks (useScrolled, useScrollProgress), missing useScrollSpy. 
4. Data changes: 
    - site.ts: Different structure (no whatsapp, sacredHearts, parishUpdates, chineseName, congregation fields; has fax, youtube, uen) 
    - content.ts: Different data (3 priests instead of 5, different ppcMembers, 7 timeline entries instead of 8, different ministries with community instead of mandarin, different givingOptions with UEN, 
      different images keys) 
    - nav.ts: Different descriptions and wording 
5. Different copy/tagline: "A Household of Faith, Hope & Love" vs "To be an evangelising church with a Eucharistic spirituality" 
6. Package name: blessed-sacrament-church vs implied blessed-sacrament-queenstown 
7. Public images: 9 files (community, damien-hall, faith-formation, family-life, garden, hero-church, liturgical, pastoral-care, youth) vs 8 in old docs
