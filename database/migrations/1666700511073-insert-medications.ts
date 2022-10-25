import {MigrationInterface, QueryRunner} from 'typeorm';

const medications = [
    {
        genericName: 'Abacavir',
        brandNames: 'ZIAGEN',
    },
    {
        genericName: 'Abaloparatide',
        brandNames: 'TYMLOS',
    },
    {
        genericName: 'Abatacept',
        brandNames: 'ORENCIA',
    },
    {
        genericName: 'Abciximab',
        brandNames: 'REOPRO',
    },
    {
        genericName: 'Acamprosate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Acarbose',
        brandNames: 'PRECOSE',
    },
    {
        genericName: 'Acebutolol',
        brandNames: 'SECTRAL',
    },
    {
        genericName: 'Acetaminophen',
        brandNames: 'TYLENOL',
    },
    {
        genericName: 'Acetazolamide',
        brandNames: 'DIAMOX',
    },
    {
        genericName: 'Acetohydroxamic acid',
        brandNames: 'LITHOSTAT',
    },
    {
        genericName: 'Acetylcysteine',
        brandNames: 'ACETADOTE',
    },
    {
        genericName: 'Acetylprocainamide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Acitretin',
        brandNames: 'SORIATANE',
    },
    {
        genericName: 'Aclidinium',
        brandNames: 'TUDORZA PRESSAIR',
    },
    {
        genericName: 'Acyclovir',
        brandNames: 'ZOVIRAX',
    },
    {
        genericName: 'Adalimumab',
        brandNames: 'HUMIRA',
    },
    {
        genericName: 'Adapalene',
        brandNames: 'DIFFERIN',
    },
    {
        genericName: 'Adefovir',
        brandNames: 'HEPSERA',
    },
    {
        genericName: 'Adenosine',
        brandNames: 'ADENOCARD',
    },
    {
        genericName: 'Aflibercept',
        brandNames: 'EYLEA',
    },
    {
        genericName: 'Agalsidase beta',
        brandNames: 'FABRAZYME',
    },
    {
        genericName: 'Albendazole',
        brandNames: 'ALBENZA',
    },
    {
        genericName: 'Albiglutide',
        brandNames: 'TANZEUM',
    },
    {
        genericName: 'Albuterol',
        brandNames: 'PROVENTIL-HFA, VENTOLIN-HFA',
    },
    {
        genericName: 'Alcaftadine',
        brandNames: 'LASTACAFT',
    },
    {
        genericName: 'Aldesleukin',
        brandNames: 'PROLEUKIN',
    },
    {
        genericName: 'Alectinib',
        brandNames: 'ALECENSA',
    },
    {
        genericName: 'Alemtuzumab',
        brandNames: 'CAMPATH',
    },
    {
        genericName: 'Alendronate',
        brandNames: 'FOSAMAX',
    },
    {
        genericName: 'Alfuzosin',
        brandNames: 'UROXATRAL',
    },
    {
        genericName: 'Alirocumab',
        brandNames: 'PRALUENT',
    },
    {
        genericName: 'Aliskiren',
        brandNames: 'TEKTURNA',
    },
    {
        genericName: 'Allopurinol',
        brandNames: 'ZYLOPRIM',
    },
    {
        genericName: 'Almotriptan',
        brandNames: 'AXERT',
    },
    {
        genericName: 'Alogliptin',
        brandNames: 'NESINA',
    },
    {
        genericName: 'Alosetron',
        brandNames: 'LOTRONEX',
    },
    {
        genericName: 'Alprazolam',
        brandNames: 'XANAX',
    },
    {
        genericName: 'Alprostadil',
        brandNames: 'CAVERJECT, EDEX, MUSE',
    },
    {
        genericName: 'Alteplase',
        brandNames: 'ACTIVASE',
    },
    {
        genericName: 'Amantadine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ambrisentan',
        brandNames: 'LETAIRIS',
    },
    {
        genericName: 'Amifostine',
        brandNames: 'ETHYOL',
    },
    {
        genericName: 'Amikacin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Amiloride',
        brandNames: 'MIDAMOR',
    },
    {
        genericName: 'Aminocaproic acid',
        brandNames: 'AMICAR',
    },
    {
        genericName: 'Aminophylline',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Amiodarone',
        brandNames: 'NEXTERONE',
    },
    {
        genericName: 'Amitriptyline',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Amlodipine',
        brandNames: 'NORVASC',
    },
    {
        genericName: 'Amobarbital',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Amoxapine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Amoxicillin',
        brandNames: 'AMOXIL',
    },
    {
        genericName: 'Amoxicillin/clavulanate',
        brandNames: 'AUGMENTIN',
    },
    {
        genericName: 'Amphetamine',
        brandNames: 'ADDERALL XR 10',
    },
    {
        genericName: 'Amphotericin B',
        brandNames: 'ABELCET, AMBISOME',
    },
    {
        genericName: 'Ampicillin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ampicillin/sulbactam',
        brandNames: 'UNASYN',
    },
    {
        genericName: 'Anagrelide',
        brandNames: 'AGRYLIN',
    },
    {
        genericName: 'Anakinra',
        brandNames: 'KINERET',
    },
    {
        genericName: 'Anastrozole',
        brandNames: 'ARIMIDEX',
    },
    {
        genericName: 'Andexanet Alfa',
        brandNames: 'Andexxa',
    },
    {
        genericName: 'Anidulafungin',
        brandNames: 'ERAXIS',
    },
    {
        genericName: 'Anthralin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Antihemophilic Factor (Human)',
        brandNames: 'MONOCLATE-P',
    },
    {
        genericName: 'Antihemophilic Factor (Recombinant)',
        brandNames: 'RECOMBINATE',
    },
    {
        genericName: 'Antihemophilic Factor/von Willebrand Factor Complex (Human)',
        brandNames: 'ALPHANATE',
    },
    {
        genericName: 'Apalutamide',
        brandNames: 'ERLEADA',
    },
    {
        genericName: 'Apixaban',
        brandNames: 'ELIQUIS',
    },
    {
        genericName: 'Apomorphine',
        brandNames: 'APOKYN',
    },
    {
        genericName: 'Apraclonidine',
        brandNames: 'IOPIDINE',
    },
    {
        genericName: 'Apremilast',
        brandNames: 'OTEZLA',
    },
    {
        genericName: 'Aprepitant',
        brandNames: 'EMEND',
    },
    {
        genericName: 'Aprotinin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Arformoterol',
        brandNames: 'BROVANA',
    },
    {
        genericName: 'Argatroban',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Arginine',
        brandNames: 'R-GENE 10',
    },
    {
        genericName: 'Aripiprazole',
        brandNames: 'ABILIFY',
    },
    {
        genericName: 'Armodafinil',
        brandNames: 'NUVIGIL',
    },
    {
        genericName: 'Artemether/lumefantrine',
        brandNames: 'COARTEM',
    },
    {
        genericName: 'Artesunate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Asparaginase',
        brandNames: 'ELSPAR',
    },
    {
        genericName: 'Aspirin',
        brandNames: 'DURLAZA',
    },
    {
        genericName: 'Atazanavir',
        brandNames: 'REYATAZ',
    },
    {
        genericName: 'Atenolol',
        brandNames: 'TENORMIN',
    },
    {
        genericName: 'Atezolizumab',
        brandNames: 'TECENTRIQ',
    },
    {
        genericName: 'Atomoxetine',
        brandNames: 'STRATTERA',
    },
    {
        genericName: 'Atorvastatin',
        brandNames: 'LIPITOR',
    },
    {
        genericName: 'Atovaquone',
        brandNames: 'MEPRON',
    },
    {
        genericName: 'Atovaquone/proguanil',
        brandNames: 'MALARONE',
    },
    {
        genericName: 'Atracurium',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Atracurium',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Atropine',
        brandNames: 'ATROPEN',
    },
    {
        genericName: 'Auranofin',
        brandNames: 'RIDAURA',
    },
    {
        genericName: 'Avanafil',
        brandNames: 'STENDRA',
    },
    {
        genericName: 'Avelumab',
        brandNames: 'BAVENCIO',
    },
    {
        genericName: 'Axicabtagene ciloleucel',
        brandNames: 'YESCARTA',
    },
    {
        genericName: 'Azacitidine',
        brandNames: 'VIDAZA',
    },
    {
        genericName: 'Azathioprine',
        brandNames: 'IMURAN',
    },
    {
        genericName: 'Azelaic acid',
        brandNames: 'AZELEX, FINACEA',
    },
    {
        genericName: 'Azelastine',
        brandNames: 'ASTELIN, OPTIVAR',
    },
    {
        genericName: 'Azilsartan',
        brandNames: 'EDARBI',
    },
    {
        genericName: 'Azithromycin',
        brandNames: 'ZITHROMAX',
    },
    {
        genericName: 'Aztreonam',
        brandNames: 'AZACTAM',
    },
    {
        genericName: 'Bacitracin',
        brandNames: 'BACIIM',
    },
    {
        genericName: 'Bacitracin/neomycin/polymyxin B',
        brandNames: 'NEOSPORIN',
    },
    {
        genericName: 'Baclofen',
        brandNames: 'LIORESAL',
    },
    {
        genericName: 'Baloxavir marboxil',
        brandNames: 'XOFLUZA',
    },
    {
        genericName: 'Balsalazide',
        brandNames: 'COLAZAL',
    },
    {
        genericName: 'Baricitinib',
        brandNames: 'OLUMIANT',
    },
    {
        genericName: 'Basiliximab',
        brandNames: 'SIMULECT',
    },
    {
        genericName: 'Beclomethasone',
        brandNames: 'BECONASE',
    },
    {
        genericName: 'Belatacept',
        brandNames: 'NULOJIX',
    },
    {
        genericName: 'Belimumab',
        brandNames: 'BENLYSTA',
    },
    {
        genericName: 'Benazepril',
        brandNames: 'LOTENSIN',
    },
    {
        genericName: 'Bendamustine',
        brandNames: 'TREANDA',
    },
    {
        genericName: 'Benralizumab',
        brandNames: 'FASENRA',
    },
    {
        genericName: 'Benzocaine',
        brandNames: 'ANBESOL',
    },
    {
        genericName: 'Benzonatate',
        brandNames: 'TESSALON',
    },
    {
        genericName: 'Benzoyl peroxide',
        brandNames: 'No US brand names',
    },
    {
        genericName: 'Benztropine',
        brandNames: 'COGENTIN',
    },
    {
        genericName: 'Beractant',
        brandNames: 'SURVANTA',
    },
    {
        genericName: 'Betaine',
        brandNames: 'CYSTADANE',
    },
    {
        genericName: 'Betamethasone',
        brandNames: 'CELESTONE SOLUSPAN, DIPROLENE, LUXIQ',
    },
    {
        genericName: 'Betaxolol',
        brandNames: 'BETOPTIC',
    },
    {
        genericName: 'Bethanechol',
        brandNames: 'DUVOID, URECHOLINE',
    },
    {
        genericName: 'Betrixaban',
        brandNames: 'BEVYXXA',
    },
    {
        genericName: 'Bevacizumab',
        brandNames: 'AVASTIN',
    },
    {
        genericName: 'Bezafibrate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Bezlotoxumab',
        brandNames: 'ZINPLAVA',
    },
    {
        genericName: 'Bicalutamide',
        brandNames: 'CASODEX',
    },
    {
        genericName: 'Bictegravir',
        brandNames: 'BIKTARVY',
    },
    {
        genericName: 'Bimatoprost',
        brandNames: 'LUMIGAN',
    },
    {
        genericName: 'Binimetinib',
        brandNames: 'MEKTOVI',
    },
    {
        genericName: 'Bisacodyl',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Bisoprolol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Bivalirudin',
        brandNames: 'ANGIOMAX',
    },
    {
        genericName: 'Bleomycin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Blinatumomab',
        brandNames: 'BLINCYTO',
    },
    {
        genericName: 'Boceprevir',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Bortezomib',
        brandNames: 'VELCADE',
    },
    {
        genericName: 'Bosentan',
        brandNames: 'TRACLEER',
    },
    {
        genericName: 'Bosutinib',
        brandNames: 'BOSULIF',
    },
    {
        genericName: 'Botulism antitoxin, heptavalent',
        brandNames: 'BAT',
    },
    {
        genericName: 'Botulism Immune Globulin (Intravenous-Human)',
        brandNames: 'Baby BIG',
    },
    {
        genericName: 'Brentuximab vedotin',
        brandNames: 'ADCETRIS',
    },
    {
        genericName: 'Brexpiprazole',
        brandNames: 'REXULTI',
    },
    {
        genericName: 'Brimonidine',
        brandNames: 'ALPHAGAN P',
    },
    {
        genericName: 'Brinzolamide',
        brandNames: 'AZOPT',
    },
    {
        genericName: 'Brodalumab',
        brandNames: 'SILIQ',
    },
    {
        genericName: 'Bromocriptine',
        brandNames: 'PARLODEL',
    },
    {
        genericName: 'Brompheniramine',
        brandNames: 'VELTANE',
    },
    {
        genericName: 'Budesonide',
        brandNames: 'PULMICORT, RHINOCORT',
    },
    {
        genericName: 'Bumetanide',
        brandNames: 'BUMEX',
    },
    {
        genericName: 'Bupivacaine',
        brandNames: 'MARCAINE',
    },
    {
        genericName: 'Buprenorphine',
        brandNames: 'BUPRENEX',
    },
    {
        genericName: 'Bupropion',
        brandNames: 'WELLBUTRIN, ZYBAN',
    },
    {
        genericName: 'Burosumab',
        brandNames: 'CRYSVITA',
    },
    {
        genericName: 'Buserelin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Buspirone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Busulfan',
        brandNames: 'MYLERAN',
    },
    {
        genericName: 'Butabarbital',
        brandNames: 'BUTISOL SODIUM',
    },
    {
        genericName: 'Butalbital',
        brandNames: 'ALLZITAL',
    },
    {
        genericName: 'Butenafine',
        brandNames: 'MENTAX',
    },
    {
        genericName: 'Butoconazole',
        brandNames: 'FEMSTAT 3',
    },
    {
        genericName: 'Butorphanol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'C1 Inhibitor (Human)',
        brandNames: 'Berinert',
    },
    {
        genericName: 'Cabazitaxel',
        brandNames: 'JEVTANA KIT',
    },
    {
        genericName: 'Cabergoline',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cabozantinib',
        brandNames: 'COMETRIQ',
    },
    {
        genericName: 'Calcipotriene',
        brandNames: 'DOVONEX',
    },
    {
        genericName: 'Calcitonin',
        brandNames: 'MIACALCIN',
    },
    {
        genericName: 'Calcitriol',
        brandNames: 'ROCALTROL',
    },
    {
        genericName: 'Calcium chloride',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Calcium gluconate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Calfactant',
        brandNames: 'INFASURF',
    },
    {
        genericName: 'Canagliflozin',
        brandNames: 'INVOKANA',
    },
    {
        genericName: 'Canakinumab',
        brandNames: 'ILARIS',
    },
    {
        genericName: 'Candesartan',
        brandNames: 'ATACAND',
    },
    {
        genericName: 'Cangrelor',
        brandNames: 'KENGREAL',
    },
    {
        genericName: 'Cantharidin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Capecitabine',
        brandNames: 'XELODA',
    },
    {
        genericName: 'Caplacizumab',
        brandNames: 'CABLIVI',
    },
    {
        genericName: 'Capreomycin',
        brandNames: 'CAPASTAT',
    },
    {
        genericName: 'Capsaicin',
        brandNames: 'QUTENZA',
    },
    {
        genericName: 'Captopril',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Carbachol',
        brandNames: 'MIOSTAT',
    },
    {
        genericName: 'Carbamazepine',
        brandNames: 'TEGRETOL',
    },
    {
        genericName: 'Carbidopa',
        brandNames: 'LODOSYN',
    },
    {
        genericName: 'Carbidopa/levodopa',
        brandNames: 'SINEMET',
    },
    {
        genericName: 'Carbinoxamine',
        brandNames: 'KARBINAL ER',
    },
    {
        genericName: 'Carboplatin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Carfilzomib',
        brandNames: 'KYPROLIS',
    },
    {
        genericName: 'Cariprazine',
        brandNames: 'VRAYLAR',
    },
    {
        genericName: 'Carisoprodol',
        brandNames: 'SOMA',
    },
    {
        genericName: 'Carmustine',
        brandNames: 'BICNU, GLIADEL',
    },
    {
        genericName: 'Carteolol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Carvedilol',
        brandNames: 'COREG',
    },
    {
        genericName: 'Caspofungin',
        brandNames: 'CANCIDAS',
    },
    {
        genericName: 'Cefaclor',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cefadroxil',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cefazolin',
        brandNames: 'ANCEF, KEFZOL',
    },
    {
        genericName: 'Cefdinir',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cefditoren',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cefepime',
        brandNames: 'MAXIPIME',
    },
    {
        genericName: 'Cefixime',
        brandNames: 'SUPRAX',
    },
    {
        genericName: 'Cefotaxime',
        brandNames: 'CLAFORAN',
    },
    {
        genericName: 'Cefotetan',
        brandNames: 'CEFOTAN',
    },
    {
        genericName: 'Cefoxitin',
        brandNames: 'MEFOXIN',
    },
    {
        genericName: 'Cefpodoxime',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cefprozil',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ceftaroline fosamil',
        brandNames: 'TEFLARO',
    },
    {
        genericName: 'Ceftazidime',
        brandNames: 'FORTAZ, TAZICEF',
    },
    {
        genericName: 'Ceftazidime/Avibactam',
        brandNames: 'AVYCAZ',
    },
    {
        genericName: 'Ceftibuten',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ceftobiprole',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ceftriaxone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cefuroxime',
        brandNames: 'CEFTIN, ZINACEF',
    },
    {
        genericName: 'Celecoxib',
        brandNames: 'CELEBREX',
    },
    {
        genericName: 'Cephalexin',
        brandNames: 'KEFLEX',
    },
    {
        genericName: 'Ceritinib',
        brandNames: 'ZYKADIA',
    },
    {
        genericName: 'Certolizumab pegol',
        brandNames: 'CIMZIA',
    },
    {
        genericName: 'Cetirizine',
        brandNames: 'ZYRTEC',
    },
    {
        genericName: 'Cetuximab',
        brandNames: 'ERBITUX',
    },
    {
        genericName: 'Cevimeline',
        brandNames: 'EVOXAC',
    },
    {
        genericName: 'Chlorambucil',
        brandNames: 'LEUKERAN',
    },
    {
        genericName: 'Chloramphenicol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Chlordiazepoxide',
        brandNames: 'LIBRIUM',
    },
    {
        genericName: 'Chloroquine',
        brandNames: 'ARALEN',
    },
    {
        genericName: 'Chlorothiazide',
        brandNames: 'DIURIL',
    },
    {
        genericName: 'Chlorpheniramine',
        brandNames: 'CHLOR-TRIMETON',
    },
    {
        genericName: 'Chlorpromazine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Chlorpropamide',
        brandNames: 'DIABINESE',
    },
    {
        genericName: 'Chlorthalidone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Chlorzoxazone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cholecalciferol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cholestyramine resin',
        brandNames: 'PREVALITE',
    },
    {
        genericName: 'Choline magnesium trisalicylate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ciclesonide',
        brandNames: 'ALVESCO',
    },
    {
        genericName: 'Ciclopirox',
        brandNames: 'LOPROX, PENLAC',
    },
    {
        genericName: 'Cidofovir',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cilostazol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cimetidine',
        brandNames: 'TAGAMET HB',
    },
    {
        genericName: 'Cinacalcet',
        brandNames: 'SENSIPAR',
    },
    {
        genericName: 'Ciprofloxacin',
        brandNames: 'CILOXAN, CIPRO',
    },
    {
        genericName: 'Cisapride',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cisplatin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Citalopram',
        brandNames: 'CELEXA',
    },
    {
        genericName: 'Cladribine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Clarithromycin',
        brandNames: 'BIAXIN',
    },
    {
        genericName: 'Clemastine',
        brandNames: 'TAVIST-1',
    },
    {
        genericName: 'Clevidipine',
        brandNames: 'CLEVIPREX',
    },
    {
        genericName: 'Clidinium/chlordiazepoxide',
        brandNames: 'LIBRAX',
    },
    {
        genericName: 'Clindamycin',
        brandNames: 'CLEOCIN',
    },
    {
        genericName: 'CloBAZam',
        brandNames: 'ONFI',
    },
    {
        genericName: 'Clobetasol',
        brandNames: 'CLOBEX',
    },
    {
        genericName: 'Clomiphene',
        brandNames: 'CLOMID',
    },
    {
        genericName: 'Clomipramine',
        brandNames: 'ANAFRANIL',
    },
    {
        genericName: 'Clonazepam',
        brandNames: 'KLONOPIN',
    },
    {
        genericName: 'Clonidine',
        brandNames: 'CATAPRES',
    },
    {
        genericName: 'Clopidogrel',
        brandNames: 'PLAVIX',
    },
    {
        genericName: 'Clorazepate',
        brandNames: 'TRANXENE',
    },
    {
        genericName: 'Clotrimazole',
        brandNames: 'MYCELEX',
    },
    {
        genericName: 'Clozapine',
        brandNames: 'CLOZARIL',
    },
    {
        genericName: 'Codeine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Colchicine',
        brandNames: 'COLCRYS',
    },
    {
        genericName: 'Colesevelam',
        brandNames: 'WELCHOL',
    },
    {
        genericName: 'Colestipol',
        brandNames: 'COLESTID',
    },
    {
        genericName: 'Colistimethate',
        brandNames: 'COLY-MYCIN M',
    },
    {
        genericName: 'Collagenase',
        brandNames: 'SANTYL',
    },
    {
        genericName: 'Concizumab',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Conivaptan',
        brandNames: 'VAPRISOL',
    },
    {
        genericName: 'Corticotropin',
        brandNames: 'H.P. ACTHAR GEL',
    },
    {
        genericName: 'Crizotinib',
        brandNames: 'XALKORI',
    },
    {
        genericName: 'Cromolyn',
        brandNames: 'CROLOM',
    },
    {
        genericName: 'Crotalidae Polyvalent Immune FAB (Ovine)',
        brandNames: 'CroFab',
    },
    {
        genericName: 'Crotamiton',
        brandNames: 'EURAX',
    },
    {
        genericName: 'Cyclizine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cyclobenzaprine',
        brandNames: 'AMRIX',
    },
    {
        genericName: 'Cyclopentolate',
        brandNames: 'AKPENTOLATE, CYCLOGYL',
    },
    {
        genericName: 'Cyclophosphamide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cycloserine',
        brandNames: 'SEROMYCIN',
    },
    {
        genericName: 'Cyclosporine',
        brandNames: 'NEORAL, SANDIMMUNE',
    },
    {
        genericName: 'Cyproheptadine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cyproterone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cytarabine (Conventional)',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Cytomegalovirus Immune Globulin (Intravenous-Human)',
        brandNames: 'Cytogam',
    },
    {
        genericName: 'Dabigatran etexilate',
        brandNames: 'PRADAXA',
    },
    {
        genericName: 'Dabrafenib',
        brandNames: 'TAFINLAR',
    },
    {
        genericName: 'Dacarbazine',
        brandNames: 'DTIC-DOME',
    },
    {
        genericName: 'Daclatsvir',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Dactinomycin',
        brandNames: 'COSMEGEN',
    },
    {
        genericName: 'Dalbavancin',
        brandNames: 'DALVANCE',
    },
    {
        genericName: 'Dalfampridine',
        brandNames: 'AMPYRA',
    },
    {
        genericName: 'Dalteparin',
        brandNames: 'FRAGMIN',
    },
    {
        genericName: 'Danazol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Dantrolene',
        brandNames: 'DANTRIUM',
    },
    {
        genericName: 'Dapagliflozin',
        brandNames: 'FARXIGA',
    },
    {
        genericName: 'Dapsone',
        brandNames: 'ACZONE',
    },
    {
        genericName: 'Daptomycin',
        brandNames: 'CUBICIN',
    },
    {
        genericName: 'Daratumumab',
        brandNames: 'DARZALEX',
    },
    {
        genericName: 'Darbepoetin alfa',
        brandNames: 'ARANESP',
    },
    {
        genericName: 'Darifenacin',
        brandNames: 'ENABLEX',
    },
    {
        genericName: 'Darunavir',
        brandNames: 'PREZISTA',
    },
    {
        genericName: 'Dasatinib',
        brandNames: 'SPRYCEL',
    },
    {
        genericName: 'Daunorubicin (Conventional)',
        brandNames: 'CERUBIDINE',
    },
    {
        genericName: 'DAUNOrubicin (Liposomal)',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Deferasirox',
        brandNames: 'EXJADE',
    },
    {
        genericName: 'Deferiprone',
        brandNames: 'FERRIPROX',
    },
    {
        genericName: 'Deferoxamine',
        brandNames: 'DESFERAL',
    },
    {
        genericName: 'Delafloxacin',
        brandNames: 'BAXDELA',
    },
    {
        genericName: 'Delavirdine',
        brandNames: 'RESCRIPTOR',
    },
    {
        genericName: 'Demeclocycline',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Denileukin diftitox',
        brandNames: 'ONTAK',
    },
    {
        genericName: 'Denosumab',
        brandNames: 'PROLIA',
    },
    {
        genericName: 'Desipramine',
        brandNames: 'NORPRAMIN',
    },
    {
        genericName: 'Desirudin',
        brandNames: 'IPRIVASK',
    },
    {
        genericName: 'Desloratadine',
        brandNames: 'CLARINEX',
    },
    {
        genericName: 'Desmopressin',
        brandNames: 'DDAVP, STIMATE',
    },
    {
        genericName: 'Desoximetasone',
        brandNames: 'TOPICORT',
    },
    {
        genericName: 'Desvenlafaxine',
        brandNames: 'PRISTIQ',
    },
    {
        genericName: 'Dexamethasone',
        brandNames: 'OZURDEX',
    },
    {
        genericName: 'Dexbrompheniramine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Dexchlorpheniramine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Dexlansoprazole',
        brandNames: 'DEXILANT',
    },
    {
        genericName: 'Dexmedetomidine',
        brandNames: 'PRECEDEX',
    },
    {
        genericName: 'Dextroamphetamine',
        brandNames: 'DEXEDRINE',
    },
    {
        genericName: 'Dextromethorphan',
        brandNames: 'DELSYM',
    },
    {
        genericName: 'Diazepam',
        brandNames: 'VALIUM',
    },
    {
        genericName: 'Diazoxide',
        brandNames: 'PROGLYCEM',
    },
    {
        genericName: 'Diclofenac',
        brandNames: 'VOLTAREN',
    },
    {
        genericName: 'Dicloxacillin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Dicyclomine',
        brandNames: 'BENTYL',
    },
    {
        genericName: 'Didanosine',
        brandNames: 'VIDEX',
    },
    {
        genericName: 'Dienogest',
        brandNames: 'NATAZIA',
    },
    {
        genericName: 'Diethylcarbamazine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Diethylpropion',
        brandNames: 'TENUATE',
    },
    {
        genericName: 'Diflunisal',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Digoxin',
        brandNames: 'LANOXIN',
    },
    {
        genericName: 'Digoxin immune Fab',
        brandNames: 'DigiFab',
    },
    {
        genericName: 'Dihydroergotamine',
        brandNames: 'D.H.E. 45, MIGRANAL',
    },
    {
        genericName: 'Diloxanide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Diltiazem',
        brandNames: 'CARDIZEM, CARTIA XT',
    },
    {
        genericName: 'Dimenhydrinate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Dimercaprol',
        brandNames: 'BAL',
    },
    {
        genericName: 'Dimethyl sulfoxide',
        brandNames: 'RIMSO-50',
    },
    {
        genericName: 'Dinoprostone',
        brandNames: 'CERVIDIL, PREPIDIL, PROSTIN E2',
    },
    {
        genericName: 'Dinutuximab',
        brandNames: 'UNITUXIN',
    },
    {
        genericName: 'Diphenhydramine',
        brandNames: 'Benadryl',
    },
    {
        genericName: 'Diphenoxylate/atropine',
        brandNames: 'LOMOTIL',
    },
    {
        genericName: 'Dipyridamole',
        brandNames: 'PERSANTINE',
    },
    {
        genericName: 'Disopyramide',
        brandNames: 'NORPACE',
    },
    {
        genericName: 'Disulfiram',
        brandNames: 'ANTABUSE',
    },
    {
        genericName: 'Divalproex',
        brandNames: 'DEPAKOTE',
    },
    {
        genericName: 'Dobutamine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Docetaxel',
        brandNames: 'TAXOTERE',
    },
    {
        genericName: 'Docosanol',
        brandNames: 'ABREVA',
    },
    {
        genericName: 'Dofetilide',
        brandNames: 'TIKOSYN',
    },
    {
        genericName: 'Dolasetron',
        brandNames: 'ANZEMET',
    },
    {
        genericName: 'Dolutegravir',
        brandNames: 'TIVICAY',
    },
    {
        genericName: 'Donepezil',
        brandNames: 'ARICEPT',
    },
    {
        genericName: 'Dopamine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Doravirine',
        brandNames: 'PIFELTRO',
    },
    {
        genericName: 'Doripenem',
        brandNames: 'DORIBAX',
    },
    {
        genericName: 'Dornase alfa',
        brandNames: 'PULMOZYME',
    },
    {
        genericName: 'Dorzolamide',
        brandNames: 'TRUSOPT',
    },
    {
        genericName: 'Doxazosin',
        brandNames: 'CARDURA',
    },
    {
        genericName: 'Doxepin',
        brandNames: 'ZONALON',
    },
    {
        genericName: 'Doxercalciferol',
        brandNames: 'HECTOROL',
    },
    {
        genericName: 'Doxorubicin (conventional)',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Doxorubicin (liposomal)',
        brandNames: 'DOXIL (LIPOSOMAL)',
    },
    {
        genericName: 'Doxycycline',
        brandNames: 'VIBRAMYCIN',
    },
    {
        genericName: 'Doxylamine',
        brandNames: 'UNISOM',
    },
    {
        genericName: 'Dronabinol',
        brandNames: 'MARINOL',
    },
    {
        genericName: 'Dronedarone',
        brandNames: 'MULTAQ',
    },
    {
        genericName: 'Droperidol',
        brandNames: 'INAPSINE',
    },
    {
        genericName: 'Droxidopa',
        brandNames: 'NORTHERA',
    },
    {
        genericName: 'Dulaglutide',
        brandNames: 'TRULICITY',
    },
    {
        genericName: 'Duloxetine',
        brandNames: 'CYMBALTA',
    },
    {
        genericName: 'Dupilumab',
        brandNames: 'DUPIXENT',
    },
    {
        genericName: 'Durvalumab',
        brandNames: 'IMFINZI',
    },
    {
        genericName: 'Dutasteride',
        brandNames: 'AVODART',
    },
    {
        genericName: 'Dyclonine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ecallantide',
        brandNames: 'KALBITOR',
    },
    {
        genericName: 'Echothiophate iodide',
        brandNames: 'PHOSPHOLINE IODIDE',
    },
    {
        genericName: 'Econazole',
        brandNames: 'ECOZA',
    },
    {
        genericName: 'Eculizumab',
        brandNames: 'SOLIRIS',
    },
    {
        genericName: 'Edetate calcium disodium',
        brandNames: 'CALCIUM DISODIUM VERSENATE',
    },
    {
        genericName: 'Edoxaban',
        brandNames: 'SAVAYSA',
    },
    {
        genericName: 'Edrophonium',
        brandNames: 'ENLON',
    },
    {
        genericName: 'Efavirenz',
        brandNames: 'SUSTIVA',
    },
    {
        genericName: 'Eflornithine',
        brandNames: 'VANIQA',
    },
    {
        genericName: 'Elagolix',
        brandNames: 'ORILISSA',
    },
    {
        genericName: 'Elbasvir and Grazoprevir',
        brandNames: 'ZEPATIER',
    },
    {
        genericName: 'Eletriptan',
        brandNames: 'RELPAX',
    },
    {
        genericName: 'Eliglustat',
        brandNames: 'CERDELGA',
    },
    {
        genericName: 'Elotuzumab',
        brandNames: 'EMPLICITI',
    },
    {
        genericName: 'Eltrombopag',
        brandNames: 'PROMACTA',
    },
    {
        genericName: 'Eluxadoline',
        brandNames: 'VIBERZI',
    },
    {
        genericName: 'Elvitegravir',
        brandNames: 'GENVOYA',
    },
    {
        genericName: 'Emapalumab',
        brandNames: 'GAMIFANT',
    },
    {
        genericName: 'Emedastine',
        brandNames: 'EMADINE',
    },
    {
        genericName: 'Emicizumab',
        brandNames: 'HEMLIBRA',
    },
    {
        genericName: 'Empagliflozin',
        brandNames: 'JARDIANCE',
    },
    {
        genericName: 'Emtricitabine',
        brandNames: 'EMTRIVA',
    },
    {
        genericName: 'Enalapril',
        brandNames: 'VASOTEC',
    },
    {
        genericName: 'Enalaprilat',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Enasidenib',
        brandNames: 'IDHIFA',
    },
    {
        genericName: 'Encorafenib',
        brandNames: 'BRAFTOVI',
    },
    {
        genericName: 'Enfuvirtide',
        brandNames: 'FUZEON',
    },
    {
        genericName: 'Enoxaparin',
        brandNames: 'LOVENOX',
    },
    {
        genericName: 'Entacapone',
        brandNames: 'COMTAN',
    },
    {
        genericName: 'Entecavir',
        brandNames: 'BARACLUDE',
    },
    {
        genericName: 'Enzalutamide',
        brandNames: 'XTANDI',
    },
    {
        genericName: 'Epinephrine',
        brandNames: 'ADRENALIN',
    },
    {
        genericName: 'Epirubicin',
        brandNames: 'ELLENCE',
    },
    {
        genericName: 'Eplerenone',
        brandNames: 'INSPRA',
    },
    {
        genericName: 'Epoetin alfa',
        brandNames: 'EPOGEN/PROCRIT',
    },
    {
        genericName: 'Epoprostenol',
        brandNames: 'FLOLAN',
    },
    {
        genericName: 'Eprosartan',
        brandNames: 'TEVETEN',
    },
    {
        genericName: 'Eptifibatide',
        brandNames: 'INTEGRILIN',
    },
    {
        genericName: 'Eravacycline',
        brandNames: 'XERAVA',
    },
    {
        genericName: 'Erenumab',
        brandNames: 'AIMOVIG',
    },
    {
        genericName: 'Ergocalciferol',
        brandNames: 'DRISDOL',
    },
    {
        genericName: 'Ergoloid mesylates',
        brandNames: 'HYDERGINE',
    },
    {
        genericName: 'Ergonovine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ergotamine',
        brandNames: 'ERGOMAR',
    },
    {
        genericName: 'Erlotinib',
        brandNames: 'TARCEVA',
    },
    {
        genericName: 'Ertapenem',
        brandNames: 'INVANZ',
    },
    {
        genericName: 'Ertugliflozin',
        brandNames: 'STEGLATRO',
    },
    {
        genericName: 'Erythromycin',
        brandNames: 'ERY-TAB, ERYTHROCIN',
    },
    {
        genericName: 'Erythromycin/sulfisoxazole',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Escitalopram',
        brandNames: 'LEXAPRO',
    },
    {
        genericName: 'Esketamine',
        brandNames: 'SPRAVATO',
    },
    {
        genericName: 'Eslicarbazepine',
        brandNames: 'APTIOM',
    },
    {
        genericName: 'Esmolol',
        brandNames: 'BREVIBLOC',
    },
    {
        genericName: 'Esomeprazole',
        brandNames: 'NEXIUM',
    },
    {
        genericName: 'Estazolam',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Estradiol',
        brandNames: 'ESTRADERM, ESTROGEL, VIVELLE',
    },
    {
        genericName: 'Estrogens',
        brandNames: 'PREMARIN',
    },
    {
        genericName: 'Eszopiclone',
        brandNames: 'LUNESTA',
    },
    {
        genericName: 'Etanercept',
        brandNames: 'ENBREL',
    },
    {
        genericName: 'Ethacrynic acid',
        brandNames: 'EDECRIN',
    },
    {
        genericName: 'Ethambutol',
        brandNames: 'MYAMBUTOL',
    },
    {
        genericName: 'Ethionamide',
        brandNames: 'TRECATOR',
    },
    {
        genericName: 'Ethosuximide',
        brandNames: 'ZARONTIN',
    },
    {
        genericName: 'Etidronate',
        brandNames: 'DIDRONEL',
    },
    {
        genericName: 'Etodolac',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Etomidate',
        brandNames: 'AMIDATE',
    },
    {
        genericName: 'Etonogestrel',
        brandNames: 'IMPLANON',
    },
    {
        genericName: 'Etoposide',
        brandNames: 'ETOPOPHOS',
    },
    {
        genericName: 'Etravirine',
        brandNames: 'INTELENCE',
    },
    {
        genericName: 'Everolimus',
        brandNames: 'AFINITOR',
    },
    {
        genericName: 'Evolocumab',
        brandNames: 'REPATHA',
    },
    {
        genericName: 'Exemestane',
        brandNames: 'AROMASIN',
    },
    {
        genericName: 'Exenatide',
        brandNames: 'BYETTA',
    },
    {
        genericName: 'Ezetimibe',
        brandNames: 'ZETIA',
    },
    {
        genericName: 'Ezogabine',
        brandNames: 'POTIGA',
    },
    {
        genericName: 'Factor IX (Human)',
        brandNames: 'MONONINE',
    },
    {
        genericName: 'Factor IX (Recombinant)',
        brandNames: 'RIXUBIS',
    },
    {
        genericName: 'Factor IX Complex (Human) [(Factors II, IX, X)]',
        brandNames: 'Bebulin',
    },
    {
        genericName: 'Factor VIIa (Recombinant)',
        brandNames: 'NovoSeven',
    },
    {
        genericName: 'Factor XIII Concentrate (Human)',
        brandNames: 'Corifact',
    },
    {
        genericName: 'Famciclovir',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Famotidine',
        brandNames: 'PEPCID',
    },
    {
        genericName: 'Febuxostat',
        brandNames: 'ULORIC',
    },
    {
        genericName: 'Felbamate',
        brandNames: 'FELBATOL',
    },
    {
        genericName: 'Felodipine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Fenofibrate and Derivatives',
        brandNames: 'ANTARA, LIPOFEN, TRICOR, TRIGLIDE',
    },
    {
        genericName: 'Fenoldopam',
        brandNames: 'CORLOPAM',
    },
    {
        genericName: 'Fenoprofen',
        brandNames: 'NALFON',
    },
    {
        genericName: 'Fentanyl',
        brandNames: 'ACTIQ, DURAGESIC, SUBLIMAZE',
    },
    {
        genericName: 'Ferric gluconate',
        brandNames: 'FERRLECIT',
    },
    {
        genericName: 'Ferrous fumarate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ferrous gluconate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ferrous sulfate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Fesoterodine',
        brandNames: 'TOVIAZ',
    },
    {
        genericName: 'Fexofenadine',
        brandNames: 'ALLEGRA',
    },
    {
        genericName: 'Fidaxomicin',
        brandNames: 'DIFICID',
    },
    {
        genericName: 'Filgrastim',
        brandNames: 'NEUPOGEN',
    },
    {
        genericName: 'Finasteride',
        brandNames: 'PROPECIA, PROSCAR',
    },
    {
        genericName: 'Fitusiran',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Flavocoxid',
        brandNames: 'LIMBREL',
    },
    {
        genericName: 'Flavoxate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Flecainide',
        brandNames: 'TAMBOCOR',
    },
    {
        genericName: 'Floxuridine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Fluconazole',
        brandNames: 'DIFLUCAN',
    },
    {
        genericName: 'Flucytosine',
        brandNames: 'ANCOBON',
    },
    {
        genericName: 'Fludarabine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Fludrocortisone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Flumazenil',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Flunisolide',
        brandNames: 'AEROSPAN HFA',
    },
    {
        genericName: 'Fluocinolone',
        brandNames: 'CAPEX',
    },
    {
        genericName: 'Fluocinonide',
        brandNames: 'VANOS',
    },
    {
        genericName: 'Fluorouracil',
        brandNames: 'CARAC',
    },
    {
        genericName: 'Fluoxetine',
        brandNames: 'PROZAC, SARAFEM',
    },
    {
        genericName: 'Fluphenazine',
        brandNames: 'No US brand names',
    },
    {
        genericName: 'Flurandrenolide',
        brandNames: 'CORDRAN',
    },
    {
        genericName: 'Flurazepam',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Flurbiprofen',
        brandNames: 'OCUFEN',
    },
    {
        genericName: 'Flutamide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Fluticasone',
        brandNames: 'CUTIVATE, FLONASE',
    },
    {
        genericName: 'Fluvastatin',
        brandNames: 'LESCOL',
    },
    {
        genericName: 'Fluvoxamine',
        brandNames: 'LUVOX',
    },
    {
        genericName: 'Fomepizole',
        brandNames: 'ANTIZOL',
    },
    {
        genericName: 'Fondaparinux',
        brandNames: 'ARIXTRA',
    },
    {
        genericName: 'Formoterol',
        brandNames: 'FORADIL, PERFOROMIST',
    },
    {
        genericName: 'Fosamprenavir',
        brandNames: 'LEXIVA',
    },
    {
        genericName: 'Foscarnet',
        brandNames: 'FOSCAVIR',
    },
    {
        genericName: 'Fosfomycin',
        brandNames: 'MONUROL',
    },
    {
        genericName: 'Fosinopril',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Fosphenytoin',
        brandNames: 'CEREBYX',
    },
    {
        genericName: 'Fostamatinib',
        brandNames: 'TAVALISSE',
    },
    {
        genericName: 'Frovatriptan',
        brandNames: 'FROVA',
    },
    {
        genericName: 'Fulvestrant',
        brandNames: 'FASLODEX',
    },
    {
        genericName: 'Furosemide',
        brandNames: 'LASIX',
    },
    {
        genericName: 'Fusidic acid',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Gabapentin',
        brandNames: 'NEURONTIN',
    },
    {
        genericName: 'Galantamine',
        brandNames: 'RAZADYNE',
    },
    {
        genericName: 'Ganciclovir',
        brandNames: 'CYTOVENE',
    },
    {
        genericName: 'Gatifloxacin',
        brandNames: 'ZYMAR',
    },
    {
        genericName: 'Gefitinib',
        brandNames: 'IRESSA',
    },
    {
        genericName: 'Gemcitabine',
        brandNames: 'GEMZAR',
    },
    {
        genericName: 'Gemfibrozil',
        brandNames: 'LOPID',
    },
    {
        genericName: 'Gemifloxacin',
        brandNames: 'FACTIVE',
    },
    {
        genericName: 'Gemtuzumab ozogamicin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Gentamicin',
        brandNames: 'GENOPTIC',
    },
    {
        genericName: 'Glatiramer acetate',
        brandNames: 'COPAXONE',
    },
    {
        genericName: 'Glecaprevir',
        brandNames: 'MAVYRET',
    },
    {
        genericName: 'Glimepiride',
        brandNames: 'AMARYL',
    },
    {
        genericName: 'Glipizide',
        brandNames: 'GLUCOTROL',
    },
    {
        genericName: 'Glucagon',
        brandNames: 'GLUCAGEN',
    },
    {
        genericName: 'Glucarpidase',
        brandNames: 'VORAXAZE',
    },
    {
        genericName: 'Glyburide',
        brandNames: 'DIABETA, GLYNASE',
    },
    {
        genericName: 'Glycopyrrolate',
        brandNames: 'ROBINUL FORTE, ROBINUL',
    },
    {
        genericName: 'Golimumab',
        brandNames: 'SIMPONI',
    },
    {
        genericName: 'Gonadorelin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Goserelin',
        brandNames: 'ZOLADEX',
    },
    {
        genericName: 'Granisetron',
        brandNames: 'SANCUSO',
    },
    {
        genericName: 'Griseofulvin',
        brandNames: 'GRIS-PEG',
    },
    {
        genericName: 'Guanabenz',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Guanfacine',
        brandNames: 'TENEX',
    },
    {
        genericName: 'Guanidine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Guselkumab',
        brandNames: 'TREMFYA',
    },
    {
        genericName: 'Haloperidol',
        brandNames: 'HALDOL',
    },
    {
        genericName: 'Hemin',
        brandNames: 'PANHEMATIN',
    },
    {
        genericName: 'Heparin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Hepatitis B Immune Globulin (Human)',
        brandNames: 'HEPAGAM B',
    },
    {
        genericName: 'Histrelin',
        brandNames: 'VANTAS',
    },
    {
        genericName: 'Homatropine',
        brandNames: 'TUSSIGON',
    },
    {
        genericName: 'Hydralazine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Hydrochlorothiazide',
        brandNames: 'MICROZIDE',
    },
    {
        genericName: 'Hydrocodone/acetaminophen',
        brandNames: 'ANEXSIA 5/325',
    },
    {
        genericName: 'Hydrocodone/ibuprofen',
        brandNames: 'REPREXAIN',
    },
    {
        genericName: 'Hydrocortisone',
        brandNames: 'CORTEF, SOLU-CORTEF',
    },
    {
        genericName: 'Hydromorphone',
        brandNames: 'DILAUDID',
    },
    {
        genericName: 'Hydroquinone',
        brandNames: 'TRI-LUMA',
    },
    {
        genericName: 'Hydroxocobalamin',
        brandNames: 'CYANOKIT',
    },
    {
        genericName: 'Hydroxychloroquine',
        brandNames: 'PLAQUENIL',
    },
    {
        genericName: 'Hydroxyurea',
        brandNames: 'HYDREA',
    },
    {
        genericName: 'Hydroxyzine',
        brandNames: 'VISTARIL',
    },
    {
        genericName: 'Hyoscyamine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ibalizumab',
        brandNames: 'TROGARZO',
    },
    {
        genericName: 'Ibandronate',
        brandNames: 'BONIVA',
    },
    {
        genericName: 'Ibritumomab',
        brandNames: 'ZEVALIN',
    },
    {
        genericName: 'Ibrutinib',
        brandNames: 'IMBRUVICA',
    },
    {
        genericName: 'Ibuprofen',
        brandNames: 'ADVIL, MOTRIN IB',
    },
    {
        genericName: 'Ibutilide',
        brandNames: 'CORVERT',
    },
    {
        genericName: 'Icatibant',
        brandNames: 'FIRAZYR',
    },
    {
        genericName: 'Idarubicin',
        brandNames: 'IDAMYCIN PFS',
    },
    {
        genericName: 'Idarucizumab',
        brandNames: 'PRAXBIND',
    },
    {
        genericName: 'Idelalisib',
        brandNames: 'ZYDELIG',
    },
    {
        genericName: 'Idoxuridine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ifosfamide',
        brandNames: 'IFEX',
    },
    {
        genericName: 'Iloperidone',
        brandNames: 'FANAPT',
    },
    {
        genericName: 'Iloprost',
        brandNames: 'VENTAVIS',
    },
    {
        genericName: 'Imatinib',
        brandNames: 'GLEEVEC',
    },
    {
        genericName: 'Imipenem/cilastatin',
        brandNames: 'PRIMAXIN',
    },
    {
        genericName: 'Imipenem/relebactam',
        brandNames: 'RECARBRIO',
    },
    {
        genericName: 'Imipramine',
        brandNames: 'TOFRANIL',
    },
    {
        genericName: 'Imiquimod',
        brandNames: 'ALDARA',
    },
    {
        genericName: 'Immune globulin',
        brandNames: 'Gammagard S/D',
    },
    {
        genericName: 'Indacaterol',
        brandNames: 'ARCAPTA NEOHALER',
    },
    {
        genericName: 'Indapamide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Indinavir',
        brandNames: 'CRIXIVAN',
    },
    {
        genericName: 'Indomethacin',
        brandNames: 'INDOCIN',
    },
    {
        genericName: 'Infliximab',
        brandNames: 'REMICADE',
    },
    {
        genericName: 'Ingenol mebutate',
        brandNames: 'PICATO',
    },
    {
        genericName: 'Inotersen',
        brandNames: 'TEGSEDI',
    },
    {
        genericName: 'Inotuzumab ozogamicin',
        brandNames: 'BESPONSA',
    },
    {
        genericName: 'Interferon Alfa - 2b',
        brandNames: 'INTRON A',
    },
    {
        genericName: 'Interferon Alfa - n3',
        brandNames: 'ALFERON',
    },
    {
        genericName: 'Interferon Beta-1a',
        brandNames: 'AVONEX',
    },
    {
        genericName: 'Interferon Beta-1b',
        brandNames: 'EXTAVIA',
    },
    {
        genericName: 'Interferon gamma -1b',
        brandNames: 'ACTIMMUNE',
    },
    {
        genericName: 'Iodoquinol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ipilimumab',
        brandNames: 'YERVOY',
    },
    {
        genericName: 'Ipratropium',
        brandNames: 'ATROVENT',
    },
    {
        genericName: 'Irbesartan',
        brandNames: 'AVAPRO',
    },
    {
        genericName: 'Irinotecan',
        brandNames: 'CAMPTOSAR',
    },
    {
        genericName: 'Isocarboxazid',
        brandNames: 'MARPLAN',
    },
    {
        genericName: 'Isoniazid',
        brandNames: 'LANIAZID',
    },
    {
        genericName: 'Isoproterenol',
        brandNames: 'ISUPREL',
    },
    {
        genericName: 'Isosorbide dinitrate',
        brandNames: 'ISORDIL',
    },
    {
        genericName: 'Isosorbide mononitrate',
        brandNames: 'MONOKET',
    },
    {
        genericName: 'Isotretinoin',
        brandNames: 'ABSORICA',
    },
    {
        genericName: 'Isoxsuprine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Isradipine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Itraconazole',
        brandNames: 'SPORANOX',
    },
    {
        genericName: 'Ivabradine',
        brandNames: 'CORLANOR',
    },
    {
        genericName: 'Ivacaftor',
        brandNames: 'KALYDECO',
    },
    {
        genericName: 'Ivermectin',
        brandNames: 'STROMECTOL',
    },
    {
        genericName: 'Ivosidenib',
        brandNames: 'TIBSOVO',
    },
    {
        genericName: 'Ixazomib',
        brandNames: 'NINLARO',
    },
    {
        genericName: 'Ixekizumab',
        brandNames: 'TALTZ',
    },
    {
        genericName: 'Kanamycin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ketamine',
        brandNames: 'KETALAR',
    },
    {
        genericName: 'Ketoconazole',
        brandNames: 'NIZORAL',
    },
    {
        genericName: 'Ketoprofen',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ketorolac',
        brandNames: 'SPRIX',
    },
    {
        genericName: 'Ketotifen',
        brandNames: 'ALAWAY',
    },
    {
        genericName: 'Labetalol',
        brandNames: 'TRANDATE',
    },
    {
        genericName: 'Lacosamide',
        brandNames: 'VIMPAT',
    },
    {
        genericName: 'Lactulose',
        brandNames: 'CHOLAC',
    },
    {
        genericName: 'Lamivudine',
        brandNames: 'EPIVIR',
    },
    {
        genericName: 'Lamotrigine',
        brandNames: 'LAMICTAL',
    },
    {
        genericName: 'Lanreotide',
        brandNames: 'SOMATULINE DEPOT',
    },
    {
        genericName: 'Lansoprazole',
        brandNames: 'PREVACID',
    },
    {
        genericName: 'Lanthanum',
        brandNames: 'FOSRENOL',
    },
    {
        genericName: 'Lapatinib',
        brandNames: 'TYKERB',
    },
    {
        genericName: 'Latanoprost',
        brandNames: 'XALATAN',
    },
    {
        genericName: 'Ledipasvir',
        brandNames: 'HARVONI',
    },
    {
        genericName: 'Leflunomide',
        brandNames: 'ARAVA',
    },
    {
        genericName: 'Lenalidomide',
        brandNames: 'REVLIMID',
    },
    {
        genericName: 'Lenvatinib',
        brandNames: 'LENVIMA',
    },
    {
        genericName: 'Lepirudin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Letrozole',
        brandNames: 'FEMARA',
    },
    {
        genericName: 'Leucovorin calcium',
        brandNames: 'FUSILEV',
    },
    {
        genericName: 'Leuprolide',
        brandNames: 'LUPRON',
    },
    {
        genericName: 'Levalbuterol',
        brandNames: 'XOPENEX',
    },
    {
        genericName: 'Levetiracetam',
        brandNames: 'KEPPRA',
    },
    {
        genericName: 'Levobunolol',
        brandNames: 'BETAGAN',
    },
    {
        genericName: 'Levocabastine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Levocetirizine',
        brandNames: 'XYZAL',
    },
    {
        genericName: 'Levodopa',
        brandNames: 'INBRIJA',
    },
    {
        genericName: 'Levofloxacin',
        brandNames: 'LEVAQUIN',
    },
    {
        genericName: 'Levomilnacipran',
        brandNames: 'FETZIMA',
    },
    {
        genericName: 'Levonorgestrel',
        brandNames: 'MIRENA, PLAN B',
    },
    {
        genericName: 'Levorphanol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Levothyroxine',
        brandNames: 'LEVOXYL, SYNTHROID',
    },
    {
        genericName: 'Lidocaine',
        brandNames: 'XYLOCAINE',
    },
    {
        genericName: 'Lidocaine/tetracaine',
        brandNames: 'PLIAGLIS',
    },
    {
        genericName: 'Linaclotide',
        brandNames: 'LINZESS',
    },
    {
        genericName: 'Linagliptin',
        brandNames: 'TRADJENTA',
    },
    {
        genericName: 'Lindane',
        brandNames: 'No US brand names',
    },
    {
        genericName: 'Linezolid',
        brandNames: 'ZYVOX',
    },
    {
        genericName: 'Liothyronine',
        brandNames: 'CYTOMEL',
    },
    {
        genericName: 'Liraglutide',
        brandNames: 'VICTOZA',
    },
    {
        genericName: 'Lisinopril',
        brandNames: 'PRINIVIL, ZESTRIL',
    },
    {
        genericName: 'Lithium',
        brandNames: 'LITHOBID',
    },
    {
        genericName: 'Lixisenatide',
        brandNames: 'ADLYXIN',
    },
    {
        genericName: 'Lodoxamide',
        brandNames: 'ALOMIDE',
    },
    {
        genericName: 'Lomitapide',
        brandNames: 'JUXTAPID',
    },
    {
        genericName: 'Lomustine',
        brandNames: 'GLEOSTINE',
    },
    {
        genericName: 'Loperamide',
        brandNames: 'IMODIUM',
    },
    {
        genericName: 'Lopinavir/ritonavir',
        brandNames: 'KALETRA',
    },
    {
        genericName: 'Loratadine',
        brandNames: 'ALAVERT, CLARITIN',
    },
    {
        genericName: 'Lorazepam',
        brandNames: 'ATIVAN',
    },
    {
        genericName: 'Lorcaserin',
        brandNames: 'BELVIQ',
    },
    {
        genericName: 'Losartan',
        brandNames: 'COZAAR',
    },
    {
        genericName: 'Loteprednol',
        brandNames: 'ALREX, LOTEMAX',
    },
    {
        genericName: 'Lovastatin',
        brandNames: 'ALTOPREV',
    },
    {
        genericName: 'Loxapine',
        brandNames: 'ADASUVE',
    },
    {
        genericName: 'Lubiprostone',
        brandNames: 'AMITIZA',
    },
    {
        genericName: 'Lurasidone',
        brandNames: 'LATUDA',
    },
    {
        genericName: 'Macitentan',
        brandNames: 'OPSUMIT',
    },
    {
        genericName: 'Mafenide',
        brandNames: 'SULFAMYLON',
    },
    {
        genericName: 'Magnesium salicylate',
        brandNames: "DOAN'S EXTRA STRENGTH",
    },
    {
        genericName: 'Magnesium sulfate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Mannitol',
        brandNames: 'OSMITROL, RESECTISOL',
    },
    {
        genericName: 'Maprotiline',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Maraviroc',
        brandNames: 'SELZENTRY',
    },
    {
        genericName: 'Mebendazole',
        brandNames: 'EMVERM',
    },
    {
        genericName: 'Mechlorethamine',
        brandNames: 'MUSTARGEN',
    },
    {
        genericName: 'Meclizine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Meclofenamate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Medroxyprogesterone',
        brandNames: 'PROVERA',
    },
    {
        genericName: 'Mefenamic acid',
        brandNames: 'PONSTEL',
    },
    {
        genericName: 'Mefloquine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Megestrol',
        brandNames: 'MEGACE',
    },
    {
        genericName: 'Meloxicam',
        brandNames: 'MOBIC',
    },
    {
        genericName: 'Melphalan',
        brandNames: 'ALKERAN',
    },
    {
        genericName: 'Memantine',
        brandNames: 'NAMENDA',
    },
    {
        genericName: 'Meperidine',
        brandNames: 'DEMEROL',
    },
    {
        genericName: 'Mephobarbital',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Mepolizumab',
        brandNames: 'NUCALA',
    },
    {
        genericName: 'Meprobamate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Mercaptopurine',
        brandNames: 'PURINETHOL',
    },
    {
        genericName: 'Meropenem',
        brandNames: 'MERREM',
    },
    {
        genericName: 'Meropenem/vaborbactam',
        brandNames: 'VABOMERE',
    },
    {
        genericName: 'Mesalamine',
        brandNames: 'ASACOL, ROWASA',
    },
    {
        genericName: 'Mesna',
        brandNames: 'MESNEX',
    },
    {
        genericName: 'Metaxalone',
        brandNames: 'SKELAXIN',
    },
    {
        genericName: 'Metformin',
        brandNames: 'GLUCOPHAGE',
    },
    {
        genericName: 'Methadone',
        brandNames: 'DOLOPHINE',
    },
    {
        genericName: 'Methamphetamine',
        brandNames: 'DESOXYN',
    },
    {
        genericName: 'Methazolamide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Methenamine',
        brandNames: 'HIPREX, UREX',
    },
    {
        genericName: 'Methimazole',
        brandNames: 'TAPAZOLE',
    },
    {
        genericName: 'Methocarbamol',
        brandNames: 'ROBAXIN',
    },
    {
        genericName: 'Methohexital',
        brandNames: 'BREVITAL SODIUM',
    },
    {
        genericName: 'Methotrexate',
        brandNames: 'OTREXUP',
    },
    {
        genericName: 'Methoxsalen',
        brandNames: 'OXSORALEN, UVADEX',
    },
    {
        genericName: 'Methsuximide',
        brandNames: 'CELONTIN',
    },
    {
        genericName: 'Methyclothiazide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Methyldopa',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Methylene blue',
        brandNames: 'PROVAYBLUE',
    },
    {
        genericName: 'Methylergonovine',
        brandNames: 'METHERGINE',
    },
    {
        genericName: 'Methylphenidate',
        brandNames: 'CONCERTA, RITALIN',
    },
    {
        genericName: 'Methylprednisolone',
        brandNames: 'MEDROL',
    },
    {
        genericName: 'Methyltestosterone',
        brandNames: 'TESTRED',
    },
    {
        genericName: 'Metipranolol',
        brandNames: 'OPTIPRANOLOL',
    },
    {
        genericName: 'Metoclopramide',
        brandNames: 'REGLAN',
    },
    {
        genericName: 'Metolazone',
        brandNames: 'ZAROXOLYN',
    },
    {
        genericName: 'Metoprolol',
        brandNames: 'LOPRESSOR, TOPROL-XL',
    },
    {
        genericName: 'Metronidazole',
        brandNames: 'FLAGYL',
    },
    {
        genericName: 'Metyrapone',
        brandNames: 'METOPIRONE',
    },
    {
        genericName: 'Metyrosine',
        brandNames: 'DEMSER',
    },
    {
        genericName: 'Mexiletine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Micafungin',
        brandNames: 'MYCAMINE',
    },
    {
        genericName: 'Miconazole',
        brandNames: 'MONISTAT 3',
    },
    {
        genericName: 'Midazolam',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Midodrine',
        brandNames: 'ORVATEN',
    },
    {
        genericName: 'Midostaurin',
        brandNames: 'RYDAPT',
    },
    {
        genericName: 'Mifepristone',
        brandNames: 'MIFEPREX',
    },
    {
        genericName: 'Miglitol',
        brandNames: 'GLYSET',
    },
    {
        genericName: 'Miglustat',
        brandNames: 'ZAVESCA',
    },
    {
        genericName: 'Milnacipran',
        brandNames: 'SAVELLA',
    },
    {
        genericName: 'Milrinone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Minocycline',
        brandNames: 'MINOCIN',
    },
    {
        genericName: 'Minoxidil',
        brandNames: 'ROGAINE',
    },
    {
        genericName: 'Mipomersen',
        brandNames: 'KYNAMRO',
    },
    {
        genericName: 'Mirabegron',
        brandNames: 'MYRBETRIQ',
    },
    {
        genericName: 'Mirtazapine',
        brandNames: 'REMERON',
    },
    {
        genericName: 'Misoprostol',
        brandNames: 'CYTOTEC',
    },
    {
        genericName: 'Mitomycin',
        brandNames: 'MITOSOL',
    },
    {
        genericName: 'Mitotane',
        brandNames: 'LYSODREN',
    },
    {
        genericName: 'Mitoxantrone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Moclobemide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Modafinil',
        brandNames: 'PROVIGIL',
    },
    {
        genericName: 'Moexipril',
        brandNames: 'No USbrand name',
    },
    {
        genericName: 'Mometasone',
        brandNames: 'ELOCON, NASONEX',
    },
    {
        genericName: 'Montelukast',
        brandNames: 'SINGULAIR',
    },
    {
        genericName: 'Morphine',
        brandNames: 'DURAMORPH PF, MS CONTIN',
    },
    {
        genericName: 'Moxifloxacin',
        brandNames: 'AVELOX',
    },
    {
        genericName: 'Mupirocin',
        brandNames: 'BACTROBAN',
    },
    {
        genericName: 'Mycophenolate',
        brandNames: 'CELLCEPT',
    },
    {
        genericName: 'Nabumetone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Nadolol',
        brandNames: 'CORGARD',
    },
    {
        genericName: 'Nadroparin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Nafarelin',
        brandNames: 'SYNAREL',
    },
    {
        genericName: 'Nafcillin',
        brandNames: 'NALLPEN IN PLASTIC CONTAINER',
    },
    {
        genericName: 'Naloxone',
        brandNames: 'EVZIO',
    },
    {
        genericName: 'Naltrexone',
        brandNames: 'VIVITROL',
    },
    {
        genericName: 'Naphazoline',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Naproxen',
        brandNames: 'ALEVE, NAPROSYN',
    },
    {
        genericName: 'Naratriptan',
        brandNames: 'AMERGE',
    },
    {
        genericName: 'Natalizumab',
        brandNames: 'TYSABRI',
    },
    {
        genericName: 'Natamycin',
        brandNames: 'NATACYN',
    },
    {
        genericName: 'Nateglinide',
        brandNames: 'STARLIX',
    },
    {
        genericName: 'Nebivolol',
        brandNames: 'BYSTOLIC',
    },
    {
        genericName: 'Necitumumab',
        brandNames: 'PORTRAZZA',
    },
    {
        genericName: 'Nedocromil',
        brandNames: 'ALOCRIL',
    },
    {
        genericName: 'Nefazodone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Nelarabine',
        brandNames: 'ARRANON',
    },
    {
        genericName: 'Nelfinavir',
        brandNames: 'VIRACEPT',
    },
    {
        genericName: 'Neomycin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Neostigmine',
        brandNames: 'BLOXIVERZ',
    },
    {
        genericName: 'Neratinib',
        brandNames: 'NERLYNX',
    },
    {
        genericName: 'Nesiritide',
        brandNames: 'NATRECOR',
    },
    {
        genericName: 'Nevirapine',
        brandNames: 'VIRAMUNE',
    },
    {
        genericName: 'Niacin',
        brandNames: 'NIACOR, NIASPAN',
    },
    {
        genericName: 'Niacinamide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Nicardipine',
        brandNames: 'CARDENE',
    },
    {
        genericName: 'Nicotine',
        brandNames: 'COMMIT, NICORETTE, NICOTROL',
    },
    {
        genericName: 'Nifedipine',
        brandNames: 'ADALAT CC, PROCARDIA',
    },
    {
        genericName: 'Nilotinib',
        brandNames: 'TASIGNA',
    },
    {
        genericName: 'Nilutamide',
        brandNames: 'NILANDRON',
    },
    {
        genericName: 'Nimodipine',
        brandNames: 'NYMALIZE',
    },
    {
        genericName: 'Nintedanib',
        brandNames: 'OFEV',
    },
    {
        genericName: 'Niraparib',
        brandNames: 'ZEJULA',
    },
    {
        genericName: 'Nisoldipine',
        brandNames: 'SULAR',
    },
    {
        genericName: 'Nitazoxanide',
        brandNames: 'ALINIA',
    },
    {
        genericName: 'Nitrofurantoin',
        brandNames: 'FURADANTIN, MACROBID, MACRODANTIN',
    },
    {
        genericName: 'Nitroglycerin',
        brandNames: 'NITRO-DUR',
    },
    {
        genericName: 'Nitroprusside',
        brandNames: 'NITROPRESS',
    },
    {
        genericName: 'Nivolumab',
        brandNames: 'OPDIVO',
    },
    {
        genericName: 'Nizatidine',
        brandNames: 'AXID AR',
    },
    {
        genericName: 'Norepinephrine',
        brandNames: 'LEVOPHED',
    },
    {
        genericName: 'Norethindrone',
        brandNames: 'AYGESTIN, CAMILA',
    },
    {
        genericName: 'Norfloxacin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Nortriptyline',
        brandNames: 'PAMELOR',
    },
    {
        genericName: 'Nusinersen',
        brandNames: 'SPINRAZA',
    },
    {
        genericName: 'Nylidrin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Nystatin',
        brandNames: 'NYSTOP',
    },
    {
        genericName: 'Obeticholic Acid',
        brandNames: 'OCALIVA',
    },
    {
        genericName: 'Obiltoxaximab',
        brandNames: 'ANTHIM',
    },
    {
        genericName: 'Obinutuzumab',
        brandNames: 'GAZYVA',
    },
    {
        genericName: 'Ocrelizumab',
        brandNames: 'OCREVUS',
    },
    {
        genericName: 'Octreotide',
        brandNames: 'SANDOSTATIN',
    },
    {
        genericName: 'Ofatumumab',
        brandNames: 'ARZERRA',
    },
    {
        genericName: 'Ofloxacin',
        brandNames: 'OCUFLOX',
    },
    {
        genericName: 'Olanzapine',
        brandNames: 'ZYPREXA',
    },
    {
        genericName: 'Olaparib',
        brandNames: 'LYNPARZA',
    },
    {
        genericName: 'Olaratumab',
        brandNames: 'LARTRUVO',
    },
    {
        genericName: 'Olmesartan',
        brandNames: 'BENICAR',
    },
    {
        genericName: 'Olodaterol',
        brandNames: 'STRIVERDI RESPIMAT',
    },
    {
        genericName: 'Olopatadine',
        brandNames: 'PATANOL',
    },
    {
        genericName: 'Olsalazine',
        brandNames: 'DIPENTUM',
    },
    {
        genericName: 'Omalizumab',
        brandNames: 'XOLAIR',
    },
    {
        genericName: 'Ombitasvir, Paritaprevir, and Ritonavir',
        brandNames: 'TECHNIVIE',
    },
    {
        genericName: 'Ombitasvir, Paritaprevir, Ritonavir, and Dasabuvir',
        brandNames: 'VIEKIRA PAK',
    },
    {
        genericName: 'Omeprazole',
        brandNames: 'PRILOSEC',
    },
    {
        genericName: 'OnabotulinumtoxinA',
        brandNames: 'BOTOX',
    },
    {
        genericName: 'Ondansetron',
        brandNames: 'ZOFRAN',
    },
    {
        genericName: 'Opium tincture',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Oprelvekin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Oritavancin',
        brandNames: 'ORBACTIV',
    },
    {
        genericName: 'Orlistat',
        brandNames: 'ALLI, XENICAL',
    },
    {
        genericName: 'Orphenadrine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Oseltamivir',
        brandNames: 'TAMIFLU',
    },
    {
        genericName: 'Osimertinib',
        brandNames: 'TAGRISSO',
    },
    {
        genericName: 'Oxacillin',
        brandNames: 'BACTOCILL IN PLASTIC CONTAINER',
    },
    {
        genericName: 'Oxaliplatin',
        brandNames: 'ELOXATIN',
    },
    {
        genericName: 'Oxaprozin',
        brandNames: 'DAYPRO',
    },
    {
        genericName: 'Oxazepam',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Oxcarbazepine',
        brandNames: 'TRILEPTAL',
    },
    {
        genericName: 'Oxiconazole',
        brandNames: 'OXISTAT',
    },
    {
        genericName: 'Oxybutynin',
        brandNames: 'DITROPAN XL',
    },
    {
        genericName: 'Oxycodone',
        brandNames: 'OXYCONTIN',
    },
    {
        genericName: 'Oxycodone/acetaminophen',
        brandNames: 'PERCOCET',
    },
    {
        genericName: 'Oxymetazoline',
        brandNames: 'RHOFADE',
    },
    {
        genericName: 'Oxymetholone',
        brandNames: 'ANADROL-50',
    },
    {
        genericName: 'Oxytocin',
        brandNames: 'PITOCIN',
    },
    {
        genericName: 'Ozenoxacin',
        brandNames: 'XEPI',
    },
    {
        genericName: 'Paclitaxel',
        brandNames: 'TAXOL',
    },
    {
        genericName: 'Paliperidone',
        brandNames: 'INVEGA',
    },
    {
        genericName: 'Palivizumab',
        brandNames: 'SYNAGIS',
    },
    {
        genericName: 'Palonosetron',
        brandNames: 'ALOXI',
    },
    {
        genericName: 'Pamidronate',
        brandNames: 'AREDIA',
    },
    {
        genericName: 'Pancrelipase',
        brandNames: 'PANCREAZE',
    },
    {
        genericName: 'Pancuronium',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Panitumumab',
        brandNames: 'VECTIBIX',
    },
    {
        genericName: 'Pantoprazole',
        brandNames: 'PROTONIX',
    },
    {
        genericName: 'Papaverine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Paregoric',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Paromomycin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Paroxetine',
        brandNames: 'PAXIL',
    },
    {
        genericName: 'Pasireotide',
        brandNames: 'SIGNIFOR',
    },
    {
        genericName: 'Patiromer',
        brandNames: 'VELTASSA',
    },
    {
        genericName: 'Patisiran',
        brandNames: 'ONPATTRO',
    },
    {
        genericName: 'Pazopanib',
        brandNames: 'VOTRIENT',
    },
    {
        genericName: 'Pegaptanib',
        brandNames: 'MACUGEN',
    },
    {
        genericName: 'Pegfilgrastim',
        brandNames: 'NEULASTA',
    },
    {
        genericName: 'Peginterferon Alfa - 2a',
        brandNames: 'PEGASYS',
    },
    {
        genericName: 'Peginterferon Alfa - 2b',
        brandNames: 'PEGINTRON',
    },
    {
        genericName: 'Pegloticase',
        brandNames: 'KRYSTEXXA',
    },
    {
        genericName: 'Pegvisomant',
        brandNames: 'SOMAVERT',
    },
    {
        genericName: 'Pembrolizumab',
        brandNames: 'KEYTRUDA',
    },
    {
        genericName: 'Pemetrexed',
        brandNames: 'ALIMTA',
    },
    {
        genericName: 'Penciclovir',
        brandNames: 'DENAVIR',
    },
    {
        genericName: 'Penicillamine',
        brandNames: 'CUPRIMINE',
    },
    {
        genericName: 'Penicillin G (parenteral/aqueous)',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Penicillin G benzathine',
        brandNames: 'BICILLIN L-A',
    },
    {
        genericName: 'Penicillin G procaine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Penicillin V potassium',
        brandNames: 'PENICILLIN-VK',
    },
    {
        genericName: 'Pentamidine',
        brandNames: 'NEBUPENT',
    },
    {
        genericName: 'Pentazocine',
        brandNames: 'TALWIN',
    },
    {
        genericName: 'Pentobarbital',
        brandNames: 'NEMBUTAL SODIUM',
    },
    {
        genericName: 'Pentosan polysulfate sodium',
        brandNames: 'ELMIRON',
    },
    {
        genericName: 'Pentostatin',
        brandNames: 'NIPENT',
    },
    {
        genericName: 'Pentoxifylline',
        brandNames: 'PENTOXILL',
    },
    {
        genericName: 'Peramivir',
        brandNames: 'RAPIVAB',
    },
    {
        genericName: 'Perindopril erbumine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Permethrin',
        brandNames: 'ELIMITE, NIX',
    },
    {
        genericName: 'Perphenazine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Pertuzumab',
        brandNames: 'PERJETA',
    },
    {
        genericName: 'Phenazopyridine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Phenelzine',
        brandNames: 'NARDIL',
    },
    {
        genericName: 'Phenobarbital',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Phenoxybenzamine',
        brandNames: 'DIBENZYLINE',
    },
    {
        genericName: 'Phentermine',
        brandNames: 'ADIPEX-P',
    },
    {
        genericName: 'Phentolamine',
        brandNames: 'ORAVERSE',
    },
    {
        genericName: 'Phenylephrine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Phenytoin',
        brandNames: 'DILANTIN',
    },
    {
        genericName: 'Physostigmine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Phytonadione',
        brandNames: 'MEPHYTON',
    },
    {
        genericName: 'Pibrentasvir',
        brandNames: 'MAVYRET',
    },
    {
        genericName: 'Pilocarpine',
        brandNames: 'ISOPTO CARPINE, SALAGEN',
    },
    {
        genericName: 'Pimecrolimus',
        brandNames: 'ELIDEL',
    },
    {
        genericName: 'Pimozide',
        brandNames: 'ORAP',
    },
    {
        genericName: 'Pindolol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Pioglitazone',
        brandNames: 'ACTOS',
    },
    {
        genericName: 'Piperacillin/tazobactam',
        brandNames: 'ZOSYN',
    },
    {
        genericName: 'Pirbuterol',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Pirfenidone',
        brandNames: 'ESBRIET',
    },
    {
        genericName: 'Piroxicam',
        brandNames: 'FELDENE',
    },
    {
        genericName: 'Pitavastatin',
        brandNames: 'LIVALO',
    },
    {
        genericName: 'Podophyllum resin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Polidocanol',
        brandNames: 'ASCLERA',
    },
    {
        genericName: 'Polyethylene Glycol - Electrolyte Solution',
        brandNames: 'COLYTE',
    },
    {
        genericName: 'Polymyxin B',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Pomalidomide',
        brandNames: 'POMALYST',
    },
    {
        genericName: 'Ponatinib',
        brandNames: 'ICLUSIG',
    },
    {
        genericName: 'Poractant alfa',
        brandNames: 'CUROSURF',
    },
    {
        genericName: 'Posaconazole',
        brandNames: 'NOXAFIL',
    },
    {
        genericName: 'Potassium chloride',
        brandNames: 'K-TAB, KLOR-CON',
    },
    {
        genericName: 'Potassium iodide',
        brandNames: 'THYROSHIELD',
    },
    {
        genericName: 'Povidone-iodine',
        brandNames: 'BETADINE',
    },
    {
        genericName: 'Pralidoxime',
        brandNames: 'PROTOPAM CHLORIDE',
    },
    {
        genericName: 'Pramipexole',
        brandNames: 'MIRAPEX',
    },
    {
        genericName: 'Pramlintide',
        brandNames: 'SYMLIN',
    },
    {
        genericName: 'Pramoxine',
        brandNames: 'EPIFOAM',
    },
    {
        genericName: 'Prasugrel',
        brandNames: 'EFFIENT',
    },
    {
        genericName: 'Pravastatin',
        brandNames: 'PRAVACHOL',
    },
    {
        genericName: 'Praziquantel',
        brandNames: 'BILTRICIDE',
    },
    {
        genericName: 'Prazosin',
        brandNames: 'MINIPRESS',
    },
    {
        genericName: 'Prednisolone',
        brandNames: 'ORAPRED ODT, PRELONE',
    },
    {
        genericName: 'Prednisone',
        brandNames: 'RAYOS',
    },
    {
        genericName: 'Pregabalin',
        brandNames: 'LYRICA',
    },
    {
        genericName: 'Primaquine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Primidone',
        brandNames: 'MYSOLINE',
    },
    {
        genericName: 'Probenecid',
        brandNames: 'PROBALAN',
    },
    {
        genericName: 'Procainamide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Procarbazine',
        brandNames: 'MATULANE',
    },
    {
        genericName: 'Prochlorperazine',
        brandNames: 'COMPRO',
    },
    {
        genericName: 'Procyclidine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Progesterone',
        brandNames: 'CRINONE',
    },
    {
        genericName: 'Promethazine',
        brandNames: 'PROMETHEGAN',
    },
    {
        genericName: 'Propafenone',
        brandNames: 'RYTHMOL',
    },
    {
        genericName: 'Propantheline',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Proparacaine',
        brandNames: 'ALCAINE',
    },
    {
        genericName: 'Propofol',
        brandNames: 'DIPRIVAN',
    },
    {
        genericName: 'Propranolol',
        brandNames: 'INDERAL',
    },
    {
        genericName: 'Propylthiouracil',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Protamine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Protein C Concentrate (Human)',
        brandNames: 'Ceprotin',
    },
    {
        genericName: 'Prothrombin complex concentrate (human) ([Factors II, VII, IX, X], Protein C, and Protein S)',
        brandNames: 'Kcentra',
    },
    {
        genericName: 'Protriptyline',
        brandNames: 'VIVACTIL',
    },
    {
        genericName: 'Pseudoephedrine',
        brandNames: 'AFRINOL, SUDAFED',
    },
    {
        genericName: 'Pyrantel pamoate',
        brandNames: 'PIN-X',
    },
    {
        genericName: 'Pyrazinamide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Pyrethrins/piperonyl butoxide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Pyridostigmine',
        brandNames: 'MESTINON',
    },
    {
        genericName: 'Pyrimethamine',
        brandNames: 'DARAPRIM',
    },
    {
        genericName: 'Quazepam',
        brandNames: 'DORAL',
    },
    {
        genericName: 'Quetiapine',
        brandNames: 'SEROQUEL',
    },
    {
        genericName: 'Quinagolide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Quinapril',
        brandNames: 'ACCUPRIL',
    },
    {
        genericName: 'Quinidine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Quinine',
        brandNames: 'QUALAQUIN',
    },
    {
        genericName: 'Quinupristin/dalfopristin',
        brandNames: 'SYNERCID',
    },
    {
        genericName: 'Rabeprazole',
        brandNames: 'ACIPHEX',
    },
    {
        genericName: 'Raloxifene',
        brandNames: 'EVISTA',
    },
    {
        genericName: 'Raltegravir',
        brandNames: 'ISENTRESS',
    },
    {
        genericName: 'Ramelteon',
        brandNames: 'ROZEREM',
    },
    {
        genericName: 'Ramipril',
        brandNames: 'ALTACE',
    },
    {
        genericName: 'Ramucirumab',
        brandNames: 'CYRAMZA',
    },
    {
        genericName: 'Ranibizumab',
        brandNames: 'LUCENTIS',
    },
    {
        genericName: 'Ranitidine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ranolazine',
        brandNames: 'RANEXA',
    },
    {
        genericName: 'Rasagiline',
        brandNames: 'AZILECT',
    },
    {
        genericName: 'Rasburicase',
        brandNames: 'ELITEK',
    },
    {
        genericName: 'Raxibacumab',
        brandNames: 'RAXIBACUMAB',
    },
    {
        genericName: 'Regorafenib',
        brandNames: 'STIVARGA',
    },
    {
        genericName: 'Repaglinide',
        brandNames: 'PRANDIN',
    },
    {
        genericName: 'Reserpine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Reslizumab',
        brandNames: 'CINQAIR',
    },
    {
        genericName: 'Retapamulin',
        brandNames: 'ALTABAX',
    },
    {
        genericName: 'Reteplase',
        brandNames: 'RETAVASE',
    },
    {
        genericName: 'Rho(D) immune globulin',
        brandNames: 'RhoGAM',
    },
    {
        genericName: 'Ribavirin',
        brandNames: 'VIRAZOLE',
    },
    {
        genericName: 'Rifabutin',
        brandNames: 'MYCOBUTIN',
    },
    {
        genericName: 'Rifampin',
        brandNames: 'RIFADIN, RIMACTANE',
    },
    {
        genericName: 'Rifamycin',
        brandNames: 'AEMCOLO',
    },
    {
        genericName: 'Rifapentine',
        brandNames: 'PRIFTIN',
    },
    {
        genericName: 'Rifaximin',
        brandNames: 'XIFAXAN',
    },
    {
        genericName: 'Rilonacept',
        brandNames: 'ARCALYST',
    },
    {
        genericName: 'Rilpivirine',
        brandNames: 'EDURANT',
    },
    {
        genericName: 'Riluzole',
        brandNames: 'RILUTEK',
    },
    {
        genericName: 'RimabotulinumtoxinB',
        brandNames: 'MYOBLOC',
    },
    {
        genericName: 'Rimantadine',
        brandNames: 'FLUMADINE',
    },
    {
        genericName: 'Riociguat',
        brandNames: 'ADEMPAS',
    },
    {
        genericName: 'Risedronate',
        brandNames: 'ACTONEL',
    },
    {
        genericName: 'Risperidone',
        brandNames: 'RISPERDAL',
    },
    {
        genericName: 'Ritonavir',
        brandNames: 'NORVIR',
    },
    {
        genericName: 'Rituximab',
        brandNames: 'RITUXAN',
    },
    {
        genericName: 'Rivaroxaban',
        brandNames: 'XARELTO',
    },
    {
        genericName: 'Rivastigmine',
        brandNames: 'EXELON',
    },
    {
        genericName: 'Rizatriptan',
        brandNames: 'MAXALT',
    },
    {
        genericName: 'Rocuronium',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Roflumilast',
        brandNames: 'DALIRESP',
    },
    {
        genericName: 'Romiplostim',
        brandNames: 'NPLATE',
    },
    {
        genericName: 'Ropinirole',
        brandNames: 'REQUIP',
    },
    {
        genericName: 'Rosiglitazone',
        brandNames: 'AVANDIA',
    },
    {
        genericName: 'Rosuvastatin',
        brandNames: 'CRESTOR',
    },
    {
        genericName: 'Rotigotine',
        brandNames: 'NEUPRO',
    },
    {
        genericName: 'Ruxolitinib',
        brandNames: 'JAKAFI',
    },
    {
        genericName: 'Sacubitril/Valsartan',
        brandNames: 'ENTRESTO',
    },
    {
        genericName: 'Salicylic acid',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Salmeterol',
        brandNames: 'SEREVENT',
    },
    {
        genericName: 'Salsalate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Sapropterin',
        brandNames: 'KUVAN',
    },
    {
        genericName: 'Saquinavir',
        brandNames: 'INVIRASE',
    },
    {
        genericName: 'Sargramostim',
        brandNames: 'LEUKINE',
    },
    {
        genericName: 'Sarilumab',
        brandNames: 'KEVZARA',
    },
    {
        genericName: 'Saxagliptin',
        brandNames: 'ONGLYZA',
    },
    {
        genericName: 'Scopolamine',
        brandNames: 'TRANSDERM SCOP',
    },
    {
        genericName: 'Secnidazole',
        brandNames: 'SOLOSEC',
    },
    {
        genericName: 'Secobarbital',
        brandNames: 'SECONAL',
    },
    {
        genericName: 'Secukinumab',
        brandNames: 'COSENTYX',
    },
    {
        genericName: 'Selegiline',
        brandNames: 'ELDEPRYL',
    },
    {
        genericName: 'Selenium sulfide',
        brandNames: 'SELSUN',
    },
    {
        genericName: 'Selexipag',
        brandNames: 'UPTRAVI',
    },
    {
        genericName: 'Selinexor',
        brandNames: 'XPOVIO',
    },
    {
        genericName: 'Semaglutide',
        brandNames: 'OZEMPIC',
    },
    {
        genericName: 'Sertraline',
        brandNames: 'ZOLOFT',
    },
    {
        genericName: 'Sevelamer',
        brandNames: 'RENAGEL',
    },
    {
        genericName: 'Sildenafil',
        brandNames: 'VIAGRA',
    },
    {
        genericName: 'Silodosin',
        brandNames: 'RAPAFLO',
    },
    {
        genericName: 'Siltuximab',
        brandNames: 'SYLVANT',
    },
    {
        genericName: 'Silver nitrate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Silver sulfadiazine',
        brandNames: 'SILVADENE',
    },
    {
        genericName: 'Simeprevir',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Simethicone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Simvastatin',
        brandNames: 'ZOCOR',
    },
    {
        genericName: 'Sipuleucel-T',
        brandNames: 'PROVENGE',
    },
    {
        genericName: 'Sirolimus',
        brandNames: 'RAPAMUNE',
    },
    {
        genericName: 'Sitagliptin',
        brandNames: 'JANUVIA',
    },
    {
        genericName: 'Sodium bicarbonate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Sodium oxybate',
        brandNames: 'XYREM',
    },
    {
        genericName: 'Sodium phosphates',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Sodium polystyrene sulfonate',
        brandNames: 'KALEXATE',
    },
    {
        genericName: 'Sodium tetradecyl sulfate',
        brandNames: 'SOTRADECOL',
    },
    {
        genericName: 'Sodium thiosulfate',
        brandNames: 'NITHIODOTE',
    },
    {
        genericName: 'Sofosbuvir',
        brandNames: 'SOVALDI',
    },
    {
        genericName: 'Sofosbuvir/velpatasvir',
        brandNames: 'EPCLUSA',
    },
    {
        genericName: 'Sofosbuvir/velpatasvir/voxilaprevir',
        brandNames: 'VOSEVI',
    },
    {
        genericName: 'Solifenacin',
        brandNames: 'VESICARE',
    },
    {
        genericName: 'Somatropin',
        brandNames: 'HUMATROPE',
    },
    {
        genericName: 'Sonidegib',
        brandNames: 'ODOMZO',
    },
    {
        genericName: 'Sorafenib',
        brandNames: 'NEXAVAR',
    },
    {
        genericName: 'Sotalol',
        brandNames: 'BETAPACE',
    },
    {
        genericName: 'Spiramycin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Spironolactone',
        brandNames: 'ALDACTONE',
    },
    {
        genericName: 'Stavudine',
        brandNames: 'ZERIT',
    },
    {
        genericName: 'Streptomycin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Streptozocin',
        brandNames: 'ZANOSAR',
    },
    {
        genericName: 'Succimer',
        brandNames: 'CHEMET',
    },
    {
        genericName: 'Succinylcholine',
        brandNames: 'ANECTINE, QUELICIN',
    },
    {
        genericName: 'Sucralfate',
        brandNames: 'CARAFATE',
    },
    {
        genericName: 'Sufentanil',
        brandNames: 'DSUVIA',
    },
    {
        genericName: 'Sulconazole',
        brandNames: 'EXELDERM',
    },
    {
        genericName: 'Sulfacetamide',
        brandNames: 'BLEPH-10',
    },
    {
        genericName: 'Sulfadiazine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Sulfadoxine/pyrimethamine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Sulfasalazine',
        brandNames: 'AZULFIDINE',
    },
    {
        genericName: 'Sulindac',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Sumatriptan',
        brandNames: 'IMITREX',
    },
    {
        genericName: 'Sunitinib',
        brandNames: 'SUTENT',
    },
    {
        genericName: 'Suramin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Suvorexant',
        brandNames: 'BELSOMRA',
    },
    {
        genericName: 'Tacrolimus',
        brandNames: 'PROGRAF',
    },
    {
        genericName: 'Tadalafil',
        brandNames: 'CIALIS',
    },
    {
        genericName: 'Tafamidis',
        brandNames: 'VYNDAMAX',
    },
    {
        genericName: 'Tafluprost',
        brandNames: 'ZIOPTAN',
    },
    {
        genericName: 'Tamoxifen',
        brandNames: 'SOLTAMOX',
    },
    {
        genericName: 'Tamsulosin',
        brandNames: 'FLOMAX',
    },
    {
        genericName: 'Tazarotene',
        brandNames: 'AVAGE, TAZORAC',
    },
    {
        genericName: 'Tecovirimat',
        brandNames: 'TPOXX',
    },
    {
        genericName: 'Tedizolid',
        brandNames: 'SIVEXTRO',
    },
    {
        genericName: 'Teduglutide',
        brandNames: 'GATTEX',
    },
    {
        genericName: 'Tegaserod',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Telavancin',
        brandNames: 'VIBATIV',
    },
    {
        genericName: 'Telbivudine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Telithromycin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Telmisartan',
        brandNames: 'MICARDIS',
    },
    {
        genericName: 'Temazepam',
        brandNames: 'RESTORIL',
    },
    {
        genericName: 'Temozolomide',
        brandNames: 'TEMODAR',
    },
    {
        genericName: 'Temsirolimus',
        brandNames: 'TORISEL',
    },
    {
        genericName: 'Tenecteplase',
        brandNames: 'TNKASE',
    },
    {
        genericName: 'Teniposide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tenofovir disoproxil fumarate',
        brandNames: 'VIREAD',
    },
    {
        genericName: 'Terazosin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Terbinafine',
        brandNames: 'LAMISIL',
    },
    {
        genericName: 'Terbutaline',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Terconazole',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Teriparatide',
        brandNames: 'FORTEO',
    },
    {
        genericName: 'Testosterone',
        brandNames: 'DELATESTRYL',
    },
    {
        genericName: 'Tetanus immune globulin',
        brandNames: 'Hypertet',
    },
    {
        genericName: 'Tetracaine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tetracaine/lidocaine',
        brandNames: 'SYNERA',
    },
    {
        genericName: 'Tetracycline',
        brandNames: 'ACHROMYCIN V',
    },
    {
        genericName: 'Tetrahydrozoline',
        brandNames: 'TYZINE',
    },
    {
        genericName: 'Tezacaftor',
        brandNames: 'SYMDEKO',
    },
    {
        genericName: 'Thalidomide',
        brandNames: 'THALOMID',
    },
    {
        genericName: 'Theophylline',
        brandNames: 'ELIXOPHYLLIN',
    },
    {
        genericName: 'Thioguanine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Thiopental',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Thioridazine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Thiotepa',
        brandNames: 'TEPADINA',
    },
    {
        genericName: 'Thiothixene',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Thyrotropin alfa',
        brandNames: 'THYROGEN',
    },
    {
        genericName: 'Tiagabine',
        brandNames: 'GABITRIL',
    },
    {
        genericName: 'Ticagrelor',
        brandNames: 'BRILINTA',
    },
    {
        genericName: 'Ticarcillin/clavulanate potassium',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ticlopidine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tigecycline',
        brandNames: 'TYGACIL',
    },
    {
        genericName: 'Tildrakizumab',
        brandNames: 'ILUMYA',
    },
    {
        genericName: 'Tiludronate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Timolol',
        brandNames: 'TIMOPTIC',
    },
    {
        genericName: 'Tinidazole',
        brandNames: 'TINDAMAX',
    },
    {
        genericName: 'Tinzaparin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tioconazole',
        brandNames: 'VAGISTAT-1',
    },
    {
        genericName: 'Tiopronin',
        brandNames: 'THIOLA',
    },
    {
        genericName: 'Tiotropium',
        brandNames: 'SPIRIVA',
    },
    {
        genericName: 'Tipranavir',
        brandNames: 'APTIVUS',
    },
    {
        genericName: 'Tirofiban',
        brandNames: 'AGGRASTAT',
    },
    {
        genericName: 'Tisagenlecleucel',
        brandNames: 'KYMRIAH',
    },
    {
        genericName: 'Tizanidine',
        brandNames: 'ZANAFLEX',
    },
    {
        genericName: 'Tobramycin',
        brandNames: 'TOBI, TOBREX',
    },
    {
        genericName: 'Tocilizumab',
        brandNames: 'ACTEMRA',
    },
    {
        genericName: 'Tofacitinib',
        brandNames: 'XELJANZ',
    },
    {
        genericName: 'Tolazamide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tolbutamide',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tolcapone',
        brandNames: 'TASMAR',
    },
    {
        genericName: 'Tolmetin',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tolnaftate',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tolterodine',
        brandNames: 'DETROL',
    },
    {
        genericName: 'Tolvaptan',
        brandNames: 'SAMSCA',
    },
    {
        genericName: 'Topiramate',
        brandNames: 'TOPAMAX',
    },
    {
        genericName: 'Topotecan',
        brandNames: 'HYCAMTIN',
    },
    {
        genericName: 'Torsemide',
        brandNames: 'DEMADEX',
    },
    {
        genericName: 'Tositumomab and Iodine I 131 Tositumomab',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tramadol',
        brandNames: 'ULTRAM',
    },
    {
        genericName: 'Trametinib',
        brandNames: 'MEKINIST',
    },
    {
        genericName: 'Trandolapril',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tranexamic acid',
        brandNames: 'CYKLOKAPRON',
    },
    {
        genericName: 'Tranylcypromine',
        brandNames: 'PARNATE',
    },
    {
        genericName: 'Trastuzumab',
        brandNames: 'HERCEPTIN',
    },
    {
        genericName: 'Travoprost',
        brandNames: 'TRAVATAN Z',
    },
    {
        genericName: 'Trazodone',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tremelimumab',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Treprostinil',
        brandNames: 'REMODULIN',
    },
    {
        genericName: 'Tretinoin',
        brandNames: 'RETIN-A',
    },
    {
        genericName: 'Triamcinolone',
        brandNames: 'KENALOG',
    },
    {
        genericName: 'Triamterene',
        brandNames: 'DYRENIUM',
    },
    {
        genericName: 'Triazolam',
        brandNames: 'HALCION',
    },
    {
        genericName: 'Triclabendazole',
        brandNames: 'EGATEN',
    },
    {
        genericName: 'Trientine',
        brandNames: 'SYPRINE',
    },
    {
        genericName: 'Trifluridine',
        brandNames: 'VIROPTIC',
    },
    {
        genericName: 'Trihexyphenidyl',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Trimethadione',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Trimethobenzamide',
        brandNames: 'TIGAN',
    },
    {
        genericName: 'Trimethoprim',
        brandNames: 'PRIMSOL',
    },
    {
        genericName: 'Trimethoprim/polymixin B',
        brandNames: 'POLYTRIM',
    },
    {
        genericName: 'Trimethoprim/sulfamethoxazole',
        brandNames: 'BACTRIM, SEPTRA',
    },
    {
        genericName: 'Trimipramine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Triprolidine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Tromethamine',
        brandNames: 'THAM',
    },
    {
        genericName: 'Tropicamide',
        brandNames: 'MYDRIACYL, TROPICACYL',
    },
    {
        genericName: 'Trospium',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Ulipristal',
        brandNames: 'ELLA',
    },
    {
        genericName: 'Umeclidinium',
        brandNames: 'INCRUSE ELLIPTA',
    },
    {
        genericName: 'Umeclidinium/vilanterol',
        brandNames: 'ANORO ELLIPTA',
    },
    {
        genericName: 'Undecylenic Acid and Derivatives',
        brandNames: 'No US brand names',
    },
    {
        genericName: 'Unoprostone',
        brandNames: 'No US brand names',
    },
    {
        genericName: 'Ursodiol',
        brandNames: 'ACTIGALL',
    },
    {
        genericName: 'Ustekinumab',
        brandNames: 'STELARA',
    },
    {
        genericName: 'Vaccinia Immune Globulin (Intravenous)',
        brandNames: 'CNJ-016',
    },
    {
        genericName: 'Valacyclovir',
        brandNames: 'VALTREX',
    },
    {
        genericName: 'Valganciclovir',
        brandNames: 'VALCYTE',
    },
    {
        genericName: 'Valproic Acid and Derivatives',
        brandNames: 'DEPACON',
    },
    {
        genericName: 'Valsartan',
        brandNames: 'DIOVAN',
    },
    {
        genericName: 'Vancomycin',
        brandNames: 'VANCOCIN',
    },
    {
        genericName: 'Vandetanib',
        brandNames: 'CAPRELSA',
    },
    {
        genericName: 'Vardenafil',
        brandNames: 'LEVITRA',
    },
    {
        genericName: 'Varenicline',
        brandNames: 'CHANTIX',
    },
    {
        genericName: 'Varicella-Zoster Immune Globulin (Human)',
        brandNames: 'VariZIG',
    },
    {
        genericName: 'Vasopressin',
        brandNames: 'VASOSTRICT',
    },
    {
        genericName: 'Vecuronium',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Vedolizumab',
        brandNames: 'ENTYVIO',
    },
    {
        genericName: 'Vemurafenib',
        brandNames: 'ZELBORAF',
    },
    {
        genericName: 'Venetoclax',
        brandNames: 'VENCLEXTA',
    },
    {
        genericName: 'Venlafaxine',
        brandNames: 'EFFEXOR XR',
    },
    {
        genericName: 'Verapamil',
        brandNames: 'CALAN',
    },
    {
        genericName: 'Vernakalant',
        brandNames: 'Brinavess',
    },
    {
        genericName: 'Vidarabine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Vigabatrin',
        brandNames: 'SABRIL',
    },
    {
        genericName: 'Vilazodone',
        brandNames: 'VIIBRYD',
    },
    {
        genericName: 'Vinblastine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Vincristine',
        brandNames: 'MARQIBO KIT',
    },
    {
        genericName: 'Vindesine',
        brandNames: 'No US brand name',
    },
    {
        genericName: 'Vinorelbine',
        brandNames: 'NAVELBINE',
    },
    {
        genericName: 'Vismodegib',
        brandNames: 'ERIVEDGE',
    },
    {
        genericName: 'Voriconazole',
        brandNames: 'VFEND',
    },
    {
        genericName: 'Vortioxetine',
        brandNames: 'TRINTELLIX',
    },
    {
        genericName: 'Warfarin',
        brandNames: 'COUMADIN',
    },
    {
        genericName: 'Zafirlukast',
        brandNames: 'ACCOLATE',
    },
    {
        genericName: 'Zaleplon',
        brandNames: 'SONATA',
    },
    {
        genericName: 'Zanamivir',
        brandNames: 'RELENZA',
    },
    {
        genericName: 'Ziconotide',
        brandNames: 'PRIALT',
    },
    {
        genericName: 'Zidovudine',
        brandNames: 'RETROVIR',
    },
    {
        genericName: 'Zileuton',
        brandNames: 'ZYFLO',
    },
    {
        genericName: 'Ziprasidone',
        brandNames: 'GEODON',
    },
    {
        genericName: 'Zoledronic acid',
        brandNames: 'ZOMETA',
    },
    {
        genericName: 'Zolmitriptan',
        brandNames: 'ZOMIG',
    },
    {
        genericName: 'Zolpidem',
        brandNames: 'AMBIEN',
    },
    {
        genericName: 'Zonisamide',
        brandNames: 'ZONEGRAN',
    },
    {
        genericName: 'Zotarolimus',
        brandNames: 'No US brand name',
    },
];

export class insertMedications1666700511073 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const values = medications.map((medication) => {
            let brandNames = [];
            if (medication.brandNames !== 'No US brand name') {
                brandNames = medication.brandNames.split(',').map((brandName) => `$$${brandName.trim()}$$`);
            }

            return `($$${medication.genericName}$$, ARRAY[${brandNames.join(',')}]::text[])`;
        });

        await queryRunner.query(`INSERT INTO medication (generic_name, brand_names) VALUES ${values.join(',')}`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM medication`);
    }
}
