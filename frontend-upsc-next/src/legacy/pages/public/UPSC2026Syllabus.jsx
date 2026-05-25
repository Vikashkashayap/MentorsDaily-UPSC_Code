import React from 'react';

export default function UPSC2026Syllabus() {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-6 text-center">UPSC CSE Syllabus</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        The UPSC Civil Services Examination (CSE) is one of the most prestigious and competitive exams in India, consisting of two main stages: <span className="font-semibold">Prelims</span> and <span className="font-semibold">Mains</span>. This page provides a comprehensive breakdown of the syllabus and effective preparation tips for each subject.
      </p>

      {/* Part A - Preliminary Examination */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Part A—Preliminary Examination</h2>
        
        <div className="space-y-6">
          {/* Paper I */}
          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Paper I - (200 marks)</h3>
            <p className="text-gray-700 mb-3"><span className="font-semibold">Duration:</span> Two hours</p>
            <p className="text-gray-800 mb-3 font-semibold">Topics covered:</p>
            <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
              <li>Current events of national and international importance.</li>
              <li>History of India and Indian National Movement.</li>
              <li>Indian and World Geography - Physical, Social, Economic Geography of India and the World.</li>
              <li>Indian Polity and Governance - Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues, etc.</li>
              <li>Economic and Social Development - Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives, etc.</li>
              <li>General issues on Environmental ecology, Bio-diversity and Climate Change - that do not require subject specialization.</li>
              <li>General Science.</li>
            </ul>
          </div>

          {/* Paper II */}
          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-green-600 mb-3">Paper II - (200 marks)</h3>
            <p className="text-gray-700 mb-3"><span className="font-semibold">Duration:</span> Two hours</p>
            <p className="text-gray-800 mb-3 font-semibold">Topics covered:</p>
            <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
              <li>Comprehension;</li>
              <li>Interpersonal skills including communication skills;</li>
              <li>Logical reasoning and analytical ability;</li>
              <li>Decision making and problem solving;</li>
              <li>General mental ability;</li>
              <li>Basic numeracy (numbers and their relations, orders of magnitude, etc.) (Class X level), Data interpretation (charts, graphs, tables, data sufficiency etc. — Class X level);</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Part B - Main Examination */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Part B—Main Examination</h2>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border-l-4 border-gray-400">
          <p className="text-gray-800 mb-2">
            The main Examination is intended to assess the overall intellectual traits and depth of understanding of candidates rather than merely the range of their information and memory.
          </p>
          <p className="text-gray-800 mb-2">
            The nature and standard of questions in the General Studies papers (Paper II to Paper V) will be such that a well-educated person will be able to answer them without any specialized study. The questions will be such as to test a candidate's general awareness of a variety of subjects, which will have relevance for a career in Civil Services. The questions are likely to test the candidate's basic understanding of all relevant issues, and ability to analyze, and take a view on conflicting socio-economic goals, objectives and demands. The candidates must give relevant, meaningful and succinct answers.
          </p>
          <p className="text-gray-800">
            The scope of the syllabus for optional subject papers (Paper VI and Paper VII) for the examination is broadly of the honours degree level i.e. a level higher than the bachelors' degree and lower than the masters' degree. In the case of Engineering, Medical Science and law, the level corresponds to the bachelors' degree.
          </p>
        </div>

        {/* Qualifying Papers */}
        <div className="bg-yellow-50 rounded-lg p-6 mb-6 border-l-4 border-yellow-500">
          <h3 className="text-xl font-semibold text-yellow-700 mb-3">QUALIFYING PAPERS ON INDIAN LANGUAGES AND ENGLISH</h3>
          <p className="text-gray-800 mb-3">
            The aim of the paper is to test the candidates' ability to read and understand serious discursive prose, and to express ideas clearly and correctly, in English and Indian language concerned.
          </p>
          <p className="text-gray-800 mb-3 font-semibold">The pattern of questions would be broadly as follows:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-800 mb-2 font-semibold">English:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>Comprehension of given passages.</li>
                <li>Precis Writing.</li>
                <li>Usage and Vocabulary.</li>
                <li>Short Essays.</li>
              </ul>
            </div>
            <div>
              <p className="text-gray-800 mb-2 font-semibold">Indian Languages:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>Comprehension of given passages.</li>
                <li>Precis Writing.</li>
                <li>Usage and Vocabulary.</li>
                <li>Short Essays.</li>
                <li>Translation from English to the Indian Language and vice-versa.</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-blue-100 p-3 rounded text-sm">
            <p className="text-gray-800"><span className="font-semibold">Note 1:</span> The papers on Indian Languages and English will be of Matriculation or equivalent standard and will be of qualifying nature only. The marks obtained in these papers will not be counted for ranking.</p>
            <p className="text-gray-800 mt-2"><span className="font-semibold">Note 2:</span> The candidates will have to answer the English and Indian Languages papers in English and the respective Indian language (except where translation is involved).</p>
          </div>
        </div>

        {/* Paper I - Essay */}
        <div className="bg-purple-50 rounded-lg p-6 mb-6 border-l-4 border-purple-500">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">PAPER-I: Essay</h3>
          <p className="text-gray-800">
            Candidates may be required to write essays on multiple topics. They will be expected to keep closely to the subject of the essay to arrange their ideas in orderly fashion, and to write concisely. Credit will be given for effective and exact expression.
          </p>
        </div>

        {/* Paper II - General Studies-I */}
        <div className="bg-green-50 rounded-lg p-6 mb-6 border-l-4 border-green-500">
          <h3 className="text-xl font-semibold text-green-700 mb-3">PAPER-II: General Studies-I: Indian Heritage and Culture, History and Geography of the World and Society</h3>
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
            <li>Indian culture will cover the salient aspects of Art Forms, literature and Architecture from ancient to modern times.</li>
            <li>Modern Indian history from about the middle of the eighteenth century until the present- significant events, personalities, issues.</li>
            <li>The Freedom Struggle — its various stages and important contributors/contributions from different parts of the country.</li>
            <li>Post-independence consolidation and reorganization within the country.</li>
            <li>History of the world will include events from 18th century such as industrial revolution, world wars, redrawal of national boundaries, colonization, decolonization, political philosophies like communism, capitalism, socialism etc.— their forms and effect on the society.</li>
            <li>Salient features of Indian Society, Diversity of India.</li>
            <li>Role of women and women's organization, population and associated issues, poverty and developmental issues, urbanization, their problems and their remedies.</li>
            <li>Effects of globalization on Indian society.</li>
            <li>Social empowerment, communalism, regionalism & secularism.</li>
            <li>Salient features of world's physical geography.</li>
            <li>Distribution of key natural resources across the world (including South Asia and the Indian subcontinent); factors responsible for the location of primary, secondary, and tertiary sector industries in various parts of the world (including India).</li>
            <li>Important Geophysical phenomena such as earthquakes, Tsunami, Volcanic activity, cyclone etc., geographical features and their location-changes in critical geographical features (including water-bodies and ice-caps) and in flora and fauna and the effects of such changes.</li>
          </ul>
        </div>

        {/* Paper III - General Studies-II */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">PAPER-III: General Studies- II: Governance, Constitution, Polity, Social Justice and International relations</h3>
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
            <li>Indian Constitution—historical underpinnings, evolution, features, amendments, significant provisions and basic structure.</li>
            <li>Functions and responsibilities of the Union and the States, issues and challenges pertaining to the federal structure, devolution of powers and finances up to local levels and challenges therein.</li>
            <li>Separation of powers between various organs dispute redressal mechanisms and institutions.</li>
            <li>Comparison of the Indian constitutional scheme with that of other countries.</li>
            <li>Parliament and State legislatures—structure, functioning, conduct of business, powers & privileges and issues arising out of these.</li>
            <li>Structure, organization and functioning of the Executive and the Judiciary—Ministries and Departments of the Government; pressure groups and formal/informal associations and their role in the Polity.</li>
            <li>Salient features of the Representation of People's Act.</li>
            <li>Appointment to various Constitutional posts, powers, functions and responsibilities of various Constitutional Bodies.</li>
            <li>Statutory, regulatory and various quasi-judicial bodies.</li>
            <li>Government policies and interventions for development in various sectors and issues arising out of their design and implementation.</li>
            <li>Development processes and the development industry —the role of NGOs, SHGs, various groups and associations, donors, charities, institutional and other stakeholders.</li>
            <li>Welfare schemes for vulnerable sections of the population by the Centre and States and the performance of these schemes; mechanisms, laws, institutions and Bodies constituted for the protection and betterment of these vulnerable sections.</li>
            <li>Issues relating to development and management of Social Sector/Services relating to Health, Education, Human Resources.</li>
            <li>Issues relating to poverty and hunger.</li>
            <li>Important aspects of governance, transparency and accountability, e-governance- applications, models, successes, limitations, and potential; citizens charters, transparency & accountability and institutional and other measures.</li>
            <li>Role of civil services in a democracy.</li>
            <li>India and its neighborhood- relations.</li>
            <li>Bilateral, regional and global groupings and agreements involving India and/or affecting India's interests.</li>
            <li>Effect of policies and politics of developed and developing countries on India's interests, Indian diaspora.</li>
            <li>Important International institutions, agencies and fora- their structure, mandate.</li>
          </ul>
        </div>

        {/* Paper IV - General Studies-III */}
        <div className="bg-orange-50 rounded-lg p-6 mb-6 border-l-4 border-orange-500">
          <h3 className="text-xl font-semibold text-orange-700 mb-3">PAPER-IV: General Studies-III: Technology, Economic Development, Bio diversity, Environment, Security and Disaster Management</h3>
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
            <li>Indian Economy and issues relating to planning, mobilization, of resources, growth, development and employment.</li>
            <li>Inclusive growth and issues arising from it.</li>
            <li>Government Budgeting.</li>
            <li>Major crops-cropping patterns in various parts of the country, - different types of irrigation and irrigation systems storage, transport and marketing of agricultural produce and issues and related constraints; e-technology in the aid of farmers.</li>
            <li>Issues related to direct and indirect farm subsidies and minimum support prices; Public Distribution System- objectives, functioning, limitations, revamping; issues of buffer stocks and food security; Technology missions; economics of animal-rearing.</li>
            <li>Food processing and related industries in India- scope' and significance, location, upstream and downstream requirements, supply chain management.</li>
            <li>Land reforms in India.</li>
            <li>Effects of liberalization on the economy, changes in industrial policy and their effects on industrial growth.</li>
            <li>Infrastructure: Energy, Ports, Roads, Airports, Railways etc.</li>
            <li>Investment models.</li>
            <li>Science and Technology- developments and their applications and effects in everyday life.</li>
            <li>Achievements of Indians in science & technology; indigenization of technology and developing new technology.</li>
            <li>Awareness in the fields of IT, Space, Computers, robotics, nano-technology, bio-technology and issues relating to intellectual property rights.</li>
            <li>Conservation, environmental pollution and degradation, environmental impact assessment.</li>
            <li>Disaster and disaster management.</li>
            <li>Linkages between development and spread of extremism.</li>
            <li>Role of external state and non-state actors in creating challenges to internal security.</li>
            <li>Challenges to internal security through communication networks, role of media and social networking sites in internal security challenges, basics of cyber security; money-laundering and its prevention.</li>
            <li>Security challenges and their management in border areas - linkages of organized crime with terrorism.</li>
            <li>Various Security forces and agencies and their mandate.</li>
          </ul>
        </div>

        {/* Paper V - General Studies-IV */}
        <div className="bg-indigo-50 rounded-lg p-6 mb-6 border-l-4 border-indigo-500">
          <h3 className="text-xl font-semibold text-indigo-700 mb-3">PAPER-V: General Studies- IV: Ethics, Integrity and Aptitude</h3>
          <p className="text-gray-800 mb-3">
            This paper will include questions to test the candidates' attitude and approach to issues relating to integrity, probity in public life and his problem solving approach to various issues and conflicts faced by him in dealing with society. Questions may utilise the case study approach to determine these aspects.
          </p>
          <p className="text-gray-800 mb-3 font-semibold">The following broad areas will be covered:</p>
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
            <li><span className="font-semibold">Ethics and Human Interface:</span> Essence, determinants and consequences of Ethics in-human actions; dimensions of ethics; ethics - in private and public relationships. Human Values - lessons from the lives and teachings of great leaders, reformers and administrators; role of family society and educational institutions in inculcating values.</li>
            <li><span className="font-semibold">Attitude:</span> content, structure, function; its influence and relation with thought and behaviour; moral and political attitudes; social influence and persuasion.</li>
            <li><span className="font-semibold">Aptitude and foundational values for Civil Service:</span> integrity, impartiality and non-partisanship, objectivity, dedication to public service, empathy, tolerance and compassion towards the weaker-sections.</li>
            <li><span className="font-semibold">Emotional intelligence:</span> concepts, and their utilities and application in administration and governance.</li>
            <li><span className="font-semibold">Contributions of moral thinkers and philosophers</span> from India and world.</li>
            <li><span className="font-semibold">Public/Civil service values and Ethics in Public administration:</span> Status and problems; ethical concerns and dilemmas in government and private institutions; laws, rules, regulations and conscience as sources of ethical guidance; accountability and ethical governance; strengthening of ethical and moral values in governance; ethical issues in international relations and funding; corporate governance.</li>
            <li><span className="font-semibold">Probity in Governance:</span> Concept of public service; Philosophical basis of governance and probity; Information sharing and transparency in government, Right to Information, Codes of Ethics, Codes of Conduct, Citizen's Charters, Work culture, Quality of service delivery, Utilization of public funds, challenges of corruption.</li>
            <li><span className="font-semibold">Case Studies</span> on above issues.</li>
          </ul>
        </div>

        {/* Optional Subjects */}
        <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">PAPER-VI & PAPER-VII: Optional Subject Papers</h3>
          <p className="text-gray-800">
            Candidates need to choose one optional subject from the list provided by UPSC. The syllabus for optional subjects is broadly of honours degree level (a level higher than bachelor's degree and lower than master's degree). In the case of Engineering, Medical Science and Law, the level corresponds to the bachelor's degree.
          </p>
        </div>
      </section>

      {/* Preparation Tips Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Preparation Tips</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">For Prelims:</span> Focus on NCERTs for basic concepts, stay updated with current affairs, practice previous year papers, and take regular mock tests.
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">For Mains:</span> Develop answer writing skills, practice essay writing, focus on analytical thinking, and maintain comprehensive notes for revision.
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">General:</span> Create a structured study plan, prioritize subjects based on your strengths, and seek guidance from mentors for personalized strategies.
          </p>
        </div>
      </section>
    </div>
  );
}
