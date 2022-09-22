---
type: frontmatter
search: exclude
---

<!-- new page -->
<div id="navig">
    <h1>Table of Contents</h1>

    {% assign list = site.data.sdktopics.chapters %}
    {% assign baseurl = "http://localhost:4000/sdk/" %}

    <ul>
        {% for chapter in list %}
        <li>{{ chapter.title }}
            <ul>
                {% for topic in chapter.topics %}
                <li><a href="{{topic.url | prepend: baseurl}}">{{topic.page}}</a>
                    <ul>
                    {% for subtopic in topic.subtopics %}
                    <li><a href="{{subtopic.url | prepend: baseurl}}">{{subtopic.page}}</a>  </li>
                    {% endfor %}
                    </ul>
                </li>
                {% endfor %}
            </ul>
        </li>
        {% endfor %}
    </ul>
</div>