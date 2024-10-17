<div class="filter-area">
    <div class="filter-left">
        <div class="filter-group">
            <select id="category-filter">
                <option value="">Catégories</option>
                <?php get_categories_for_filter(); ?>
            </select>
        </div>

        <div class="filter-group">
            <select id="format-filter">
                <option value="">Formats</option> <!-- Affiche "Formats" par défaut -->
                <?php get_formats_for_filter(); ?>
            </select>
        </div>
    </div>

    <div class="filter-right">
        <div class="filter-group">
            <select id="sort-filter">
                <option value="" disabled selected>Trier par</option>
                <option value="desc">Les plus récentes</option>
                <option value="asc">Les plus anciennes</option>
            </select>
        </div>
    </div>
</div>
